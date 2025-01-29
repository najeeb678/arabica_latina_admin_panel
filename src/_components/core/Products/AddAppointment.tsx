import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useFormik } from "formik";

import * as Yup from "yup";

import GenericInput from "@/_components/common/InputField/GenericInput";

import { AppDispatch } from "@/redux/store";
import { addProduct, getAllProducts } from "@/redux/slices/productsSlice";

interface AddProductProps {
  handleClose?: () => void;
}
const AddProduct: React.FC<AddProductProps> = ({ handleClose = () => {} }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "",

      basePrice: "",
      isClothing: "",
      isJewelry: "",
      composition: "",
      weight: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Product name is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category ID is required"),

      basePrice: Yup.string().required("Base price is required"),
      isClothing: Yup.boolean().required("Clothing field is required"),
      isJewelry: Yup.boolean().required("Jewelry field is required"),
      composition: Yup.string().required("Composition is required"),
      weight: Yup.string().required("Weight is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      try {
        const res = await dispatch(addProduct(data)).unwrap();

        if (res) {
          handleClose();
          dispatch(getAllProducts({ search: "", filter: "" }));
          toast("Product added successfully", { type: "success" });
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
        <Grid container spacing={2} direction="column">
          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                name="name"
                label="Product Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                placeholder="Enter product name"
              />
              {formik.touched.name && formik.errors.name && (
                <span className="error-message">
                  {typeof formik.errors.name === "string"
                    ? formik.errors.name
                    : ""}
                </span>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                name="description"
                label="Description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                placeholder="Enter product description"
              />
              {formik.touched.description && formik.errors.description && (
                <span className="error-message">
                  {typeof formik.errors.description === "string"
                    ? formik.errors.description
                    : ""}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Category ID"
                type="text"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange("categoryId")}
                onBlur={formik.handleBlur("categoryId")}
                placeholder="Enter category ID"
              />
              {formik.touched.categoryId && formik.errors.categoryId && (
                <span className="error-message">
                  {formik.errors.categoryId}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Base Price"
                type="text"
                name="basePrice"
                value={formik.values.basePrice}
                onChange={formik.handleChange("basePrice")}
                onBlur={formik.handleBlur("basePrice")}
                placeholder="Enter base price"
              />
              {formik.touched.basePrice && formik.errors.basePrice && (
                <span className="error-message">{formik.errors.basePrice}</span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Clothing"
                type="text"
                name="isClothing"
                value={formik.values.isClothing}
                onChange={formik.handleChange("isClothing")}
                onBlur={formik.handleBlur("isClothing")}
                placeholder="Enter yes or 'no'"
              />
              {formik.touched.isClothing && formik.errors.isClothing && (
                <span className="error-message">
                  {formik.errors.isClothing}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Jewelry"
                type="text"
                name="isJewelry"
                value={formik.values.isJewelry}
                onChange={formik.handleChange("isJewelry")}
                onBlur={formik.handleBlur("isJewelry")}
                placeholder="Enter 'yes' or 'no'"
              />
              {formik.touched.isJewelry && formik.errors.isJewelry && (
                <span className="error-message">{formik.errors.isJewelry}</span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Composition"
                type="text"
                name="composition"
                value={formik.values.composition}
                onChange={formik.handleChange("composition")}
                onBlur={formik.handleBlur("composition")}
                placeholder="Enter product composition"
              />
              {formik.touched.composition && formik.errors.composition && (
                <span className="error-message">
                  {formik.errors.composition}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Weight"
                type="text"
                name="weight"
                value={formik.values.weight}
                onChange={formik.handleChange("weight")}
                onBlur={formik.handleBlur("weight")}
                placeholder="Enter product weight"
              />
              {formik.touched.weight && formik.errors.weight && (
                <span className="error-message">{formik.errors.weight}</span>
              )}
            </Grid>
          </Grid>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
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
              onClick={(e: any) => {
                e.preventDefault();
                formik.handleSubmit();
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
              ) : (
                <>Add Product</>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddProduct;
