import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import EditModal from "./EditModal";

import { useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";

const loyaltyLevels = [
  { level: "Silver", points: 500 },
  { level: "Gold", points: 1000 },
  { level: "Platinum", points: 1500 },
];

const LoyaltyCards = () => {
  const router = useRouter();

  const { loyaltyPackages, loading } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );



  return (
    <Grid container spacing={2}>
      {/* Loyalty Points Section */}
      <Grid size={{ xs: 12 }} component="div">
        <Box
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            border: "1px solid #D9D9D9",
            background: "#FFFFFF",
            padding: "20px",
            minHeight: "140px",
            overflow: "auto",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="15px"
          >
            <CustomTypography
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "19.2px",
                textAlign: "center",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              Current Loyalty Points
            </CustomTypography>
            <CustomTypography
              variant="h6"
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "14.4px",
                textAlign: "center",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "rgba(123, 123, 123, 1)",
              }}
            >
              Expiry:{" "}
              {loyaltyPackages && loyaltyPackages[0]
                ? loyaltyPackages[0].expiryDate
                : "No expiry date available"}{" "}
              days
            </CustomTypography>
          </Box>

          <Box
            marginTop="25px"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: {
                xs: "row",
                // md: "row",
              },
            }}
          >
            <Box display="flex" sx={{ width: "85%" }}>
              {loyaltyLevels.map((level, index) => (
                <Box key={index} sx={{ marginRight: "35px" }}>
                  <CustomTypography
                    sx={{
                      // fontFamily: "Raleway, sans-serif",
                      fontFamily: "var(--font-avenir-medium)",
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "28.8px",
                      textAlign: "center",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "rgba(251, 192, 45, 1)", // Color for the metal level
                    }}
                  >
                    {level.level}:{" "}
                    <span
                      style={{
                        fontFamily: "var(--font-avenir-medium)",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "19.2px",
                        textAlign: "center",
                        textDecoration: "none",
                        color: "rgba(22, 22, 22, 1)", // Color for the points
                      }}
                    >
                      {level.points} points
                    </span>
                  </CustomTypography>
                </Box>
              ))}
            </Box>

            {/* Edit Button Triggering Modal */}

            <Box sx={{ width: "15%" }}>
              <EditModal />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoyaltyCards;
