import React from "react";
import Box from "@mui/material/Box";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const PaymentMethod = ({ orderDetails }: any) => {
  const paymentDetails = [
    { key: "Payment Method", value: orderDetails?.paymentMethod || "N/A" },
    { key: "Customer Name", value: orderDetails?.customer_id?.name || "N/A" },
    { key: "Customer Email", value: orderDetails?.customer_id?.email || "N/A" },
  ];

  return (
    <>
      {/* Payment Method Card */}
      <Box
        sx={{
          border: "1.5px solid rgba(222, 222, 222, 0.69)",
          borderRadius: "8px",
          padding: "20px",
          paddingBottom: "10px",
          width: "100%", // Ensure this is necessary or adjust width as needed
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <CustomTypography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "19.2px",
            marginBottom: "20px",
          }}
        >
          Payment Method
        </CustomTypography>

        {paymentDetails.map(({ key, value }, index) => (
          <React.Fragment key={index}>
            <Box sx={{ display: "flex",gap:"10px" }}>
              <CustomTypography
                sx={{
                  fontSize: "12px",
                  fontWeight: 300,
                  lineHeight: "21.28px",
                  color: "rgba(123, 123, 123, 1)",
                  marginBottom: "8px",
                }}
              >
                <b>{key}:</b>
              </CustomTypography>
              <CustomTypography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "21.28px",
                  color: "rgba(123, 123, 123, 1)",
                  marginBottom: "8px",
                }}
              >
                {value}
              </CustomTypography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default PaymentMethod;
