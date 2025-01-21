import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GenericCard from "@/_components/common/GenericCard";
import Grid from "@mui/material/Grid2"; // Importing Grid for layout control
import DoctorCard from "./DoctorInfo"; // Assuming you have a DoctorCard component

const TopDoctors = () => {
  // Array of doctor data
  const doctors = [
    {
      imageSrc: "images/topDoc.svg",
      name: "Dr. Haya Ali",
      title: "Dermatologist",
      qualifications: "MBBS, FCPS (Dermatology), CAAAM (USA)",
      experience: "5 yr",
      rating: 4,
      patients: "30+",
      fees: "250 SAR",
    },
    {
      imageSrc: "images/topDoc.svg",
      name: "Dr. John Doe",
      title: "Cardiologist",
      qualifications: "MBBS, MD, FACC",
      experience: "8 yr",
      rating: 5,
      patients: "50+",
      fees: "300 SAR",
    },
    {
      imageSrc: "images/topDoc.svg",
      name: "Dr. Haya Ali",
      title: "Dermatologist",
      qualifications: "MBBS, FCPS (Dermatology), CAAAM (USA)",
      experience: "5 yr",
      rating: 4,
      patients: "30+",
      fees: "250 SAR",
    },
    {
      imageSrc: "images/topDoc.svg",
      name: "Dr. John Doe",
      title: "Cardiologist",
      qualifications: "MBBS, MD, FACC",
      experience: "8 yr",
      rating: 5,
      patients: "50+",
      fees: "300 SAR",
    },
  ];

  // Calculate how many cards are in the last row
  const totalCards = doctors.length;
  const cardsInLastRow = totalCards % 2 === 0 ? 2 : totalCards % 2;

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
              marginTop: "25px",
              marginLeft: "25px",
              display: "flex", // Use flexbox to align items
              justifyContent: "space-between", // Distribute space between elements
              alignItems: "center", // Vertically align the text and icon
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
              Top Doctors
            </Typography>
          </Box>

          {/* Borderline */}
          <Box
            sx={{
              border: "0.05px solid", // Thinner and semi-transparent border
              margin: "15px auto", // Center the box horizontally
              width: "97%", // Adjust width as needed
              color: '#A6A6A6',
            }}
          />
        </Box>

        {/* Grid Layout for Cards */}
        <Grid container spacing={2} sx={{ marginTop: "25px", marginLeft: '25px', marginRight: '25px' }}>
          {/* Loop through doctors array */}
          {doctors.map((doctor, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 6 }}
              component="div"
              sx={{
                // If it's the last row, apply bottom margin
                ...(index >= totalCards - cardsInLastRow && {
                  marginBottom: "25px", // Apply margin to the last row
                }),
                // If the last doctor card is single, it will take up the full row
                ...(doctors.length % 2 !== 0 && index === doctors.length - 1 && {
                  width: '100%', // Take up the entire row on smaller screens
                }),
              }}
            >
              <DoctorCard
                imageSrc={doctor.imageSrc}
                name={doctor.name}
                title={doctor.title}
                qualifications={doctor.qualifications}
                experience={doctor.experience}
                rating={doctor.rating}
                patients={doctor.patients}
                fees={doctor.fees}
              />
            </Grid>
          ))}
        </Grid>
      </GenericCard>
    </Box>
  );
};

export default TopDoctors;
