// CustomTypography.tsx
import React, { ReactNode } from "react";
import { Typography } from "@mui/material";

interface CustomTypographyProps {
  children: ReactNode;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  sx?: object;
  [key: string]: any; // For additional props like `onClick`
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  fontSize = "13px",
  fontWeight = "400",
  color = "#161616",
  sx = {},
  ...props
}) => {
  return (
    <Typography
      sx={{
        fontSize,
        fontWeight,
        color,
        ...sx, // Allow additional sx styles to be passed
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default CustomTypography;
