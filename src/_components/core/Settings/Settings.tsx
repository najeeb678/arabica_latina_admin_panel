import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";

import ProfileImageSelector from "@/_components/common/ImageSelector/ProfileImageSelector";
import { toast } from "react-toastify";
import {
  createAdmin,
  getAdminDetails,
  getDoctorDetails,
  UpdateAdmin,
  UpdateDoctor,
} from "@/redux/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { getDecodedToken, getRole } from "@/utils/utils";
import { set } from "lodash";
type UserDetails = {
  id: string;
  name: string;
  profilePic: string;
  email: string;
  contactNumber: string;
  role: string;
  password: string;
};

const SettingsDetails: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isDataloading, setIsDataLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    const userRole = getRole() || "";
    setRole(userRole);
  }, [role]);

  useEffect(() => {
    const token = getDecodedToken();

    if (role) {
      setIsDataLoading(true); // Start loading data
      const fetchData = async () => {
        try {
          let res;
          if (role === "Admin") {
            res = await dispatch(getAdminDetails(token?.userId)).unwrap();
          } else {
            res = await dispatch(getDoctorDetails(token?.userId)).unwrap();
          }

          setUserDetails(res);
          formik.setValues({
            name: res.name || "",
            email: res.email || "",
            profilePic: res.profilePic || "",
            contactNumber: res.contactNumber || "",
          });
          setImageUrl(res.profilePic || "");
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchData();
    }
  }, [role]);
  const handleImageChange = (url: string) => {
    formik.setFieldValue("profilePic", url);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profilePic: "",
      contactNumber: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),

      // contactNumber: Yup.string().required("Contact No is required"),
      contactNumber: Yup.string()
        .required("Contact No is required")
        .matches(/^\+?\d+$/, "Contact No must be a number"),
    }),
    onSubmit: async (data) => {
      setLoading(true);

      try {
        if (data.profilePic === "") {
          toast.error("Please upload an image before submitting.");
          setLoading(false);
          return;
        }

        const response =
          role === "Admin"
            ? await dispatch(
                UpdateAdmin({ id: userDetails!.id, data: data })
              ).unwrap()
            : await dispatch(
                UpdateDoctor({ id: userDetails!.id, data: data })
              ).unwrap();

        if (response) {
          setIsEdit(false);
          formik.setValues({
            name: response.name || "",
            email: response.email || "",
            profilePic: response.profilePic || "",
            contactNumber: response.contactNumber || "",
          });
          setUserDetails(response);
          toast("Updated successfully", { type: "success" });
        }

        setLoading(false);
      } catch (error: any) {
        toast.error(error);
        setLoading(false);
      }
    },
  });
  const handleCancel = () => {
    setIsEdit(false);
    if (userDetails) {
      formik.setValues({
        name: userDetails.name || "",
        email: userDetails.email || "",
        profilePic: userDetails.profilePic || "",
        contactNumber: userDetails.contactNumber || "",
      });
    }
  };
  return (
    <Box
      style={{
        width: "100%",
        borderRadius: "10px",
        marginTop: "-1px",
      }}
    >
      {isDataloading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            height: "100%",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#fbc02d" }} />
        </Box>
      ) : (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} direction="row">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={2}
              direction="row"
              size={12}
            >
              <Grid size={{ xs: 12 }} component="div">
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #CECECE",
                    borderRadius: "10px",
                    height: "160px",
                    display: "flex",
                    padding: "0px 20px 0px 0px",
                    flexDirection: "row",

                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ProfileImageSelector
                        selectedImage={imageUrl}
                        onImageChange={handleImageChange}
                        setIsImageUploading={setIsImageUploading}
                        isDisabled={!isEdit}
                        imageHeight={110}
                        imageWidth={110}
                        customStyles={{
                          justifyContent: "flex-start",
                          marginLeft: "20px",
                          width: "auto",
                        }}
                      />
                      <Box
                        sx={{
                          marginLeft: "15px",
                          height: "100%",
                          alignItems: "flex-end",
                        }}
                      >
                        <CustomTypography
                          sx={{
                            fontWeight: "500",
                            fontSize: "18px",
                            lineheight: "20px",
                            color: "#161616",
                          }}
                        >
                          {userDetails?.name || "Name not available"}
                        </CustomTypography>

                        <CustomTypography
                          sx={{
                            fontWeight: "350",
                            fontSize: "12px",
                            lineheight: "17px",
                            color: "#7B7B7B",
                          }}
                        >
                          {userDetails?.role || "Role not available"}
                        </CustomTypography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{}}>
                    <Button
                      onClick={() => {
                        if (isEdit) {
                          handleCancel();
                        } else {
                          setIsEdit(true);
                        }
                      }}
                      style={{
                        height: "25px",
                        width: "85px",
                        backgroundColor: "rgba(251, 192, 45, 1)",
                        border: "none",
                        color: "white",
                        borderRadius: "12px",
                        padding: "6px 12px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      {isEdit ? "Cancel" : "Edit"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                component="div"
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #CECECE",
                  borderRadius: "10px",
                  padding: "0px 20px",
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomTypography
                  sx={{
                    margin: "15px 0px 10px 0px",
                    width: "100%",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineheight: "17px",
                    color: "#161616",
                  }}
                >
                  Personal Details
                </CustomTypography>
                <Divider
                  sx={{ width: "100%", color: "#A6A6A6", marginBottom: "15px" }}
                />
                <Grid size={{ xs: 12 }} component="div">
                  <GenericInput
                    label="Enter Name"
                    type="text"
                    name="name"
                    disabled={!isEdit}
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    placeholder="Enter  Name"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : undefined
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12 }} component="div">
                  <GenericInput
                    name="email"
                    label="Email"
                    type="text"
                    disabled={!isEdit}
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    placeholder="Enter Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="error-message">
                      {" "}
                      {typeof formik.errors.email === "string"
                        ? formik.errors.email
                        : ""}
                    </span>
                  )}
                </Grid>

                <Grid size={{ xs: 12 }} component="div">
                  <GenericInput
                    label="Contact No "
                    name="contactNumber"
                    disabled={!isEdit}
                    value={formik.values.contactNumber}
                    onChange={formik.handleChange("contactNumber")}
                    onBlur={formik.handleBlur("contactNumber")}
                    placeholder="Add contactNo"
                    error={
                      formik.touched.contactNumber &&
                      Boolean(formik.errors.contactNumber)
                    }
                    helperText={
                      formik.touched.contactNumber &&
                      formik.errors.contactNumber
                        ? formik.errors.contactNumber
                        : undefined
                    }
                  />
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "20px 0px",
                  }}
                >
                  {" "}
                  <Button
                    variant="outlined"
                    onClick={() => handleCancel()}
                    style={{ marginRight: "10px" }}
                    disabled={!isEdit}
                    sx={{
                      fontSize: "13px !important",
                      fontWeight: "400 !important",
                      width: "114px !important",
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
                    disabled={!isEdit}
                    variant="contained"
                    sx={{
                      fontSize: "12px !important",
                      fontWeight: "700 !important",
                      fontFamily: "Avenir !important",
                      lineHeight: "18px !important",
                      borderRadius: "50px !important",
                      width: "114px !important",
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
                    {loading || isImageUploading ? (
                      <ThreeDots
                        height="28"
                        width="40"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        visible
                      />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SettingsDetails;
