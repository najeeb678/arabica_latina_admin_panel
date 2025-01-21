import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography";

interface GenericCircularProgressProps {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  textSize?: string;
  label?: React.ReactNode; // Accept JSX for labels
  labelStyle?: React.CSSProperties; // Custom style for titleStyle
  labelColor?: string; // Color for the label text
  trackColor?: string; // Background color for the remaining progress
  title?: string;
  titleStyle?: React.CSSProperties; // Custom style for titleStyle
}

const GenericCircularProgress: React.FC<
GenericCircularProgressProps
> = ({
  value,
  size = 100,
  thickness = 4,
  color = "#E1683B",
  textSize = "10px",
  label,
  labelStyle,
  labelColor = color,
  trackColor = "#E0E0E0",
  title,
  titleStyle,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Background (track) */}
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{
            color: trackColor,
            position: "absolute",
            left: 0,
          }}
          size={size}
          thickness={thickness}
        />

        {/* Foreground (progress) */}
        <CircularProgress
          variant="determinate"
          value={value}
          sx={{
            color,
            scale: "-1 1" /* Invert the progress bar */,
          }}
          size={size}
          thickness={thickness}
          style={{ strokeLinecap: "round" }}
        />

        {/* Centered Label */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: 1.2, 
          }}
        >
          {label ? (
            <Typography
              component="div"
              sx={{
                color: labelColor,
                fontSize: textSize,
                whiteSpace: "nowrap",
                ...labelStyle,
              }}
            >
              {label}
            </Typography>
          ) : (
            <Typography
              component="div"
              sx={{
                color: labelColor,
                fontSize: textSize,
              }}
            >
              {`${Math.round(value)}%`}
            </Typography>
          )}
        </Box>
      </Box>
      {title && <CustomTypography sx={titleStyle}>{title}</CustomTypography>}
    </Box>
  );
};

export default GenericCircularProgress;
