import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import GenericPassword from "@/_components/common/GenericPasswordField";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { resetForgottenPassword } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const ResetPassword = ({ emailAddress }: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must include at least one uppercase letter")
        .matches(/[a-z]/, "Password must include at least one lowercase letter")
        .matches(
          /[@$!%*?&#]/,
          "Password must include at least one special character"
        ),
      confirmNewPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
    }),

    onSubmit: async (data: any) => {
      const payload = { ...data, email: emailAddress };
      setLoading(true);
      try {
        const res = await dispatch(resetForgottenPassword(payload)).unwrap();
        setLoading(false);
        toast("Password reset successfully", { type: "success" });

        router.push("/");
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          width: "388px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "20px",
          gap: "2px",
        }}
      >
        <GenericPassword
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange("newPassword")}
          onBlur={formik.handleBlur("newPassword")}
          placeholder="New Password"
          inputfieldHeight="55px"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <Typography color="error" variant="caption">
            {typeof formik.errors.newPassword === "string"
              ? formik.errors.newPassword
              : ""}
          </Typography>
        )}

        <GenericPassword
          name="confirmNewPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange("confirmNewPassword")}
          onBlur={formik.handleBlur("confirmNewPassword")}
          placeholder="Confirm Password"
          inputfieldHeight="55px"
        />
        {formik.touched.confirmNewPassword &&
          formik.errors.confirmNewPassword && (
            <Typography color="error" variant="caption">
              {typeof formik.errors.confirmNewPassword === "string"
                ? formik.errors.confirmNewPassword
                : ""}
            </Typography>
          )}

        <Box onClick={() => {}}>
          <CustomTypography
            fontSize="12px"
            color="#A6A6A6"
            sx={{
              fontFamily: "Avenir",
              marginTop: "5px",
              lineHeight: "20px",
              fontWeight: "400",
              cursor: "pointer",
            }}
          >
            Password must include minimum 8 characters, upper case letter,
            lowercase letter, and a special character.
          </CustomTypography>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            textTransform: "capitalize",
            borderRadius: "57px",
            fontWeight: "500",
            fontSize: "16px",
            padding: "12px 10px",
            color: "#fff !important",
            backgroundColor: "#FBC02D",
            boxShadow: "none",
            mt: 2,
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
            "Continue"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
