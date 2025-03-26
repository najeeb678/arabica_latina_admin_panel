import React from "react";
import { Box, Container, Typography } from "@mui/material";
import HeroImageUploader from "@/_components/core/HeroImageUploader";

const index = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 3,
          textAlign: "center",

          mb: 5,
        }}
      >
        <Typography>Hero Section Images Upload</Typography>
      </Box>
      <HeroImageUploader />
    </Box>
  );
};

export default index;
