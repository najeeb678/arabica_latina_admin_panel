import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type GenericPasswordProps = {
  label?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputfieldHeight?: string;
  sx?: object;
  fullWidth?: boolean;
};

const GenericPassword: React.FC<GenericPasswordProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  inputfieldHeight,
  sx,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </IconButton>
          </InputAdornment>
        ),
        style: {
          height: inputfieldHeight || "40px",
        },
      }}
      sx={{
        margin: "8px 0",
        ...sx,
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          "&:hover fieldset": {
            borderColor: "#D7D7D7", // Optional hover color
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D7D7D7", // Optional focused color
          },
        },
        "& .MuiInputBase-input::placeholder": {
            color: "#7B7B7B", // Set the placeholder color
            fontSize: "12px", // Optional: Adjust placeholder font size
          },
      }}
    />
  );
};

export default GenericPassword;
