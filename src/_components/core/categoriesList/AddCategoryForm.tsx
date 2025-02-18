import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import GenericInput from "@/_components/common/InputField/GenericInput";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import GenericDropDown from "@/_components/common/InputField/GenericDropDown";
import {
  addCategory,
  updateCategory,
} from "../../../redux/slices/categoriesSlice";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";

type CategoryFormProps = {
  handleClose: () => void;
  categoryData?: any;
};
let genderOptions = [
  { name: "Men", value: "MEN" },
  { name: "Women", value: "WOMEN" },
  { name: "Unisex", value: "UNISEX" },
  { name: "Other", value: "OTHER" },
];
const AddCategoryForm: React.FC<CategoryFormProps> = ({
  handleClose,
  categoryData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (categoryData && categoryData !== false) {
      setIsUpdate(true);
      formik.setValues({
        name: categoryData?.name,
        gender: categoryData?.gender || "",
        attachment: categoryData?.attachment || "",
      });
      setImageUrl(categoryData?.attachment || "");
    } else {
      setIsUpdate(false);
      formik.resetForm();
      setImageUrl("");
    }
  }, [categoryData]);

  const handleImageUpdate = (imageUrl: string) => {
    setImageUrl(imageUrl);
    formik.setFieldValue("attachment", imageUrl);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      attachment: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Category name is required"),
      gender: Yup.string().required("Type is required"),
    }),
    onSubmit: async (data: any) => {
      if (!imageUrl) {
        toast.error("Please upload an image");
        setLoading(false);
        return;
      }
      // updateCategory
      const payload = {
        ...data,
        attachment: imageUrl,
      };

      setLoading(true);
      try {
        if (categoryData?.categoryId) {
          await dispatch(
            updateCategory({
              id: categoryData?.categoryId,
              data: payload,
            })
          )
            .unwrap()
            .then(() => {
              toast.success("Category updated successfully");
              handleClose();
            })
            .catch((err: any) => {
              toast.error(err?.message || "Error updating Category");
            });
        } else {
          await dispatch(addCategory(payload))
            .unwrap()
            .then(() => {
              toast.success("Category created successfully");
              handleClose();
            })
            .catch((err) => {
              const errorMessage = Array.isArray(err?.message)
                ? err.message.join(", ")
                : err?.message || "Error creating Category";

              toast.error(errorMessage);
            });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "5px 20px",
      }}
    >
      <Box component="form" noValidate>
        <Grid container spacing={6} direction="column">
          <Grid container rowSpacing={1} columnSpacing={6} direction="row">
            <Grid container size={{ xs: 12, md: 12 }} direction="row">
              <Grid
                size={{ xs: 12, md: 12 }}
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <ProductImageUploader
                  selectedImage={imageUrl}
                  onImageChange={handleImageUpdate}
                  setIsImageUploading={setIsImageUploading}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12 }} component="div">
                <GenericInput
                  name="name"
                  label="Category Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Enter Category Name"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? (formik.errors.name as any)
                      : undefined
                  }
                  sx={{ marginTop: "6px" }}
                  inputfieldHeight="45px"
                />
              </Grid>

              {/* Gender Field with Dropdown */}
              <Grid size={{ xs: 12, md: 12 }} component="div">
                <SingleSelect
                  name="gender"
                  title="Type"
                  textFieldLabel="Select a Type"
                  value={
                    genderOptions.find(
                      (option) => option.value === formik.values.gender
                    ) || null
                  }
                  onChange={(newValue: any) =>
                    formik.setFieldValue("gender", newValue?.value || "")
                  }
                  onBlur={formik.handleBlur("gender")}
                  data={genderOptions || []}
                  titleStyle={{
                    color: "#2E2B2A",
                    fontSize: "14px",
                    fontFamily: "Helvetica",
                  }}
                  sx={{
                    height: "45px",
                  }}
                />

                {formik.touched.gender && formik.errors.gender && (
                  <Typography color="error" variant="caption">
                    {typeof formik.errors.gender === "string"
                      ? formik.errors.gender
                      : ""}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "13px !important",
                fontWeight: "400 !important",
                borderRadius: "50px !important",
                backgroundColor: "#FBC02D !important",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#FBC02D !important",
                  color: "white !important",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5 )",
                  transform: "scale(1.005)",
                },
              }}
              onClick={(e: any) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              {loading || isImageUploading ? (
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                  visible
                />
              ) : isUpdate ? (
                "Update"
              ) : (
                <>
                  <AddIcon sx={{ marginRight: 1 }} />
                  Create
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddCategoryForm;
