import React from "react";
import {
  TextField,
  InputAdornment,
  Typography,
  Theme,
  SxProps,
} from "@mui/material";

type CustomMultilineInputProps = {
  label?: string;
  title?: string;
  noOflines?: number;
  value: string;
  name?: string;
  onChange: (newValue: string) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
};

const CustomMultilineInput: React.FC<CustomMultilineInputProps> = ({
  label,
  value,
  title,
  name,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  noOflines,
  sx,
}) => {
  return (
    <>
      <Typography
        sx={{
          color: "#B2B2B2",
          fontSize: "10px",
        }}
      >
        {title}
      </Typography>
      <TextField
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        variant="outlined"
        multiline
        rows={noOflines || 4}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        sx={{
          margin: "8px 0",
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            padding: "0px 6px",
            "& fieldset": {
              borderColor: "#D7D7D7",
            },
            "&:hover fieldset": {
              borderColor: "#D7D7D7",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D7D7D7",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
            color: "#393939",
            padding: "10px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#7B7B7B",
            fontSize: "12px",
          },
          ...sx,
        }}
      />
    </>
  );
};

export default CustomMultilineInput;
