// LoaderComponent.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderComponentProps {
  height?: string;
  circleSize?: number;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({
  height = "90vh",
  circleSize = 50,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        height: "100%",
      }}
    >
      <CircularProgress size={circleSize} />
    </Box>
  );
};

export default LoaderComponent;
