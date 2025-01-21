import React, { useMemo } from "react";
import Image from "next/image";

import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

import { Box, useMediaQuery, useTheme } from "@mui/material";

interface GreetingsProps {
  greeting: string;
  name: string;
  message: string;
  imgUrl: string;
}

const Greetings: React.FC<GreetingsProps> = ({
  greeting,
  name ,
  message,
  imgUrl,
}) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.down("md"));
  // const normalizedName = name;
  return (
    <Box
      sx={{
        border: "1px solid #CECECE",
        borderRadius: "10px",
        height: "151px",
        p: "0px 20px 0px 20px",
        overflowX: "auto",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: { xs: "16px", md: "20px", lg: "24px" },
              lineHeight: { xs: "16px", md: "20px", lg: "26px" },
              fontWeight: "400",
              marginTop: "10px",
              color: "#161616",
            }}
          >
            {greeting}
          </CustomTypography>
          <CustomTypography
            sx={{
              fontSize: { xs: "16px", md: "20px", lg: "24px" },
              lineHeight: { xs: "16px", md: "20px", lg: "28px" },
              fontWeight: "700",
              marginTop: "10px",
              color: "#FBC02D",
            }}
          >
            {name}
          </CustomTypography>
        </Box>
        <Box
          sx={{
            alignSelf: "flex-start",
            width: "100%",
          }}
        >
          <CustomTypography
            sx={{
              fontSize: { xs: "12px", md: "14px", lg: "16px" },
              lineHeight: { xs: "16px", md: "18px", lg: "20px" },
              fontWeight: "500",
              marginTop: "8px",
              color: "#7B7B7B",
              fontFamily: "'Avenir', sans-serif",
              textAlign: "left",
            }}
          >
            {message}
          </CustomTypography>
        </Box>
      </Box>

      <Box>
        <Image src={imgUrl} alt="Image" width={360} height={145} />
      </Box>
    </Box>
  );
};

export default Greetings;
