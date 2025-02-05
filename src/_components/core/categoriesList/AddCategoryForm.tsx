import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import GenericInput from "@/_components/common/InputField/GenericInput";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import GenericDropDown from "@/_components/common/InputField/GenericDropDown";
import { addCategory } from "../../../redux/slices/categoriesSlice";

type CategoryFormProps = {
   handleClose: () => void;
   categoryData?: any;
};

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
         const payload = {
            ...data,
            attachment: imageUrl,
         };

         setLoading(true);
         try {
            await dispatch(addCategory(payload)).unwrap();
            toast(
               isUpdate
                  ? "Category updated successfully"
                  : "Category created successfully",
               { type: "success" }
            );
            handleClose();
         } catch (error: any) {
            toast.error(error.message || "Failed to create category");
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
                        />
                        {formik.touched.name && formik.errors.name && (
                           <span className="error-message" style={{
                              color: 'red',
                              fontSize: '12px',
                              marginTop: '5px',
                              display: 'inline-block',
                           }}>
                              {typeof formik.errors.name === "string"
                                 ? formik.errors.name
                                 : ""}
                           </span>
                        )}
                     </Grid>

                     {/* Gender Field with Dropdown */}
                     <Grid size={{ xs: 12, md: 12 }} component="div">
                        <GenericDropDown
                           label="Type"
                           name="gender"
                           value={formik.values.gender}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.gender && Boolean(formik.errors.gender)}
                           helperText={
                              formik.touched.gender && typeof formik.errors.gender === "string"
                                 ? formik.errors.gender
                                 : undefined
                           }
                           options={[
                              { label: "Men", value: "MEN" },
                              { label: "Women", value: "WOMEN" },
                              { label: "Unisex", value: "UNISEX" },
                              { label: "Other", value: "OTHER" },
                           ]}
                        />

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
