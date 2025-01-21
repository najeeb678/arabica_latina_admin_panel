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
  type?: "text" | "number" | "cnic" | "date" | "time"; // Added datetime-local type
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
  editIcon = true,
  multiLine = false,
  icon,
  sx,
  labelStyle,
  inputfieldHeight,
  error, // Destructure error
  helperText, // Destructure helperText
  disabled=false
}) => {
  // Handle CNIC formatting
  const formatCnic = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits.slice(0, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 12);
    if (digits.length > 12) formatted += " " + digits.slice(12, 13);
    return formatted;
  };

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

    if (type === "cnic") {
      newValue = formatCnic(newValue);
    }

    onChange(newValue);
  };

  const finalPlaceholder =
    type === "cnic" && !placeholder ? "----- ------- -" : placeholder;

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
        placeholder={finalPlaceholder}
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
          maxLength: type === "cnic" ? 15 : undefined,
        }}
        error={error} // Pass error prop to TextField
        helperText={helperText} // Pass helperText prop to TextField
        sx={{
          margin: "8px 0",
          ...sx,
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            height: inputfieldHeight || "40px",
            fontSize: "14px",
            padding: "0px 6px",
            "&:hover fieldset": {
              borderColor: "#D7D7D7",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D7D7D7",
            },
            "& .MuiInputAdornment-root": {

             
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#7B7B7B",
            fontSize: "12px",
          },
           // Custom styles for AM/PM
           "& .MuiInputBase-input[type='time']::-webkit-calendar-picker-indicator": {
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
