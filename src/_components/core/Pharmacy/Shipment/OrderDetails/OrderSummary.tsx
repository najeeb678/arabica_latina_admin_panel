import React from "react";
import Box from "@mui/material/Box";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { formatDate } from "@/utils/utils";

const OrderSummary = ({ orderDetails = [] }: any) => {
  // Data as key-value pairs
  const orderData = [
    { label: "Order ID", value: orderDetails?.id || "N/A" },
    { label: "Date", value: formatDate(orderDetails?.created_at) || "N/A" },
    {
      label: "Total Products",
      value: orderDetails?.orderItems?.length
        ? `${orderDetails.orderItems?.length}`
        : "N/A",
    },
  ];

  return (
    <Box
      sx={{
        border: "1.5px solid rgba(222, 222, 222, 0.69)",
        borderRadius: "8px",
        padding: "16px",
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
        Order Summary
      </CustomTypography>

      {/* Map through orderData */}
      {orderData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            marginBottom: index < orderData.length - 1 ? "10px" : "0",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              lineHeight: "14.4px",
              textAlign: "left",
              marginRight: "auto",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            {item.label}
          </CustomTypography>
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 450,
              lineHeight: "14.4px",
              textAlign: "right",
              color: item.label === "Total" ? "rgba(233, 0, 0, 1)" : "inherit",
            }}
          >
            {item.value}
          </CustomTypography>
        </Box>
      ))}
    </Box>
  );
};

export default OrderSummary;
