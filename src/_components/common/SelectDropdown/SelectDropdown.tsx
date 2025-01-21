import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  options: Option[];
  placeholder?: string; // Optional placeholder
  onSelectChange?: (value: string) => void; // Callback for value change
  defaultValue?: string; // Default selected value
  label?: string; // Optional label for the select input
  sx?: { [key: string]: any }; // Optional sx prop for custom styles
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  placeholder = "Filter",
  onSelectChange,
  label,
  defaultValue = label ? options[0]?.value : "",
  sx = {},
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // Update the event type to SelectChangeEvent<string>
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value; // No need for type assertion
    setSelectedValue(value);
    if (onSelectChange) {
      onSelectChange(value); // Pass the selected value back to the parent
    }
  };

  return (
    <FormControl
      sx={{
        ...sx,
      }}
      size="small"
    >
      {label && (
        <InputLabel id="custom-select-label" sx={{ fontSize: "12px" }}>
          {label}
        </InputLabel>
      )}
      <Select
        labelId="custom-select-label"
        id="custom-select"
        label={label}
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": placeholder }}
        sx={{
          fontSize: "12px", // Set font size to 12px
          height: "32px", // Set height to 33px
          width: "100px", // Set width to 91px
          borderRadius: "30px",
          color: "#FBC02D",
          padding: "7px 10px", // Set top/bottom padding to 7px and left/right padding to 12px
          "& .MuiSelect-select": {
            padding: "7px 0px", // Ensure the select input has the same padding
          },
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FBC02D",
            },
            "&:hover fieldset": {
              borderColor: "#FBC02D",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FBC02D",
            },
          },
          "& svg": {
            color: "#FBC02D", // Change dropdown arrow color
          },
          ...sx,
        }}
        renderValue={(selected) => {
          if (!selected) return placeholder;
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return selectedOption ? selectedOption.label : placeholder;
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: "12px", // Set font size for MenuItem to 12px
              color: "#FBC01d", // Fix color code with hash
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 10, // Adjust this for left padding
                right: 10, // Adjust this for right padding
                borderBottom:
                  index < options.length - 1 ? "1px solid #e0e0e0" : "none",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
