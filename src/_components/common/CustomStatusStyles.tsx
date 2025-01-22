import { Box } from "@mui/material";
import React from "react";
import CustomTypography from "./CustomTypography/CustomTypography";

interface CustomStatusStylesProps {
  status: string;
  styleMapping: Record<string, React.CSSProperties>;
  additionalStyles?: React.CSSProperties;
}

const CustomStatusStyles: React.FC<CustomStatusStylesProps> = ({
  status,
  styleMapping,
  additionalStyles,
}) => {
  const defaultStyle: React.CSSProperties = {
    color: "white",
    backgroundColor: "transparent",
    borderRadius: "30px",
    padding: "2px 5px",
  };

  const style = styleMapping[status] || defaultStyle; // Use mapping if exists, otherwise use defaultStyle

  return (
    <Box>
      <CustomTypography sx={{ ...style, ...additionalStyles }}>
        {status}
      </CustomTypography>
    </Box>
  );
};

export default CustomStatusStyles;
