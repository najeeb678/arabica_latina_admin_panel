import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import MovingIcon from "@mui/icons-material/Moving";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const AnalyticsCard = ({
  image,
  label,
  currency,
  value,
  percentage,
  sx,
}: any) => {
  const isNegative = percentage && parseFloat(percentage) < 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        borderRadius: "10px",
       
        height: "140px",
        width: "100%",
        padding: "14px",
        border: "1px solid #CECECE",
        // ...sx,
      }}
    >
      <Image src={image} alt={label} width={42} height={42} />

      <CustomTypography
        sx={{
          FontFamily: "Raleway",  
          fontSize: "15px",
          fontWeight: "400",
          lineHeight: "18px",
          marginTop: "12px",
          textAlign: "left",
        }}
      >
        {label}
      </CustomTypography>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          marginTop: "8px",
          width: "100%",
          gap: "8px",
        }}
      >
        <CustomTypography
          sx={{
            fontFamily: "AvenirLT",
            fontSize: "10px",
            fontWeight: "900",
            lineHeight: "14.4px",
            color: "rgba(123, 123, 123, 1)",
          }}
        >
          {currency}
        </CustomTypography>

        <CustomTypography
          sx={{
            fontFamily: "AvenirLT",
            fontSize: "22px",
            fontWeight: "800",
            lineHeight: "28.8px",
            color: "rgba(251, 192, 45, 1)",
          }}
        >
          {value}
        </CustomTypography>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {percentage && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: isNegative ? "#D32F2F" : "#257855",
              }}
            >
              <MovingIcon
                sx={{
                  width: "16px",
                  height: "20px",
                  transform: isNegative ? "scaleY(-1)" : "none", 
                }}
              />
              <CustomTypography
                sx={{
                  fontFamily: "AvenirBook",
                  fontSize: "11px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                  textAlign: "right",
                  color: "#7B7B7B",
                }}
              >
                {Math.abs(parseFloat(percentage))}% vs last month
              </CustomTypography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsCard;
