import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2"; // Keeping Grid2
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";

// TypeScript for the InfoSection
interface InfoSectionProps {
  label: string;
  value: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ label, value }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <CustomTypography
      sx={{
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: "16.8px",
        marginBottom: "7px",
      }}
    >
      {label}
    </CustomTypography>
    <CustomTypography
      sx={{
        fontSize: "10px",
        fontWeight: 400,
        lineHeight: "17.16px",
        color: "rgba(123, 123, 123, 1)",
      }}
    >
      {value}
    </CustomTypography>
  </Box>
);

function AboutMe() {
  // Dynamic data object
  const data = {
    aboutMe: {
      fullName: "Dr. Hala Abbas Khan",
      gender: "Female",
      mobile: "+91 3456 7890",
      email: "halabbas@gmail.com",
      bio: "Hello I am Dr. Bruce Willis, a Dermatologist in Dr. wafa’a TUlbah Clinics. I love to work with all my hospital staff and senior doctors. Hello I am Dr. Bruce Willis, a Dermatologist in Dr. wafa’a TUlbah Clinics. I love to work with all my hospital staff and senior doctors. Hello I am Dr. Bruce Willis, a Dermatologist in Dr. wafa’a TUlbah Clinics. I love to work with all my hospital staff and senior doctors. I love to work with all my hospital staff and senior doctors. Hello I am Dr. Bruce Willis, a Dermatologist in Dr. wafa’a TUlbah Clinics-I love to work with all my hospital staff and senior doctors",
    },
    education: {
      degree: "MBBS, FCPS",
      specialization: "Dermatology",
      institute: "Dr. Wafa’a Tulbah Clinics, Dr. Lorem",
    },
    experience: {
      years: 5,
      title: "Senior Surgeon",
    },
  };

  // Split bio into paragraphs based on periods (or any delimiter you prefer)
  const bioParagraphs = data.aboutMe.bio.split("-");

  return (
    <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
      <Grid container spacing={2}>
        {/* About Me Section */}
        <Grid size={6.5}>
          <GenericCard height="100%">
            <CustomTypography
              sx={{
                marginTop: "12px",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "19.2px",
              }}
            >
              About Me
            </CustomTypography>
            <hr
              style={{
                marginTop: "15px",
                marginBottom: "25px",
                border: "0.5px solid rgba(166, 166, 166, 0.3)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Render dynamic information */}
              <InfoSection label="Full Name" value={data.aboutMe.fullName} />
              <InfoSection label="Gender" value={data.aboutMe.gender} />
              <InfoSection label="Mobile" value={data.aboutMe.mobile} />
              <InfoSection label="Email" value={data.aboutMe.email} />
            </Box>

            {/* Render bio text as paragraphs */}
            {bioParagraphs.map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <CustomTypography
                    key={index}
                    sx={{
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "17.16px",
                      textAlign: "left",
                      color: "rgba(123, 123, 123, 1)",
                      marginTop: "20px",
                    }}
                  >
                    {paragraph.trim()}.
                  </CustomTypography>
                )
            )}
          </GenericCard>
        </Grid>

        {/* Education and Experience Section */}
        <Grid size={5.5}>
          <Grid container spacing={2} direction="column">
            {/* Education Section */}
            <Grid size={12}>
              <GenericCard height="100%">
                <CustomTypography
                  sx={{
                    marginTop: "12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "19.2px",
                  }}
                >
                  Education
                </CustomTypography>
                <hr
                  style={{
                    marginTop: "15px",
                    marginBottom: "25px",
                    border: "0.5px solid rgba(166, 166, 166, 0.3)",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <InfoSection label="Degree" value={data.education.degree} />
                  <InfoSection
                    label="Specialization"
                    value={data.education.specialization}
                  />
                  <InfoSection
                    label="Institute Name"
                    value={data.education.institute}
                  />
                </Box>
              </GenericCard>
            </Grid>

            {/* Experience Section */}
            <Grid size={12}>
              <GenericCard height="50%">
                <CustomTypography
                  sx={{
                    marginTop: "12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "19.2px",
                  }}
                >
                  Experience
                </CustomTypography>
                <hr
                  style={{
                    marginTop: "15px",
                    marginBottom: "25px",
                    border: "0.5px solid rgba(166, 166, 166, 0.3)",
                  }}
                />
                <CustomTypography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 400,
                    lineHeight: "17.16px",
                    textAlign: "left",
                    color: "rgba(123, 123, 123, 1)",
                    marginBottom: "8px",
                  }}
                >
                  {data.experience.years} Years of Experience as a{" "}
                  {data.experience.title}.
                </CustomTypography>
              </GenericCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutMe;
