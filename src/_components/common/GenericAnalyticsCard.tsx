import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MovingIcon from "@mui/icons-material/Moving";
import { Box } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

const GenericAnalyticsCard = ({ label, value, percentage }: any) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        height: "129px",
        border: "1px solid #D9D9D9",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "16px !important",
          paddingBottom: "8px !important", // Ensure no bottom padding
        }}
      >
        <CustomTypography
          sx={{
            fontSize: "12px",
            lineHeight: "24px",
            fontWeight: "500",
            flexGrow: 1,
            color: "#161616",
          }}
        >
          {label}
        </CustomTypography>
        <Box
          sx={{
            display: "flex",

            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: "15px",
              color: "#161616",
              lineHeight: "24px",
              fontWeight: "500",
            }}
          >
            {value}
          </CustomTypography>
          {percentage && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#257855",
              }}
            >
              <MovingIcon sx={{ fontSize: "8px" }} />
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: "400",
                }}
              >
                {percentage}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GenericAnalyticsCard;
