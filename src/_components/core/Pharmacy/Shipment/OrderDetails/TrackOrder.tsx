import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const TrackOrder = ({ orderDetails }: any) => {
  const deliveryDate = orderDetails?.deliveryDate || "08 January, 2025";

  return (
    <>
      {/* Expected Date of Delivery Card */}
      <Box
        sx={{
          border: "1.5px solid rgba(222, 222, 222, 0.69)",
          borderRadius: "8px",
          padding: "20px",
          paddingBottom: "20px",
          width: "100%",
          backgroundColor: "rgb(255, 255, 255)",

        }}
      >
        <CustomTypography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "19.2px",
            marginTop: "6px",
            marginBottom: "25px",
          }}
        >
          Expected Date of Delivery
        </CustomTypography>

       
          <CustomTypography
           
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "22.4px",
              marginBottom: "8px",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            {deliveryDate}
         
          </CustomTypography>

        {/* Align button to the left */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(251, 192, 45, 1)',
              height: '25px',
              width: '140px',
              color: 'rgba(255, 255, 255, 1)',
              fontSize: '8px',
              fontWeight: 400,
              borderRadius: '20px',
            //   padding: '5px 20px',
            marginLeft: '270px',
             
            }}
          >
            Track Order
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default TrackOrder;
