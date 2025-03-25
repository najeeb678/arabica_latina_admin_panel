import React from "react";
import { Box, Container, Typography } from "@mui/material";
import HeroImageUploader from "@/_components/core/HeroImageUploader";

const index = () => {
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 3,
          textAlign: "center",

          mb: 5,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#2d2d2d" }}>
          Hero Section Images Upload
        </Typography>
      </Box>
      <HeroImageUploader />
    </Container>
  );
};

export default index;
