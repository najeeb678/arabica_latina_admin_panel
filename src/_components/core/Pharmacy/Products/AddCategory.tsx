import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";

import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import CustomMultilineInput from "@/_components/common/InputField/CustomInputField";
import { createCetegory } from "@/redux/slices/PharmacySlice";

interface AddCategoryProps {
  handleClose?: () => void;
  productData?: any | null;
}
const AddCategory: React.FC<AddCategoryProps> = ({
  handleClose = () => {},
  productData = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [productImage, setProductImage] = useState("");

  const handleImageChange = (url: string) => {
    formik.setFieldValue("attachment", url);
    setProductImage(url); // Save the uploaded image URL
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      attachment: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Category Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      console.log("Form submitted with data:", data);
      try {
        if (data.attachment === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return; // Prevent submission if image is not uploaded
        }

        if (isUpdate) {
          toast("Updated successfully", { type: "success" });
        } else {
          const res = await dispatch(createCetegory(data)).unwrap();
          toast("Category created successfully", { type: "success" });
        }
        setLoading(false);
        handleClose();
      } catch (error: any) {
        toast.error(error);
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
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} direction="row">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            direction="row"
            size={{ xs: 12, md: 8 }}
          >
            <Grid size={{ xs: 12 }} component="div">
              <GenericInput
                label="Enter Category Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                placeholder="Enter Category Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
                // sx={{ margin: "8px 0" }} // Optional styling
              />
            </Grid>

            <Grid size={{ xs: 12 }} component="div">
              <CustomMultilineInput
                name="description"
                noOflines={4}
                title="Description"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                placeholder="Enter Description"
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : undefined
                }
              />
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            className="flexCenter"
            sx={{
              order: { xs: -1, md: 0 },
            }}
          >
            <Grid size={{ xs: 12 }} component="div">
              <ProductImageUploader
                selectedImage={productImage}
                onImageChange={handleImageChange}
                height={160}
                width={160}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              style={{ marginLeft: "10px" }}
              sx={{
                fontSize: "13px !important",
                fontWeight: "400 !important",
                borderRadius: "50px !important",
                borderColor: "#b2b2b2",
                marginRight: "20px",
                color: "#A6A6A6",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "12px !important",
                fontWeight: "700 !important",
                fontFamily: "Avenir !important",
                lineHeight: "18px !important",
                borderRadius: "50px !important",
                backgroundColor: "#FBC02D !important",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#FBC02D !important", // Same background color
                  color: "white !important",
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
              }}
            >
              {loading ? (
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                  visible
                />
              ) : isUpdate ? (
                "Update Appointment"
              ) : (
                <>
                  {/* <AddIcon sx={{ marginRight: 1 }} /> */}
                  Add Category
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddCategory;
