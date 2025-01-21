import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { IoEllipsisVertical } from "react-icons/io5";
import CustomTypography from "../CustomTypography/CustomTypography";

interface DropDownItem {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DropDownForActionsProps {
  items: DropDownItem[];
}

const DropDownForActions: React.FC<DropDownForActionsProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ cursor: "pointer"}}>
      <IoEllipsisVertical size={15} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableAutoFocusItem={true}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
          >
            {item.icon && <Box sx={{ marginRight: 1 }}>{item.icon}</Box>}
            <CustomTypography sx={{ fontSize: "11px" }}>
              {item.label}
            </CustomTypography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropDownForActions;
