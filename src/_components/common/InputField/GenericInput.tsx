import React from "react";
import { CiEdit } from "react-icons/ci";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Theme,
  SxProps,
} from "@mui/material";

type GenericInputProps = {
  label?: string;
  inputfieldHeight?: string;
  name?: string;
  value: string;
  onChange: (newValue: string) => void;
  type?: "text" | "number" | "date" | "time" | "email";
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  editIcon?: boolean;
  readonly?: boolean;
  multiLine?: boolean;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  labelStyle?: SxProps<Theme>;
  error?: boolean; // Add error prop
  helperText?: string; // Add helperText prop
  disabled?: boolean;
  noBorderRadius?: boolean;
};

const GenericInput: React.FC<GenericInputProps> = ({
  label,
  value,
  name,
  onChange,
  type = "text",
  onBlur,
  placeholder,
  readonly = false,
  editIcon = false,
  multiLine = false,
  icon,
  sx,
  labelStyle,
  inputfieldHeight,
  error, // Destructure error
  helperText, // Destructure helperText
  disabled = false,
  noBorderRadius,
}) => {
  // Handle CNIC formatting

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (type === "number") {
      if (newValue === "") {
        onChange("");
        return;
      }

      const parsedValue = parseFloat(newValue);
      if (isNaN(parsedValue)) {
        return;
      }
      newValue = parsedValue.toString();
    }

    onChange(newValue);
  };

  return (
    <>
      <Typography
        sx={{
          color: "#2E2B2A",
          fontSize: "14px",

          ...labelStyle,
        }}
      >
        {label}
      </Typography>
      <TextField
        id={label}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        variant="outlined"
        onBlur={onBlur}
        autoComplete="on"
        fullWidth
        placeholder={placeholder}
        multiline={multiLine}
        minRows={multiLine ? 4 : 1}
        InputProps={{
          readOnly: readonly,
          inputMode: type === "number" ? "numeric" : "text",
          endAdornment: editIcon ? (
            <InputAdornment position="end">
              <IconButton size="small" edge="end" disabled>
                {icon || <CiEdit />}
              </IconButton>
            </InputAdornment>
          ) : null,
          style: { fontSize: "12px", color: "#393939" },
        }}
        inputProps={{
          pattern: type === "number" ? "[0-9]*" : undefined,
        }}
        error={error} // Pass error prop to TextField
        helperText={helperText} // Pass helperText prop to TextField
        sx={{
          margin: "0px 0",
          ...sx,
          "& .MuiOutlinedInput-root": {
            borderRadius: noBorderRadius ? "0px" : "5px",
            height: inputfieldHeight || "40px",

            fontSize: "14px",
            padding: "0px 6px",
            "&:hover fieldset": {
              borderColor: "#7B7B7B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D7D7D7",
            },
            "& .MuiInputAdornment-root": {},
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#7B7B7B",
            fontSize: "12px",
          },
          // Custom styles for AM/PM
          "& .MuiInputBase-input[type='time']::-webkit-calendar-picker-indicator":
            {
              color: "yellow", // Change the color of the AM/PM indicator
            },
          "& .MuiInputBase-input[type='time']::after": {
            color: "yellow", // Change the color of the AM/PM indicator
          },
        }}
      />
    </>
  );
};

export default GenericInput;
