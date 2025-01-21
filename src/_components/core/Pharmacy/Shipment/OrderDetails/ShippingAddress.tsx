
import React from "react";
import Box from "@mui/material/Box";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const ShippingAddress = ({ orderDetails }: any) => {
  const { address } = orderDetails;

  return (
    <Box
      sx={{
        border: "1.5px solid rgba(222, 222, 222, 0.69)",
        borderRadius: "8px",
        padding: "20px",
        width: "100%",
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
        Shipping Address
      </CustomTypography>

      <CustomTypography
        sx={{
          fontSize: "11px",
          fontWeight: 400,
          lineHeight: "21.28px",
          color: "rgba(123, 123, 123, 1)",
          marginBottom: "10px",
        }}
      >
        <b>Name:</b> {address.name}
      </CustomTypography>

      <CustomTypography
        sx={{
          fontSize: "11px",
          fontWeight: 400,
          lineHeight: "21.28px",
          color: "rgba(123, 123, 123, 1)",
          marginBottom: "10px",
        }}
      >
        <b>Address:</b> {address.address}
      </CustomTypography>

      <CustomTypography
        sx={{
          fontSize: "11px",
          fontWeight: 400,
          lineHeight: "21.28px",
          color: "rgba(123, 123, 123, 1)",
        }}
      >
        <b>Contact:</b> {address.contactNo}
      </CustomTypography>
    </Box>
  );
};

export default ShippingAddress;
