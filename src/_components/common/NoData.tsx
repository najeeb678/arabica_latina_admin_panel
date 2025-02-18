import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

interface NoDataProps {
  message?: string;
}

const NoData = ({ message = "No data available" }: NoDataProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;
