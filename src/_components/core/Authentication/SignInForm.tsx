/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Image from "next/image";

import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { loginUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import OTPCodeInputField from "./OTPCodeInputField";
import ResetEmailInput from "./ResetEmailInput";
import ResetPassword from "./PasswordResetForm";
import GenericInput from "@/_components/common/InputField/GenericInput";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";

import { MdOutlineMail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid2";
import { Typography, Button } from "@mui/material";
import GenericPassword from "@/_components/common/GenericPasswordField";

const SignInForm = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isDisplayOTP, setisDisplayOTP] = useState(false);

  const [ShowResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  const roles = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "Doctor",
    },
  ];
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: null,
    },

    onSubmit: async (data: any) => {
      const payload = {
        ...data,
        role: data.role.name,
      };

      setLoading(true);

      try {
        const res = await dispatch(loginUser(payload)).unwrap();
        setLoading(false);
        toast("Signed in successfully", { type: "success" });
        router.push("/");
      } catch (error: any) {
        toast.error(error?.message);
        setLoading(false);
        console.error("Error during login:", error);
      }
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email")
        .required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must include at least one uppercase letter")
        .matches(/[a-z]/, "Password must include at least one lowercase letter")
        .matches(
          /[@$!%*?&#]/,
          "Password must include at least one special character"
        ),
      role: Yup.object()
        .shape({
          id: Yup.number().required(),
          name: Yup.string().required(),
        })
        .nullable()
        .required("Role is required"),
    }),
  });
  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      {/* Left half with image */}
      <Grid
        size={{ xs: 12, md: 6 }}
        component="div"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/SignIn.png"
          alt="Sign In"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Grid>

      {/* Right half with form */}

      <Grid
        size={{ xs: 12, md: 6 }}
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginTop: forgotPassword
                ? ShowResetPasswordForm
                  ? { xs: "50px", md: "60px", xl: "150px" }
                  : { xs: "50px", md: "60px", xl: "150px" }
                : { xs: "20px", md: "40px", xl: "150px" },
            }}
          >
            <Image
              src="/images/mologo 3.svg"
              alt="Logo"
              width={168}
              height={163}
              className="responsive-logo"
              priority
            />
          </Box>

          <CustomTypography
            textAlign="center"
            sx={{
              fontFamily: "Avenir",
              fontSize: { xs: "18px", md: "24px" },
              fontWeight: "800",
              lineHeight: "28.6px",
              marginTop: "34px",
            }}
          >
            {forgotPassword
              ? isDisplayOTP
                ? ShowResetPasswordForm
                  ? "Reset Password"
                  : "Verification"
                : "Reset Password"
              : " Sign In to your account"}
          </CustomTypography>
          <CustomTypography
            fontSize="12px"
            textAlign="center"
            sx={{
              fontFamily: "Avenir",
              fontWeight: "500",
              lineHeight: "15.96px",
              color: "#7B7B7B",
              marginTop: "5px",
            }}
          >
            {forgotPassword
              ? isDisplayOTP
                ? ShowResetPasswordForm
                  ? "Create a new password to get into your account!"
                  : "We have sent you an OTP to your email"
                : "Enter your email address to reset your password"
              : "  Enter your details to proceed further"}
          </CustomTypography>
          {!forgotPassword ? (
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{
                maxWidth: "388px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "0 auto",
                marginTop: "20px",
                gap: "2px",
              }}
            >
              <GenericInput
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                placeholder="Email"
                icon={<MdOutlineMail />}
                inputfieldHeight="55px"
                sx={{ margin: "0px" }}
              />
              {formik.touched.username && formik.errors.username && (
                <Typography color="error" variant="caption">
                  {typeof formik.errors.username === "string"
                    ? formik.errors.username
                    : ""}
                </Typography>
              )}
              <GenericPassword
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                placeholder="Password"
                inputfieldHeight="55px"
              />
              {formik.touched.password && formik.errors.password && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ marginTop: "-5px" }}
                >
                  {typeof formik.errors.password === "string"
                    ? formik.errors.password
                    : ""}
                </Typography>
              )}

              <SingleSelect
                // title="Role"
                textFieldLabel="Select Role"
                data={roles}
                onChange={(value) => formik.setFieldValue("role", value)}
                onBlur={formik.handleBlur("role")}
                name="role"
                value={formik.values.role}
                add={true}
                disabled={false}
                sx={{ borderRadius: "5px", height: "55px", marginTop: "2px" }}
              />
              <Box sx={{ height: "2px" }}></Box>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error" variant="caption">
                  {typeof formik.errors.role === "string"
                    ? formik.errors.role
                    : ""}
                </Typography>
              )}
              <Box onClick={() => handleForgotPassword()}>
                <CustomTypography
                  fontSize="12px"
                  color="#E90000"
                  sx={{
                    fontFamily: "Avenir",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Forget Password?
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
                  "Sign In"
                )}
              </Button>
            </Box>
          ) : isDisplayOTP ? (
            ShowResetPasswordForm ? (
              <ResetPassword emailAddress={emailAddress} />
            ) : (
              <Box
                sx={{
                  maxWidth: "100%",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "388px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginTop: "60px",
                    gap: "2px",
                  }}
                >
                  <OTPCodeInputField
                    setShowResetPasswordForm={setShowResetPasswordForm}
                    emailAddress={emailAddress}
                  />
                </Box>
              </Box>
            )
          ) : (
            <ResetEmailInput
              setisDisplayOTP={setisDisplayOTP}
              setForgotPassword={setForgotPassword}
              setEmailAddress={setEmailAddress}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "20px",
              zIndex: "1",
            }}
          >
            <CustomTypography
              fontSize="12px"
              color="#475467"
              sx={{
                fontFamily: "Avenir",
                fontWeight: "500",
              }}
            >
              © Dr. Wafa’a Tulbah Clinics {currentYear}
            </CustomTypography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
