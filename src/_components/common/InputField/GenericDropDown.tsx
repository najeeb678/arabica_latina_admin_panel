import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography, SxProps, Theme } from "@mui/material";

type GenericDropDownProps = {
  label?: string;
  name?: string;
  value: string;
  onChange: (newValue: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  labelStyle?: SxProps<Theme>;
};

const GenericDropDown: React.FC<GenericDropDownProps> = ({
  label = "Gender",
  value,
  name,
  onChange,
  onBlur,
  placeholder = "",
  disabled = false,
  error,
  helperText,
  sx,
  labelStyle,
}) => {
  return (
    <>
      <Typography
        sx={{
          color: "#B2B2B2",
          fontSize: "10px",
          marginTop: "5px",
          ...labelStyle,
        }}
      >
        {label}
      </Typography>
      <FormControl fullWidth error={error} sx={sx}>
        <InputLabel
          id={`${name}-label`}
          shrink={!!value} // Only shrink when there is a selected value
          sx={{
            color: value ? "#393939" : "#B2B2B2",
            fontSize: "12px",
            transform: "translate(14px, 12px) scale(1)", // Keep label in its original position
          }}
        >
          {placeholder}
        </InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          displayEmpty
          sx={{
            fontSize: "12px !important",
            height: "40px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D7D7D7",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D7D7D7",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D7D7D7",
            },
            "& .MuiSelect-icon": {
              color: "#393939",
            },
          }}
        >
          <MenuItem value="MEN">Men</MenuItem>
          <MenuItem value="WOMEN">Women</MenuItem>
          <MenuItem value="UNISEX">Other</MenuItem>
        </Select>
        {helperText && (
          <Typography sx={{ fontSize: "12px", color: "#f44336", marginTop: "5px" }}>
            {helperText}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default GenericDropDown;
