import React, { FC, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface StatusDropdownProps {
  label?: string; // Label for the dropdown
  options: Array<{ value: any; label: string; color: string }>; // Options with colors
  selectedValue: string; // Currently selected value
  onChange: (value: string) => void; // Function to handle change
  sx?: React.CSSProperties;
}

const StatusDropdown: FC<StatusDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  sx,
}) => {
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel
        id="status-select-label"
        sx={{
          fontSize: "12px",
          color: selectedOption?.color || "inherit", // Dynamic color
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        value={selectedValue}
        onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": label }}
        sx={{
          fontSize: "12px",
          height: "33px",
          borderRadius: "30px",
          color: selectedOption?.color || "#000", // Dynamic text color
          padding: "7px 10px",
          "& .MuiSelect-select": {
            padding: "7px 0px",
          },
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: selectedOption?.color || "#FBC02D", // Dynamic border color
              border: "none",
            },
            "&:hover fieldset": {
              borderColor: selectedOption?.color || "#FBC02D",
              border: "none",
            },
            "&.Mui-focused fieldset": {
              borderColor: selectedOption?.color || "#FBC02D",
              border: "none",
            },
          },
          ...sx,
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: "12px",
              color: option.color, // Apply color from options
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusDropdown;
