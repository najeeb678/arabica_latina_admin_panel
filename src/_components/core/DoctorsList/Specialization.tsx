import React from "react";
import GenericCard from "@/_components/common/GenericCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface ProfileCardProps {
  backgroundImg: string;
  profileImg: string;
  name: string;
  designation: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  backgroundImg,
  profileImg,
  name,
  designation,
}) => {
  return (
    <GenericCard height="100%">
      {/* Background Image Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "260px",
          borderRadius: "10px",
        }}
      >
        <Box
          component="img"
          src={backgroundImg}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "10px", // Rounded top-left corner
            borderTopRightRadius: "10px",
          }}
        />

        {/* Profile Picture */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-90px",
            left: "60px",
            width: "153.64px",
            height: "153.64px",
            borderRadius: "50%",
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

        {/* Name and Designation */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            left: "230px",
            fontWeight: "bold",
          }}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              color: "rgba(22, 22, 22, 1)",
              //   marginBottom: "-40px", // Space below the name
            }}
          >
            <strong>{name}</strong>
          </Box>
          <Box
            // component="h3"
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "rgba(123, 123, 123, 0.9)",
              marginBottom: "-20px", // Space above the designation
              paddingTop: "10px",
            }}
          >
            {designation}
          </Box>
        </Box>
      </Box>

      {/* Card Content Section */}
      <Box
        sx={{
          padding: "40px",
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "rgba(245, 245, 245, 1)",
        }}
      >
        <Button
          variant="contained"
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            color: "white",
            borderRadius: "50px",
            width: "90px",
            height: "30px",
            textTransform: "none",
            backgroundColor: "rgba(251, 192, 45, 1)",
          }}
        >
          Edit
        </Button>
      </Box>
    </GenericCard>
  );
};

const App: React.FC = () => {
  return (
    <ProfileCard
      backgroundImg="images/dr2 2.svg"
      profileImg="images/home-doc 1.svg"
      name="Dr. Amina Iqbal Khan"
      designation="Dermatologist"
    />
  );
};

export default App;
