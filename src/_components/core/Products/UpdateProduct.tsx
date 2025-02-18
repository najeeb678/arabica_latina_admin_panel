import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericInput from "@/_components/common/InputField/GenericInput";
import { AppDispatch } from "@/redux/store";
import { updateProduct, getAllProducts } from "@/redux/slices/productsSlice";
import GenericDropDown from "@/_components/common/InputField/GenericDropDown";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";

interface EditProductProps {
  handleClose?: () => void;
  product: any;
}

const EditProduct: React.FC<EditProductProps> = ({
  handleClose = () => {},
  product,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    if (categories && product?.categoryId) {
      // Find the category with the matching categoryId
      const category = categories.find(
        (category: any) => category.categoryId === product?.categoryId
      );

      // Set the category name if a matching category is found
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categories, product]);

  // console.log("categoryName is: ", categoryName);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      categoryId: product?.categoryId || "",
      basePrice: product?.basePrice || "",
      composition: product?.composition || "",
      weight: product?.weight || "",
      productType: product?.productType || "",
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
      const updatedData = {
        ...data,
        basePrice: parseInt(data.basePrice, 10),
      };
      try {
        const res = await dispatch(
          updateProduct({ id: product?.productId, data: updatedData })
        ).unwrap();

        if (res) {
          toast("Product updated successfully", { type: "success" });
          handleClose();
          dispatch(getAllProducts({ search: "", filter: "" }));
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
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.name as string}
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
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.description as string}
                </span>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Category new"
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
                // value={formik.values.categoryId}
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
                  {formik.errors.categoryId as string}
                </Typography>
              )}{" "}
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
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.basePrice as string}
                </span>
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
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.composition as string}
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
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "15px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.weight as string}
                </span>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericDropDown
                name="productType"
                label="Product Type"
                options={[
                  { label: "Jewelry", value: "JEWELRY" },
                  { label: "Clothes", value: "CLOTHES" },
                  { label: "Food", value: "FOOD" },
                  { label: "Other", value: "OTHER" },
                ]}
                value={formik.values.productType}
                onChange={(event) =>
                  formik.setFieldValue("productType", event.target.value)
                }
              />
              {formik.touched.productType && formik.errors.productType && (
                <span
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  {formik.errors.productType as string}
                </span>
              )}
            </Grid>
          </Grid>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              style={{
                marginLeft: "10px",
              }}
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
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.01)",
                },
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProduct;
