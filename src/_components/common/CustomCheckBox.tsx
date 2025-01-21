import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SxProps, Theme } from "@mui/material/styles";

interface CustomCheckboxProps {
    checked?: boolean;
    isDisabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
  iconStyle?: SxProps<Theme>;
  checkedIconStyle?: SxProps<Theme>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  sx,
    iconStyle,
    isDisabled=false,
  checkedIconStyle,
}) => {
  return (
    <Checkbox
      size="small"
      checked={checked}
      disabled={isDisabled}
      onChange={onChange}
      icon={
        <CheckBoxOutlineBlankIcon
          sx={{ fontSize: 16, color: "#DEDEDE", ...iconStyle }} // Apply icon styles
        />
      }
      checkedIcon={
        <CheckBoxIcon
          sx={{ fontSize: 16, color: "#fbc540", ...checkedIconStyle }} // Apply checkedIcon styles
        />
      }
      sx={{
        "&.MuiCheckbox-root": {},
        ...sx,
      }}
    />
  );
};

export default CustomCheckbox;
