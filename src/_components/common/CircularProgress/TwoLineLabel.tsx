import React from "react";
import { Box, Typography } from "@mui/material";

interface TwoLineLabelProps {
  label1: string; // First line of text
  label2: string; // Second line of text
  label1Style?: React.CSSProperties; // Custom style for label1
  label2Style?: React.CSSProperties; // Custom style for label2
}

const TwoLineLabel: React.FC<TwoLineLabelProps> = ({
  label1,
  label2,
  label1Style = {},
  label2Style = {},
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: "14px",
          fontWeight: "300",
          color: "#161616",
          lineHeight: "16px",
          ...label1Style,
        }}
      >
        {label1}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontSize: "14px",
          fontWeight: "300",
          color: "#161616",
          lineHeight: "16px",
          ...label2Style,
        }}
      >
        {label2}
      </Typography>
    </Box>
  );
};

export default TwoLineLabel;
