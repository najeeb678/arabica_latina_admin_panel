import React from "react";
import { Button as MUIButton, CircularProgress } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

import style from "./style.module.css";
import { ButtonConfig } from "@/types/types";

export default function Button({
  size = "md",
  variant = "contained",
  label,
  isDisabled = false,
  type = "button",
  leadingIcon,
  trailingIcon,
  loading = false,
  altStyle = false,
  outlinedAlt = false,
  textColored = false,
  onClick,
  sx,
}: ButtonConfig) {
  const sizeClasses = {
    sm: style.btnSmall,
    md: style.btnMedium,
    lg: style.btnLarge,
    full: `${style.btnMedium} ${style.blockBtn}`,
  };

  const variantClass = outlinedAlt
    ? style.outlinedAlt
    : altStyle
    ? style[`${variant}Alt`]
    : variant === "text" && textColored
    ? style.textColored
    : style[variant];

  const disabledClass = isDisabled || loading ? style.disabled : "";

  return (
    <MUIButton
      type={type}
      variant={variant}
      disabled={isDisabled || loading}
      className={`${style.btn} ${sizeClasses[size]} ${variantClass} ${disabledClass}`}
      onClick={onClick}
      startIcon={leadingIcon}
      endIcon={trailingIcon && !loading ? trailingIcon : null}
      sx={{
        ...sx, 
        "& .MuiButton-startIcon": {
          marginLeft: leadingIcon ? -1 : 0, 
        },
        paddingLeft: leadingIcon ? "6px" : "16px", 
        paddingRight: trailingIcon ? "6px" : "16px", 
      }}
    >
      {loading ? (
        <ThreeDots
          height="28"
          width="40"
          radius="9"
          color="#FFFFFF"
          ariaLabel="three-dots-loading"
          visible
        />
      ) : (
        label
      )}
    </MUIButton>
  );
}
