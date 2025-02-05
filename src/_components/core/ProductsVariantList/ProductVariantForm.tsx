import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import GenericInput from "@/_components/common/InputField/GenericInput";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { Autocomplete, TextField } from "@mui/material";
import { getAllProducts } from "../../../redux/slices/productsSlice";
import { AppDispatch } from "../../../redux/store";
import { createProductVariant } from "../../../redux/slices/ProductVariantsSlice";
import CustomCheckbox from "@/_components/common/CustomCheckBox";

// Define prop types
interface ProductVariantFormProps {
  handleClose: () => void;
  product?: {
    id: string;
    name: string;
  };
}

const ProductVariantForm: React.FC<ProductVariantFormProps> = ({ handleClose, product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { productsData, loadingproductsData } = useSelector((state: any) => state.products);

  const formik = useFormik({
    initialValues: {
      productId: product?.id || "",
      color: "",
      style: "",
      attachment: "",
      isDuotone: false,
      size: "",
      stock: "",
      price: "",
    },
    validationSchema: Yup.object().shape({
      productId: Yup.string().required("Product is required"),
      color: Yup.string().required("Color is required"),
      style: Yup.string().required("Style is required"),
      size: Yup.string().required("Size is required"),
      stock: Yup.number().required("Stock is required").min(0, "Stock can't be negative"),
      price: Yup.number().required("Price is required").min(0, "Price can't be negative"),
    }),
    onSubmit: async (data) => {
      const payload = {
        ...data,
        stock: Number(data.stock),
        price: Number(data.price),
        attachment: imageUrl,
      };
      console.log("Form Submitted with data:", data); // Debug log
      try {
        await dispatch(createProductVariant(payload)).unwrap();
        console.log("Product variant created successfully");
        handleClose();
      } catch (error) {
        console.error("Error creating product variant:", error);
      }
    },

  });

  // Fetch products on mount
  useEffect(() => {
    dispatch(getAllProducts({})); // Dispatch the action to fetch products
  }, [dispatch]);

  const handleImageUpdate = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

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
        <Grid container spacing={6} direction="row">
          <Grid container rowSpacing={1} columnSpacing={6} direction="row">
            <Grid container size={{ xs: 12, md: 12 }} direction="row">
              <Grid container spacing={4} direction={{ xs: "row", md: "row" }}>
                {/* Inputs Section */}
                <Grid size={{ xs: 12, md: 8 }} component="div">
                  {/* Product Dropdown */}
                  <Grid size={{ xs: 12 }} component="div" mb={2}>
                    {loadingproductsData ? (
                      <ThreeDots height="40" width="40" radius="9" color="#000" ariaLabel="loading-products" />
                    ) : productsData?.length > 0 ? (
                      <Autocomplete
                        options={productsData}
                        getOptionLabel={(option) => option.name || ""}
                        value={
                          productsData.find((product: { productId: string }) => product.productId === formik.values.productId) || null
                        }
                        onChange={(event, value) => formik.setFieldValue("productId", value ? value.productId : "")}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Product"
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                fontSize: "12px",
                                height: "45px !important ",
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
                          height: "40px",
                          "& .MuiOutlinedInput-root": {
                            fontSize: "12px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 12px",
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



                    ) : (
                      <span className="error-message">No products available</span>
                    )}
                    {formik.touched.productId && formik.errors.productId && (
                      <span className="error-message" style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '15px',
                        display: 'inline-block',
                      }}>{formik.errors.productId}</span>
                    )}
                  </Grid>

                  {/* Color Input */}
                  <Grid size={{ xs: 12 }} component="div" mb={2}>
                    <GenericInput
                      label="Color"
                      name="color"
                      type="text"
                      value={formik.values.color}
                      onChange={formik.handleChange("color")}
                      onBlur={formik.handleBlur("color")}
                    />
                    {formik.touched.color && formik.errors.color && (
                      <span className="error-message" style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '5px',
                        display: 'inline-block',
                      }}>{formik.errors.color}</span>
                    )}
                  </Grid>
                </Grid>

                {/* Image Section */}
                <Grid
                  size={{ xs: 12, md: 4 }}
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProductImageUploader
                    selectedImage={imageUrl}
                    onImageChange={handleImageUpdate}
                    setIsImageUploading={setIsImageUploading}
                  />
                </Grid>
              </Grid>


              <Grid container spacing={2}>
                {/* Style Input */}
                <Grid size={{ xs: 12, md: 6 }} component="div">
                  <GenericInput
                    label="Style"
                    name="style"
                    type="text"
                    value={formik.values.style}
                    onChange={formik.handleChange("style")}
                    onBlur={formik.handleBlur("style")}
                  />
                  {formik.touched.style && formik.errors.style && (
                    <span className="error-message" style={{
                      color: 'red',
                      fontSize: '12px',
                      marginTop: '5px',
                      display: 'inline-block',
                    }}>{formik.errors.style}</span>
                  )}
                </Grid>

                {/* Size Input */}
                <Grid size={{ xs: 12, md: 6 }} component="div">
                  <GenericInput
                    label="Size"
                    name="size"
                    type="text"
                    value={formik.values.size}
                    onChange={formik.handleChange("size")}
                    onBlur={formik.handleBlur("size")}
                  />
                  {formik.touched.size && formik.errors.size && (
                    <span className="error-message" style={{
                      color: 'red',
                      fontSize: '12px',
                      marginTop: '5px',
                      display: 'inline-block',
                    }}>{formik.errors.size}</span>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* Stock Input */}
                <Grid size={{ xs: 12, md: 6 }} component="div">
                  <GenericInput
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formik.values.stock}
                    onChange={formik.handleChange("stock")}
                    onBlur={formik.handleBlur("stock")}
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <span className="error-message" style={{
                      color: 'red',
                      fontSize: '12px',
                      marginTop: '5px',
                      display: 'inline-block',
                    }}>{formik.errors.stock}</span>
                  )}
                </Grid>

                {/* Price Input */}
                <Grid size={{ xs: 12, md: 6 }} component="div">
                  <GenericInput
                    label="Price"
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange("price")}
                    onBlur={formik.handleBlur("price")}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <span className="error-message" style={{
                      color: 'red',
                      fontSize: '12px',
                      marginTop: '5px',
                      display: 'inline-block',
                    }}>{formik.errors.price}</span>
                  )}
                </Grid>
              </Grid>
              {/* Duotone Checkbox */}
              <Grid size={{ xs: 12, md: 12 }} component="div">
                <label style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <CustomCheckbox
                    checked={formik.values.isDuotone}
                    onChange={(event) =>
                      formik.setFieldValue("isDuotone", event.target.checked)
                    }
                    iconStyle={{
                      fontSize: 16,
                    }}
                    checkedIconStyle={{
                      fontSize: 16,
                      color: "#fbc540",
                    }}
                    sx={{
                      padding: "4px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Duotone
                  </Typography>
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <Button
              type="button"
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
              onClick={(e) => {
                formik.handleSubmit();
              }}
            >
              {isImageUploading ? (
                <ThreeDots height="28" width="40" radius="9" color="#FFFFFF" ariaLabel="three-dots-loading" visible />
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

export default ProductVariantForm;
