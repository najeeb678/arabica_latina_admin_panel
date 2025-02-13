import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericInput from "@/_components/common/InputField/GenericInput";
import { AppDispatch } from "@/redux/store";
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from "@/redux/slices/productsSlice";
import { fetchCategories } from "@/redux/slices/categoriesSlice";

import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";

interface AddProductProps {
  handleClose?: () => void;
  productDetails?: any;
}
const productTypeOptions = [
  { id: 1, name: "Jewelry", value: "JEWELRY" },
  { id: 2, name: "Clothes", value: "CLOTHES" },
  { id: 3, name: "Food", value: "FOOD" },
  { id: 4, name: "Other", value: "OTHER" },
];
const AddProduct: React.FC<AddProductProps> = ({
  handleClose = () => {},
  productDetails,
}) => {
  console.log("product...", productDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state: any) => state.categories); // Assuming categories are stored here

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: productDetails?.name || "",
      description: productDetails?.description || "",
      categoryId: productDetails?.categoryId || "",
      basePrice: productDetails?.basePrice?.toString() || "",
      composition: productDetails?.composition || "",
      weight: productDetails?.weight || "",
      productType: productDetails?.productType || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Product name is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category ID is required"),
      basePrice: Yup.string().required("Base price is required"),
      composition: Yup.string().required("Composition is required"),
      weight: Yup.string().required("Weight is required"),
      productType: Yup.string().required("Product type is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      const formData = {
        ...data,
        basePrice: parseInt(data.basePrice, 10),
      };

      try {
        if (productDetails) {
          const res = await dispatch(
            updateProduct({ id: productDetails?.productId, data: formData })
          )
            .unwrap()
            .then((res) => {
              dispatch(getAllProducts({ search: "", filter: "" }));
              toast.success("Product updated successfully");
            })
            .catch((err) => {
              toast.error(err?.message || "Error updating product");
            });
        } else {
          const res = await dispatch(addProduct(formData))
            .unwrap()
            .then((res) => {
              dispatch(getAllProducts({ search: "", filter: "" }));
              toast.success("Product added successfully");
            })
            .catch((err) => {
              toast.error(err?.message || "Error adding product");
            });
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        handleClose();
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
                label="Product Name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? (formik.errors.name as any)
                    : undefined
                }
                placeholder="Enter product name"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Description"
                name="description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                    ? (formik.errors.description as any)
                    : undefined
                }
                placeholder="Enter product description"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Select a Category"
                textFieldLabel="Select Category"
                data={categories.map((category: any) => ({
                  ...category,
                  name: `${category.name} -${category.gender}`,
                }))}
                onChange={(value) =>
                  formik.setFieldValue(
                    "categoryId",
                    (value as any)?.categoryId || ""
                  )
                }
                value={
                  categories.find(
                    (category: { categoryId: string }) =>
                      category.categoryId === formik.values.categoryId
                  ) || null
                }
                onBlur={formik.handleBlur("categoryId")}
                name="categoryId"
              />

              {formik.touched.categoryId && formik.errors.categoryId && (
                <Typography color="error" variant="caption">
                  {typeof formik.errors.categoryId === "string"
                    ? formik.errors.categoryId
                    : ""}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Base Price"
                name="description"
                type="text"
                value={formik.values.basePrice}
                onChange={formik.handleChange("basePrice")}
                onBlur={formik.handleBlur("basePrice")}
                error={
                  formik.touched.basePrice && Boolean(formik.errors.basePrice)
                }
                helperText={
                  formik.touched.basePrice && formik.errors.basePrice
                    ? (formik.errors.basePrice as any)
                    : undefined
                }
                placeholder="Enter base price"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Composition"
                name="composition"
                type="text"
                value={formik.values.composition}
                onChange={formik.handleChange("composition")}
                onBlur={formik.handleBlur("composition")}
                error={
                  formik.touched.composition &&
                  Boolean(formik.errors.composition)
                }
                helperText={
                  formik.touched.composition && formik.errors.composition
                    ? (formik.errors.composition as any)
                    : undefined
                }
                placeholder="Enter product composition"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Weight"
                name="composition"
                type="text"
                value={formik.values.weight}
                onChange={formik.handleChange("weight")}
                onBlur={formik.handleBlur("weight")}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={
                  formik.touched.weight && formik.errors.weight
                    ? (formik.errors.weight as any)
                    : undefined
                }
                placeholder="Enter product weight"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                name="productType"
                title="Product Type"
                textFieldLabel="Select Product Type"
                data={productTypeOptions}
                value={
                  productTypeOptions.find(
                    (option) => option.value === formik.values.productType
                  ) || null
                }
                onChange={(val) =>
                  formik.setFieldValue("productType", (val as any)?.value)
                }
                onBlur={formik.handleBlur("productType")}
              />
              {formik.touched.productType && formik.errors.productType && (
                <Typography color="error" variant="caption">
                  {typeof formik.errors.productType === "string"
                    ? formik.errors.productType
                    : ""}
                </Typography>
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
                  backgroundColor: "#FBC02D !important",
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
                <>{productDetails ? "Update Product" : "Add Product"}</>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddProduct;
