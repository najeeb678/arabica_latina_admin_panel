import dynamic from "next/dynamic";
import { useState } from "react";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { Box, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { resendEmailOTP, verifyUserOTP } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const OTPInput = dynamic(() => import("otp-input-react"), { ssr: false });

function OTPCodeInputField({ setShowResetPasswordForm, emailAddress }: any) {
  const dispatch: any = useDispatch();
  const [OTP, setOTP] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      const payload = { username: emailAddress, code: OTP };

      await dispatch(verifyUserOTP(payload)).unwrap();
      toast.success("OTP verified successfully");
      setShowResetPasswordForm(true);
    } catch (error: any) {
      toast.error(error?.message);

      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendClick = () => {
    dispatch(resendEmailOTP({ email: emailAddress }))
      .unwrap()
      .then(() => {
        toast.success("OTP sent successfully");
      })
      .catch((error: any) => {
        toast.error(error?.message);
      });
  };
  const otpInputProps: any = {
    value: OTP,
    onChange: setOTP,
    autoFocus: true,
    OTPLength: 4,
    otpType: "number",
    disabled: false,
    secure: true,
  };
  return (
    <>
      <Box sx={{ marginLeft: "40px" ,marginTop:"-20px"}}>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure
          {...(otpInputProps as any)} // Using any to bypass type issues
        />
      </Box>

      <Box onClick={handleResendClick}>
        <CustomTypography
          fontSize="14px"
          color="#A6A6A6"
          sx={{

            fontFamily: "Avenir",
            marginTop: "15px",
            marginLeft: "40px",
            lineHeight: "20px",
            fontWeight: "400",
            cursor: "pointer",
          }}
        >
          Didn’t receive yet.{" "}
          <span style={{ color: "#FBC02D", textDecoration: "underline" }}>
            Resend
          </span>
        </CustomTypography>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || OTP.length < 4} // Disable until OTP is entered
        onClick={handleContinue}
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
    </>
  );
}

export default OTPCodeInputField;
