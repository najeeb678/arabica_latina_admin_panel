import React from "react";
import { Box, colors, Paper } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { Margarine } from "next/font/google";

export interface ItemCardProps {
  number: number; // The item's number (e.g., 1, 2, 3, etc.)
  productName: string; // The name of the product
  quantity: number; // Quantity of the product
  price: string; // Price as a formatted string (e.g., "SAR 250.00")
  image: string; // URL or path to the product image
}

const ItemCard: React.FC<ItemCardProps> = ({
  number,
  productName,
  quantity,
  price,
  image,
}) => {
  return (
    <Box
      sx={{
        height: "110px",
        padding: 3,
        width: "100%",
        borderRadius: 2,
        marginBottom: "5px",
        backgroundColor: "rgba(245, 245, 245, 0.9)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center,",
          flexDirection: "row",
          width: "100%",
          height: "100%",

          justifyContent: "space-around",
        }}
      >
        <Box>
          <CustomTypography
            sx={{
              fontFamily: "Avenir, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              lineHeight: "14.4px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            {number < 10 ? `0${number}` : number}
          </CustomTypography>
        </Box>

        {/* Product Image */}
        <Box
          sx={{
           
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Box
            component="img"
            src={image}
            alt={productName}
            sx={{
              width: "89px",
              height: "85px",
              marginLeft: "10px",
            }}
          />
        </Box>

        {/* Product Details */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center,",
            flexDirection: "column",
            height: "100%",

            justifyContent: "space-between",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              marginBottom: "10px",

              textDecoration: "none",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            Product Name
          </CustomTypography>
          <CustomTypography
            sx={{
              // fontFamily: "Avenir", // Corrected camel case
              fontSize: "10px", // Corrected camel case with units
              fontWeight: 500,
              width: "87px", // Corrected camel case with units
              lineHeight: "14px", // Corrected camel case with units
              textAlign: "left",
              textUnderlinePosition: "from-font", // Corrected camel case
              textDecorationSkipInk: "none", // Corrected camel case

              // marginTop: "10px",
            }}
          >
            {productName}
          </CustomTypography>
        </Box>

        {/* Quantity */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center,",
            flexDirection: "column",
            height: "100%",

            justifyContent: "space-between",
          }}
        >
          {" "}
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              lineHeight: "12px",
              textAlign: "left",

              textDecoration: "none",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            Quantity
          </CustomTypography>
          <CustomTypography
            sx={{
              fontSize: "10px", // Correct font size
              fontWeight: 500, // Font weight

              lineHeight: "14px", // Line height
              textAlign: "left", // Align text to the left
              textUnderlinePosition: "from-font", // For underline position
              textDecorationSkipInk: "none", // No text decoration ink
            }}
          >
            {quantity} {/* Display the quantity */}
          </CustomTypography>
        </Box>

        {/* Price */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center,",
            flexDirection: "column",
            height: "100%",

            justifyContent: "space-between",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: "10px",

              fontWeight: 500,
              lineHeight: "12px",
              textAlign: "left",
              textDecoration: "none",
              color: "rgba(123, 123, 123, 1)",
            }}
          >
            Price
          </CustomTypography>
          <CustomTypography
            sx={{
              fontSize: "10px",
              fontWeight: 600,
              lineHeight: "14px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            {price}
          </CustomTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCard;
