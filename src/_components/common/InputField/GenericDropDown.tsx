import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  SxProps,
  Theme,
  SelectChangeEvent, // Import the correct event type
} from "@mui/material";

type Option = {
  label: string;
  value: string | number;
};

type GenericDropDownProps = {
  label?: string; // Dynamic label
  name: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void; // Use SelectChangeEvent
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  labelStyle?: SxProps<Theme>;
  options: Option[];
};

const GenericDropDown: React.FC<GenericDropDownProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  helperText,
  sx,
  labelStyle,
  options,
}) => {
  return (
    <>
      {label && (
        <Typography
          sx={{
            color: "#B2B2B2",
            fontSize: "10px",
            marginTop: "5px",
            marginBottom: "8px",
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      )}
      <FormControl fullWidth error={error} sx={sx}>
        <Select
          id={name}
          name={name}
          value={value}
          onChange={onChange} // Fix applied here
          onBlur={onBlur}
          disabled={disabled}
          displayEmpty
          sx={{
            fontSize: "12px !important",
            height: "40px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D7D7D7" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#D7D7D7" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#D7D7D7" },
            "& .MuiSelect-icon": { color: "#393939" },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
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
