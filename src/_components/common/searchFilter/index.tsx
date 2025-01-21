import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { CiSearch } from "react-icons/ci";

type SearchFilterProps = {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  sx?: { [key: string]: any };
};

export default function SearchFilter({
  placeholder = "Search",
  onSearchChange,
  sx = {},
}: SearchFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value); // Pass the value to the parent component if needed
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      type="search"
      value={searchValue}
      onChange={handleInputChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton edge="start" sx={{ padding: "0px" }}>
              <CiSearch
                style={{ fontSize: "20px", padding: "0px", marginLeft: "5px" }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          ...sx,
          "& input": {
            // Match the height of the input field for proper alignment
            fontFamily: "Avenir",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "normal",
            padding: "8px 6px",
          },
          "& fieldset": {
            // Optional: border customization
            borderColor: "rgba(123, 123, 123, 1)",
          },
          "&.Mui-focused fieldset": {
            // Optional: focused border color
            borderColor: "rgba(123, 123, 123, 1)",
          },
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: "Avenir",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "15px",
          padding: "0 0 0 5px", // Adjust padding to align placeholder
          color: "rgba(123, 123, 123, 1)", // Placeholder text color
        },
      }}
    />
  );
}
