import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const CartTotal = ({ orderDetails }: any) => {
  const formatValue = (value: any) =>
    value !== undefined && value !== null ? value : "N/A";
  const cartData = [
    {
      label: "Sub Total",
      value: `SAR: ${formatValue(orderDetails?.totalPrice)}`,
    },
    {
      label: "Discount",
      value: `SAR: ${formatValue(orderDetails?.totalDiscount)}`,
    },
    {
      label: "Shipping Charges",
      value: `SAR: ${formatValue(orderDetails?.deliveryFee?.fee)}`,
    },
  ];

  const total = `SAR ${orderDetails?.price + orderDetails?.deliveryFee?.fee}`;

  return (
    <Box
      sx={{
        border: "1.5px solid rgba(222, 222, 222, 0.69)",
        borderRadius: "8px",
        padding: "20px",
        width: "100%",
        height: "200px",
        backgroundColor: "#fff",
      }}
    >
      {/* Title */}
      <CustomTypography
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "19.2px",
          marginBottom: "20px",
        }}
      >
        Cart Total
      </CustomTypography>

      {/* Cart Data */}
      {cartData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: index === cartData.length - 1 ? "0" : "10px",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: "11px",
              fontWeight: 400,
              lineHeight: "19.2px",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            {item.label}
          </CustomTypography>
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              lineHeight: "19.2px",
            }}
          >
            {item.value}
          </CustomTypography>
        </Box>
      ))}

      {/* Divider */}
      <Divider sx={{ margin: "12px 0" }} />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CustomTypography
          sx={{
            fontSize: "10px",
            fontWeight: 700,
            lineHeight: "19.2px",
          }}
        >
          Total
        </CustomTypography>
        <CustomTypography
          sx={{
            fontSize: "10px",
            fontWeight: 700,
            lineHeight: "19.2px",
          }}
        >
          {total}
        </CustomTypography>
      </Box>
    </Box>
  );
};

export default CartTotal;
