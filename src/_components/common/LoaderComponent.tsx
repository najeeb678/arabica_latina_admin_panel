
import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderComponentProps {
  height?: string;
  circleSize?: number;
  style?: React.CSSProperties;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({
  height = "80vh",
  circleSize = 60,
  style = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        height: height,

        ...style,
      }}
    >
      <CircularProgress size={circleSize} sx={{ color: "#fbc02d" }} />
    </Box>
  );
};

export default LoaderComponent;
