import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#F8F5F3",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#BA9775",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#868282",
            marginBottom: 4,
          }}
        >
          We couldn't find the page you're looking for. It might have been
          removed or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#BA9775",
            color: "#fff",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#8B6D56",
            },
          }}
          onClick={() => router.push("/")}
        >
          Go Back to Home
        </Button>
      </Box>
    </>
  );
}
