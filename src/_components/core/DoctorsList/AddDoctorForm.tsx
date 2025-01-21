import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import ProfileImageSelector from "@/_components/common/ImageSelector/ProfileImageSelector";

import GenericInput from "@/_components/common/InputField/GenericInput";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Box, Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDoctors,
  submitDoctorForm,
  upDateDoctor,
} from "../../../redux/slices/DoctorsSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
type EmployeePayrollFormProps = {
  handleClose: () => void; // Define the type for handleClose
  doctorData?: any;
};

const AddDoctorForm: React.FC<EmployeePayrollFormProps> = ({
  handleClose,
  doctorData,
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const doctorServices = useSelector(
    (state: any) => state.doctors.doctorServices
  );
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (doctorData && doctorData !== false) {
      setIsUpdate(true);

      formik.setValues({
        name: doctorData?.name,
        contactNumber: doctorData?.contactNumber,
        email: doctorData?.email,
        degreeName: doctorData?.degreeName,
        degreeInstitute: doctorData?.degreeInstitute || "",
        specializationId: doctorData.specialization?.name || "",
        totalExperience: doctorData?.totalExperience || 0,
        doctorFee: doctorData?.doctorFee || 0,
      });
      setImageUrl(doctorData.profilePic || "");
    } else {
      // Reset state for new entry
      setIsUpdate(false);
      formik.resetForm();
      setImageUrl(""); // Clear image URL
    }
  }, [doctorData]);
  const handleImageUpdate = (imageUrl: string) => {
    setImageUrl(imageUrl); // Directly use the image URL string
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      email: "",
      degreeName: "",
      degreeInstitute: "",
      specializationId: "",
      totalExperience: null,
      doctorFee: null,
    },
    onSubmit: async (data: any) => {

      const payload = {
        ...data,
        profilePic: imageUrl,
      };

      setLoading(true);

      try {
        if (isUpdate) {
          const response = await dispatch(
            upDateDoctor({ id: doctorData.id, data: payload })
          ).unwrap();
          dispatch(getAllDoctors({ search: "", filter: "" }));
          toast("Doctor updated successfully", { type: "success" });
        } else {
          // Create new doctor
          const res = await dispatch(submitDoctorForm(payload)).unwrap();
          dispatch(getAllDoctors({ search: "", filter: "" }));
          toast("Doctor created successfully", { type: "success" });
        }
        setLoading(false);
        handleClose();
      } catch (error: any) {
        toast.error(error?.message || "Failed to create docter");
        setLoading(false);
        console.error("Error during login:", error);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Full name is required"),
      degreeName: Yup.string().required("Degree name is required"),
      contactNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must be a valid number")
        .min(10, "Phone number must be at least 10 digits long")
        .max(15, "Phone number must be at most 15 digits long"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      totalExperience: Yup.number()
        .required("Experience is required")
        .positive("Experience must be a positive number")
        .integer("Experience must be an integer")
        .min(1, "Experience must be at least 1 year"),
      degreeInstitute: Yup.string().required("Institute of Degree is required"),
      specializationId: Yup.string().required(
        "Field of Specialization is required"
      ),
      doctorFee: Yup.number()
        .required("Appointment fee is required")
        .positive("Appointment fee must be a positive number")
        .typeError("Appointment fee must be a number"),
    }),
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
        {/* Main Grid Container */}
        <Grid container spacing={2} direction="column">
          {/* First Section of the Form */}
          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid container size={{ xs: 12, md: 8 }} direction="row">
              <Grid size={{ xs: 12, md: 6 }} component="div">
                <GenericInput
                  name="name"
                  label="Full Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="Enter Full name"
                />
                {formik.touched.name && formik.errors.name && (
                  <span className="error-message">
                    {" "}
                    {typeof formik.errors.name === "string"
                      ? formik.errors.name
                      : ""}
                  </span>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} component="div">
                <GenericInput
                  label="Phone Number"
                  type="text"
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange("contactNumber")}
                  onBlur={formik.handleBlur("contactNumber")}
                  placeholder="Enter Phone Number"
                />
                {formik.touched.contactNumber &&
                  formik.errors.contactNumber && (
                    <span className="error-message">
                      {typeof formik.errors.contactNumber === "string"
                        ? formik.errors.contactNumber
                        : ""}
                    </span>
                  )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} component="div">
                <GenericInput
                  label="Email"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="Enter Email Address"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="error-message">
                    {typeof formik.errors.email === "string"
                      ? formik.errors.email
                      : ""}
                  </span>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} component="div">
                <GenericInput
                  name="degreeName"
                  label="Degree Name"
                  type="text"
                  value={formik.values.degreeName}
                  onChange={formik.handleChange("degreeName")}
                  onBlur={formik.handleBlur("degreeName")}
                  placeholder="Enter Degree name"
                />
                {formik.touched.degreeName && formik.errors.degreeName && (
                  <span className="error-message">
                    {" "}
                    {typeof formik.errors.degreeName === "string"
                      ? formik.errors.degreeName
                      : ""}
                  </span>
                )}
              </Grid>
            </Grid>

            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                order: { xs: -1, md: 0 },
              }}
              component="div"
            >
              <ProfileImageSelector
                selectedImage={imageUrl}
                onImageChange={handleImageUpdate}
                setIsImageUploading={setIsImageUploading}
              />
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 4 }} component="div">
              <GenericInput
                name="degreeInstitute"
                label="Institute Name"
                type="text"
                value={formik.values.degreeInstitute}
                onChange={formik.handleChange("degreeInstitute")}
                onBlur={formik.handleBlur("degreeInstitute")}
                placeholder="Enter Institute"
              />
              {formik.touched.degreeInstitute &&
                formik.errors.degreeInstitute && (
                  <span className="error-message">
                    {" "}
                    {typeof formik.errors.degreeInstitute === "string"
                      ? formik.errors.degreeInstitute
                      : ""}
                  </span>
                )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} component="div">
              <GenericInput
                label="Experience"
                type="number"
                name="totalExperience"
                value={formik.values.totalExperience}
                onChange={formik.handleChange("totalExperience")}
                onBlur={formik.handleBlur("totalExperience")}
                placeholder="Years of Experience"
              />
              {formik.touched.totalExperience &&
                formik.errors.totalExperience && (
                  <span className="error-message">
                    {typeof formik.errors.totalExperience === "string"
                      ? formik.errors.totalExperience
                      : ""}
                  </span>
                )}
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 4 }} component="div">
              <SingleSelect
                title="Specialization"
                textFieldLabel="Select"
                data={doctorServices || []}
                onChange={(value) => {
                  formik.setFieldValue("specializationId", value?.id || "");
                }}
                onBlur={formik.handleBlur("specializationId")}
                name="specializationId"
                value={
                  doctorServices.find(
                    (service: any) =>
                      service.id === formik.values.specializationId
                  ) || null
                }
                add={true}
                disabled={false}
                sx={{ borderRadius: "5px", height: "40px", marginTop: "6px" }}
                titleStyle={{
                  color: "#B2B2B2",
                  fontSize: "10px",
                  marginTop: "5px",
                  marginBottom: "2.5px",
                }}
              />

              {formik.touched.specializationId &&
                formik.errors.specializationId && (
                  <span className="error-message">
                    {typeof formik.errors.specializationId === "string"
                      ? formik.errors.specializationId
                      : ""}
                  </span>
                )}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} component="div">
              <GenericInput
                label="Appointment Fee"
                type="number"
                name="doctorFee"
                value={formik.values.doctorFee}
                onChange={formik.handleChange("doctorFee")}
                onBlur={formik.handleBlur("doctorFee")}
                placeholder="Appointment Fee"
              />
              {formik.touched.doctorFee && formik.errors.doctorFee && (
                <span className="error-message">
                  {typeof formik.errors.doctorFee === "string"
                    ? formik.errors.doctorFee
                    : ""}
                </span>
              )}
            </Grid>
          </Grid>

          {/* Submit Button */}
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
                  backgroundColor: "#FBC02D !important", // Same background color
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

export default AddDoctorForm;
