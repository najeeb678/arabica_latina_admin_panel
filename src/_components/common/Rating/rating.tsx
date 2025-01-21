import React from "react";
import { Box } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";  // Import star icons

interface RatingProps {
  rating: number;  // rating can be a value from 0 to 5
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = [];
  
  // Loop to create the filled and empty stars based on the rating
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<Star key={i} sx={{ color: '#FFD700', }} />);  // Filled star
    } else {
      stars.push(<StarBorder key={i} sx={{ color: '#FFD700' }} />);  // Empty star
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',  // Align stars to the left
      }}
    >
      {stars}
    </Box>
  );
};

export default Rating;
