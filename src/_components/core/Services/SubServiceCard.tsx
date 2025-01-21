import React from "react";
import GenericCard from "@/_components/common/GenericCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CiEdit } from "react-icons/ci";
interface SubServicesProps {
   profileImg: string;
   name: string;
   price: string;
}
interface SubServiceDescriptionProps {
   description: string;
}
export const SubServices: React.FC<SubServicesProps> = ({
   profileImg,
   name,
   price,
}) => {
   return (
      <GenericCard height="258px" padding="0px">
         {/* Background Image Section */}
         <Box
            sx={{
               position: "relative",
               height: "237px",
               borderRadius: "8px",
               border: "1px",
               padding: "0px",
            }}
         >
            <Box
               sx={{
                  padding: "0px",
                  width: "100%",
                  height: "185px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  background: "#F5F5F5",
               }}
            />

            {/* Profile Picture */}
            <Box
               sx={{
                  position: "absolute",
                  bottom: "0px",
                  left: "25px",
                  width: "207px",
                  height: "207px",
                  borderRadius: "100px",
                  overflow: "hidden",
                  zIndex: 1,
               }}
            >
               <Box
                  component="img"
                  src={profileImg}
                  alt={name}
                  sx={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                  }}
               />
            </Box>

            {/* Name, Price, and Edit Button */}
            <Box
               sx={{
                  position: "absolute",
                  top: "104px",
                  left: "257px",
                  right: 0, // Ensure this is set to 0 for the button positioning
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
               }}
            >
               {/* Name */}
               <Box
                  sx={{
                     fontSize: "24px",
                     fontWeight: "600",
                     color: "#161616",
                  }}
               >
                  <strong>{name}</strong>
               </Box>

               {/* Price */}
               <Box
                  sx={{
                     fontFamily: "Avenir",
                     fontSize: "14px",
                     fontWeight: "500",
                     color: "#161616",
                     marginBottom: "-20px",
                     paddingTop: "10px",
                  }}
               >
                  {price}
               </Box>

               {/* Edit Button */}
               <Box
                  sx={{
                     padding: "0px",
                     position: "absolute",
                     right: "25px", // Align button to the far right
                     top: "25px", // Adjust the vertical position of the button if needed
                  }}
               >
                  <Button
                     variant="contained"
                     sx={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        color: "white",
                        borderRadius: "50px",
                        width: "106px",
                        height: "34px",
                        textTransform: "none",
                        boxShadow: "none",
                        backgroundColor: "rgba(251, 192, 45, 1)",
                     }}
                  >
                     Edit
                  </Button>
               </Box>
            </Box>
         </Box>
      </GenericCard>
   );
};

export const SubServiceDescription: React.FC<SubServiceDescriptionProps> = ({ description }) => {
   return (
      <Box sx={{ marginTop: "15px" }}>
      <GenericCard height="auto" padding="0px">
         {/* Description Section */}
         <Box
            sx={{
               padding: "0px",
               width: "100%",
               height: "100%",
            }}
         >
            <Box
               sx={{
                  marginTop: '25px',
                  marginLeft: '25px',
                  display: 'flex',  // Use flexbox to align items
                  justifyContent: 'space-between',  // Distribute space between elements
                  alignItems: 'center',  // Vertically align the text and icon
               }}
            >
               {/* Title */}
               <Typography
                  sx={{
                     fontSize: "16px",
                     fontWeight: "600",
                     lineHeight: "19.2px",
                     textAlign: "left",
                     textUnderlinePosition: "from-font",
                     textDecorationSkipInk: "none",
                  }}
               >
                  Description
               </Typography>

               {/* Edit Icon */}
               <Box
                  sx={{
                     marginRight: '30px'
                  }}
               >
                  {/* Replace this with your edit icon, for example, from Material UI */}
                  <CiEdit style={{width: '20px', height: '20px', color: '#B8B8B8'}}/>
               </Box>
            </Box>

            {/* Borderline */}
            <Box
               sx={{
                  border: "0.05px solid", // Thinner and semi-transparent border
                  margin: "15px auto", // Center the box horizontally
                  width: "97%", // Adjust width as needed
                  color: '#A6A6A6'
               }}
            />

            <Box
               sx={{
                  margin: "25px auto",
                  height: '80px',
                  width: '97%',
               }}
            >
               {/* Description Text */}
               <Typography
                  sx={{
                     //fontFamily: "Avenir",
                     fontSize: "14px",
                     fontWeight: "400",
                     lineHeight: "20.02px",
                     textAlign: "left",

                     color: "#7B7B7B",
                     padding: "2px",
                     //borderRadius: "4px",
                  }}
               >
                  {description}
                  
               </Typography>
            </Box>
         </Box>
      </GenericCard>
      </Box>
   );
};

