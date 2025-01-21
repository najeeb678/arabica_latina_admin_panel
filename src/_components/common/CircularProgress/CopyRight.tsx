// components/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography";

const CopyRight: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get the current year inside the component

  return (
    <Box
      sx={{
        position: "absolute",  // Positioning the footer at the bottom-right
        bottom: 0,
        right: 0,
        marginBottom: "20px",
        marginRight: "80px",
        textAlign: "center",
      }}
    >
      <CustomTypography fontSize="12px" color="#475467"
      sx= {{
         fontFamily: 'Avenir',
         fontWeight: '500'
      }}>
        © Dr. Wafa’a Tulbah Clinics {currentYear}
      </CustomTypography>
    </Box>
  );
};

export default CopyRight;
