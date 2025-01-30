import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Box, Button, Autocomplete, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericInput from "@/_components/common/InputField/GenericInput";
import { AppDispatch } from "@/redux/store";
import { addProduct, getAllProducts } from "@/redux/slices/productsSlice";
import { fetchCategories } from "@/redux/slices/categoriesSlice"; // Make sure to import fetchCategories
import { Category } from "@/types/types"; // Import the Category type
import GenericDropDown from "@/_components/common/InputField/GenericDropDown";

interface AddProductProps {
  handleClose?: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ handleClose = () => { } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { categories } = useSelector((state: any) => state.categories); // Assuming categories are stored here

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on component load
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      categoryId: "", // The categoryId will now be set from the autocomplete
      basePrice: "",
      composition: "",
      weight: "",
      productType: "",
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
        const res = await dispatch(addProduct(formData)).unwrap();
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
    <Box style={{ width: "100%", backgroundColor: "#ffffff", borderRadius: "10px", padding: "5px 20px" }}>
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
              {formik.touched.name && formik.errors.name && <span className="error-message" style={{
                color: 'red',
                fontSize: '12px',
                marginTop: '5px',
                display: 'inline-block',
              }}>{formik.errors.name}</span>}
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
              {formik.touched.description && formik.errors.description && <span className="error-message" style={{
                color: 'red',
                fontSize: '12px',
                marginTop: '5px',
                display: 'inline-block',
              }}>{formik.errors.description}</span>}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <Autocomplete
                options={categories || []}
                getOptionLabel={(option: Category) => option.name}
                onChange={(event, value) => formik.setFieldValue("categoryId", value ? value.categoryId : "")}
                value={categories.find((category: { categoryId: string }) => category.categoryId === formik.values.categoryId) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Category"
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        fontSize: "12px",
                        height: "40px !important ",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 12px !important",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7D7D7",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7D7D7",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D7D7D7",
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "12px",
                      },
                    }}
                  />
                )}
                fullWidth
                sx={{
                  fontSize: "12px !important",
                  marginTop: '25px',
                  height: "40px",
                  "& .MuiOutlinedInput-root": {
                    fontSize: "12px",
                    height: "45px !important",
                    paddingBottom: '10px !important',
                    display: "flex",
                    alignItems: "center",

                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7D7D7",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7D7D7",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D7D7D7",
                  },
                  "& .MuiSelect-icon": {
                    color: "#393939",
                  },
                }}
              />

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
              {formik.touched.basePrice && formik.errors.basePrice && <span className="error-message" style={{
                color: 'red',
                fontSize: '12px',
                marginTop: '5px',
                display: 'inline-block',
              }}>{formik.errors.basePrice}</span>}
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
                <span className="error-message" style={{
                  color: 'red',
                  fontSize: '12px',
                  marginTop: '5px',
                  display: 'inline-block',
                }}>
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
                <span className="error-message" style={{
                  color: 'red',
                  fontSize: '12px',
                  marginTop: '5px',
                  display: 'inline-block',
                }}>{formik.errors.weight}</span>
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
                onChange={(event) => formik.setFieldValue("productType", event.target.value)}
              />

            </Grid>

          </Grid>



          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => handleClose()} style={{ marginLeft: "10px" }} sx={{ fontSize: "13px !important", fontWeight: "400 !important", borderRadius: "50px !important", borderColor: "#b2b2b2", marginRight: "20px", color: "#A6A6A6", boxShadow: "none", transition: "all 0.2s ease-in-out", "&:hover": { boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )", transform: "scale(1.005)" } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ fontSize: "12px !important", fontWeight: "700 !important", fontFamily: "Avenir !important", lineHeight: "18px !important", borderRadius: "50px !important", backgroundColor: "#FBC02D !important", boxShadow: "none", transition: "all 0.2s ease-in-out", "&:hover": { backgroundColor: "#FBC02D !important", color: "white !important", boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )", transform: "scale(1.005)" } }} onClick={(e: any) => { e.preventDefault(); formik.handleSubmit(); }}>
              {loading ? <ThreeDots height="28" width="40" radius="9" color="#FFFFFF" ariaLabel="three-dots-loading" visible /> : <>Add Product</>}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddProduct;
