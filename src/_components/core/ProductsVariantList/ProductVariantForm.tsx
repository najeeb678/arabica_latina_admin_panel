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
import {
  createProductVariant,
  updateProductVariant,
} from "../../../redux/slices/ProductVariantsSlice";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import categories from "@/pages/categories";
import { toast } from "react-toastify";
import { updateProductVariantAPI } from "@/redux/api/ProductVariantsApi";

// Define prop types
interface ProductVariantFormProps {
  handleClose: () => void;
  selectedVariant?: any;
}

const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  handleClose,
  selectedVariant = {},
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    selectedVariant?.attachment || ""
  );
  const [loading, setLoading] = useState(false);

  const { productsData, loadingproductsData } = useSelector(
    (state: any) => state.products
  );

  const formik = useFormik({
    initialValues: {
      productId: selectedVariant?.productId || "",
      color: selectedVariant?.color || "",
      style: selectedVariant?.style || "",
      attachment: selectedVariant?.attachment || "",
      isDuotone: selectedVariant?.isDuotone || false,
      size: selectedVariant?.size || "",
      stock: selectedVariant?.stock?.toString() || "",
      price: selectedVariant?.price?.toString() || "",
    },
    validationSchema: Yup.object().shape({
      productId: Yup.string().required("Product is required"),
      color: Yup.string().required("Color is required"),
      style: Yup.string().required("Style is required"),
      size: Yup.string().required("Size is required"),

      stock: Yup.number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : Number(originalValue)
        )
        .typeError("Stock must be a number")
        .required("Stock is required")
        .min(0, "Stock can't be negative"),

      price: Yup.number()
        .required("Price is required")
        .min(0, "Price can't be negative"),
    }),
    // onSubmit: async (data) => {
    //   // dispatch(updateProductVariantAPI())for updateProductVariant
    //   setLoading(true);
    //   const payload = {
    //     ...data,
    //     stock: Number(data.stock),
    //     price: Number(data.price),
    //     attachment: imageUrl,
    //   };

    //   try {
    //     await dispatch(createProductVariant(payload))
    //       .unwrap()
    //       .then((res) => {
    //         toast.success("Product variant created successfully");
    //         handleClose();
    //       })
    //       .catch((err) => {
    //         toast.error(err?.message || "Error creating product variant");
    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   } catch (error) {
    //     console.error("Error creating product variant:", error);
    //   }
    // },
    onSubmit: async (data) => {
      setLoading(true);
      const payload = {
        ...data,
        stock: Number(data.stock),
        price: Number(data.price),
        attachment: imageUrl, // Use updated image URL
      };

      try {
        if (selectedVariant?.variantId) {
          // Update API Call (PATCH)
          await dispatch(
            updateProductVariant({
              id: selectedVariant.variantId,
              data: payload,
            })
          )
            .unwrap()
            .then(() => {
              toast.success("Product variant updated successfully");
              handleClose();
            })
            .catch((err) => {
              toast.error(err?.message || "Error updating product variant");
            });
        } else {
          // Create API Call (POST)
          await dispatch(createProductVariant(payload))
            .unwrap()
            .then(() => {
              toast.success("Product variant created successfully");
              handleClose();
            })
            .catch((err) => {
              toast.error(err?.message || "Error creating product variant");
            });
        }
      } catch (error) {
        console.error("Error submitting product variant:", error);
      } finally {
        setLoading(false);
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
        <Grid container spacing={2} direction="row">
          {/* Inputs Section */}
          <Grid size={{ xs: 12, md: 8 }} component="div">
            {/* Product Dropdown */}

            <Grid size={{ xs: 12 }} component="div" mb={2}>
              {loadingproductsData ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#000"
                  ariaLabel="loading-products"
                />
              ) : productsData?.length > 0 ? (
                <>
                  <SingleSelect
                    title="Select a product"
                    textFieldLabel="Select a product"
                    value={
                      productsData.find(
                        (product: { productId: string }) =>
                          product.productId === formik.values.productId
                      ) || null
                    }
                    data={productsData.map((product: any) => ({
                      ...product,
                      name: `${product.name} - ${product?.category.gender}`,
                    }))}
                    onChange={(value) =>
                      formik.setFieldValue(
                        "productId",
                        (value as any)?.productId || ""
                      )
                    }
                    onBlur={formik.handleBlur("productId")}
                    name="productId"
                    titleStyle={{
                      color: "#2E2B2A",
                      fontSize: "14px",
                      fontFamily: "Helvetica",
                    }}
                    sx={{
                      height: "45px",
                    }}
                  />

                  {formik.touched.productId && formik.errors.productId && (
                    <Typography color="error" variant="caption">
                      {typeof formik.errors.productId === "string"
                        ? formik.errors.productId
                        : ""}
                    </Typography>
                  )}
                </>
              ) : (
                <span className="error-message">No products available</span>
              )}
            </Grid>

            {/* Color Input */}
            <Grid size={{ xs: 12 }} component="div">
              <GenericInput
                label="Color"
                name="color"
                type="text"
                value={formik.values.color}
                onChange={formik.handleChange("color")}
                onBlur={formik.handleBlur("color")}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={
                  formik.touched.color && formik.errors.color
                    ? (formik.errors.color as any)
                    : undefined
                }
                placeholder="Enter color"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>
          </Grid>

          {/* Image Section */}
          <Grid
            size={{ xs: 12, md: 4 }}
            order={{ xs: -1, md: 0 }}
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

          <Grid container spacing={2} size={{ xs: 12, md: 6 }}>
            {/* Style Input */}
            <Grid size={{ xs: 12 }} component="div">
              <GenericInput
                label="Style"
                name="style"
                type="text"
                value={formik.values.style}
                onChange={formik.handleChange("style")}
                onBlur={formik.handleBlur("style")}
                error={formik.touched.style && Boolean(formik.errors.style)}
                helperText={
                  formik.touched.style && formik.errors.style
                    ? (formik.errors.style as any)
                    : undefined
                }
                placeholder="Enter Style"
                sx={{ marginTop: "10px" }}
                inputfieldHeight="45px"
              />
            </Grid>
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
              error={formik.touched.size && Boolean(formik.errors.size)}
              helperText={
                formik.touched.size && formik.errors.size
                  ? (formik.errors.size as any)
                  : undefined
              }
              placeholder="Enter Size"
              sx={{ marginTop: "10px" }}
              inputfieldHeight="45px"
            />
          </Grid>

          {/* Stock Input */}
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <GenericInput
              label="Stock"
              name="stock"
              type="text"
              value={formik.values.stock}
              onChange={formik.handleChange("stock")}
              onBlur={formik.handleBlur("stock")}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={
                formik.touched.stock && formik.errors.stock
                  ? (formik.errors.stock as any)
                  : undefined
              }
              placeholder="Enter stock"
              sx={{ marginTop: "10px" }}
              inputfieldHeight="45px"
            />
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
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={
                formik.touched.price && formik.errors.price
                  ? (formik.errors.price as any)
                  : undefined
              }
              placeholder="Enter price"
              sx={{ marginTop: "10px" }}
              inputfieldHeight="45px"
            />
          </Grid>

          {/* Duotone Checkbox */}
          <Grid size={{ xs: 12, md: 12 }} component="div">
            <label
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
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

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
              {isImageUploading || loading ? (
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                  visible
                />
              ) : (
                <>
                  {selectedVariant?.variantId ? (
                    "Update"
                  ) : (
                    <>
                      {" "}
                      <AddIcon sx={{ marginRight: 1 }} /> Create{" "}
                    </>
                  )}
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
