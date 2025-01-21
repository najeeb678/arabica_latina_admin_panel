import React from "react";
import { Card, Box } from "@mui/material";

type GenericCardProps = {
  children?: React.ReactNode; // Content inside the card
  height?: string; // Height as a string (e.g., "15%", "70%")
  padding?: string; // Customizable padding
};

const GenericCard: React.FC<GenericCardProps> = ({ children, height, padding = "10px 20px 20px 20px" }) => (
  <Card
    sx={{
      boxShadow: "none",
      borderRadius: "10px",
      border: "1px solid #D9D9D9",
      p: padding, // Use the padding prop
      maxHeight: height,
      minHeight: height,
      overflow: "auto",
    }}
  >
    {children && <Box>{children}</Box>}
  </Card>
);

export default GenericCard;
