import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";
import ProductImageUploader from "@/_components/common/ImageSelector/productImageSelector";
import CustomMultilineInput from "@/_components/common/InputField/CustomInputField";
import { createServices, updateServices } from "@/redux/slices/ServicesSlice";
import { useAppSelector } from "@/utils/hook";

interface AddServiceProps {
  handleClose?: () => void;
  serviceData?: any | null; // Renamed from productData to serviceData
}

const AddService: React.FC<AddServiceProps> = ({
  handleClose = () => {},
  serviceData = null, // Renamed from productData to serviceData
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allServicesData } = useAppSelector(
    (state: RootState) => state.service
  );
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [serviceImage, setServiceImage] = useState(""); // Renamed from productImage to serviceImage
  const [serviceId] = useState(serviceData?.id);    

  const handleImageChange = (url: string) => {
    formik.setFieldValue("picture", url);
    setServiceImage(url); // Save the uploaded image URL
  };

  console.log('serviceData', serviceData)

  useEffect(() => {
    if (serviceData) {
      setIsUpdate(true);
      formik.setValues({
        name: serviceData?.SERVICE || "",
        picture: serviceData?.IMAGE || "",
        description: serviceData?.DESCRIPTION || "",
      });
      setServiceImage(serviceData.IMAGE);
    } else {
      setIsUpdate(false);
      formik.resetForm();
    }
  }, [serviceData]);
  

  const formik = useFormik({
    initialValues: {
      name: "",
      picture: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Service Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (data) => {
      setLoading(true);
      console.log("Form submitted with data:", data);
  
      try {
        if (data.picture === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return;
        }
  
        if (isUpdate) {
          const updateData = {
            ...data,
            id: serviceData?.ID, 
          };
          await dispatch(updateServices(updateData)).unwrap();
          toast("Updated successfully", { type: "success" });
        } else {
          await dispatch(createServices(data)).unwrap();
          toast("Service created successfully", { type: "success" });
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
            size={8}
          >
            <Grid size={{ xs: 12 }} component="div">
              <GenericInput
                label="Enter Service Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                placeholder="Enter Service Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
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
          <Grid container size={4}>
            <Grid size={{ xs: 12 }} component="div">
              <ProductImageUploader
                selectedImage={serviceImage} // Updated to use serviceImage
                onImageChange={handleImageChange}
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
                  backgroundColor: "#FBC02D !important",
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
                "Update Service" // Updated button text
              ) : (
                <>Add Service</>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddService;