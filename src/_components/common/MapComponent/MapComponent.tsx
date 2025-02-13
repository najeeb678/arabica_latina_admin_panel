import React from "react";
import { Box, Typography } from "@mui/material";

const MapComponent = ({ addressId }: { addressId: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "250px",
        bgcolor: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    >
      <Typography variant="caption">Map for Address ID: {addressId}</Typography>
    </Box>
  );
};

export default MapComponent;
