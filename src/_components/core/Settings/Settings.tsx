import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface UserDetails {
  name: string;
  email: string;
  profilePic: string;
  contactNumber: string;
}

const SettingsDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^\d+$/, "Contact number must be numeric")
      .required("Contact number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profilePic: "",
      contactNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsDataLoading(true);
        // Simulate an API call to update details
        setTimeout(() => {
          toast.success("Details updated successfully");
          setIsEdit(false);
          setIsDataLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to update details");
        setIsDataLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsDataLoading(true);
        // Simulate an API call to fetch user details
        const response: UserDetails = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                name: "John Doe",
                email: "john.doe@example.com",
                profilePic: "https://example.com/profile.jpg",
                contactNumber: "1234567890",
              }),
            1000
          )
        );

        formik.setValues({
          name: response.name || "",
          email: response.email || "",
          profilePic: response.profilePic || "",
          contactNumber: response.contactNumber || "",
        });
        setImageUrl(response.profilePic || "");
      } catch (error) {
        toast.error("Error fetching user details");
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCancel = () => {
    setIsEdit(false);
    formik.resetForm();
  };

  return (
    <div style={{ padding: "20px" }}>
      {isDataLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={!isEdit}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={!isEdit}
            fullWidth
            margin="normal"
          />
          <TextField
            name="contactNumber"
            label="Contact Number"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.contactNumber &&
              Boolean(formik.errors.contactNumber)
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
            disabled={!isEdit}
            fullWidth
            margin="normal"
          />

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button
              type="button"
              onClick={isEdit ? handleCancel : () => setIsEdit(true)}
              style={{
                height: "40px",
                backgroundColor: isEdit ? "#D32F2F" : "#FBC02D",
                color: "white",
                borderRadius: "8px",
                padding: "0 16px",
              }}
            >
              {isEdit ? "Cancel" : "Edit"}
            </Button>
            <Button
              type="submit"
              disabled={!isEdit || isDataLoading}
              variant="contained"
              color="primary"
              style={{ borderRadius: "8px" }}
            >
              {isDataLoading ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SettingsDetails;
