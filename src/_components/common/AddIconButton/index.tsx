import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IconButtonWithPropsProps {
  sx?: React.CSSProperties;
  onClick?: () => void;
}

const AddIconButton: React.FC<IconButtonWithPropsProps> = ({ sx, onClick }) => {
  return (
    <IconButton
      sx={{
        backgroundColor: "#CECECE", // Default background color of the button
        color: "white", // Icon color
        borderRadius: "50%", // Circular button
        padding: "10px", // Padding around the icon
        width: "18px", // Set the button width
        height: "18px", // Set the button height
        "&:hover": {
          backgroundColor: "#B0B0B0", // Darker color on hover
        },
        ...sx, // Allow custom styles from the parent component
      }}
      onClick={onClick}
    >
      <AddIcon sx={{ fontSize: "16px", fontWeight: "500"  ,...sx}} />
    </IconButton>
  );
};

export default AddIconButton;
