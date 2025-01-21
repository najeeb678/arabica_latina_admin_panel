/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import { useFormik } from "formik";

import * as Yup from "yup";

import GenericInput from "@/_components/common/InputField/GenericInput";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { MdOutlineMail } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";

import { loadBindings } from "next/dist/build/swc";
import { ThreeDots } from "react-loader-spinner";
import { resendEmailOTP } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const ResetEmailInput = ({
  setisDisplayOTP,
  setForgotPassword,
  setEmailAddress,
}: any) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (data: any) => {
      setLoading(true);
      setEmailAddress(data?.email);
      try {
        const res = await dispatch(resendEmailOTP(data)).unwrap();
        setLoading(false);
        toast("Email sent successfully", { type: "success" });
        setisDisplayOTP(true);
        // router.push("/");
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Username is required"),
    }),
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
          marginTop: "30px",
          gap: "2px",
        }}
      >
        <GenericInput
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          placeholder="Email"
          icon={<MdOutlineMail />}
          inputfieldHeight="55px"
          sx={{ margin: "0px" }}
        />

        <Box onClick={() => setForgotPassword(false)}>
          <CustomTypography
            fontSize="12px"
            color=""
            sx={{
              fontFamily: "Avenir",
              marginTop: "5px",
              lineHeight: "20px",
              fontWeight: "400",

              cursor: "pointer",
            }}
          >
            <span style={{ color: "#FBC02D", textDecoration: "underline" }}>
              Back to Login
            </span>
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
            mt: 3,
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

export default ResetEmailInput;
