import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import CustomTypography from '@/_components/common/CustomTypography/CustomTypography';
import GenericCard from '@/_components/common/GenericCard';
interface DoctorCardProps {
  imageSrc: string;
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  rating: number;
  patients: string;
  fees: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  imageSrc,
  name,
  title,
  qualifications,
  experience,
  rating,
  patients,
  fees,
}) => {
  return (
   <GenericCard height="auto" padding="0px">
    <Box sx={{ width: '100%',  height: '250px', backgroundColor: '#F5F5F5' }}>
      {/* Grid for image and text */}
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Image Section - takes 5/10 width */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={imageSrc} // Dynamic image source
            alt="Doctor"
            sx={{
              width: '100%',
              height: '207px',
              marginLeft: '15px',
              marginTop: '14px',

              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Grid>

        {/* Text Section - takes 5/10 width */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              paddingLeft: '30px',
              paddingTop: '40px',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <CustomTypography sx={{ fontWeight: '700', fontSize: '16px', lineHeight: '19.2px' }}>
              {name}
            </CustomTypography>
            <CustomTypography sx={{ fontWeight: '400', fontSize: '14px', lineHeight: '16.8px', color: '#7B7B7B', marginTop: '5px' }}>
              {title}
            </CustomTypography>
            <CustomTypography sx={{ fontWeight: '400', fontSize: '14px', lineHeight: '16.8px', color: '#7B7B7B', marginTop: '5px', width: '200px' }}>
              {qualifications}
            </CustomTypography>
            <Box sx={{ marginTop: '14px' }}>
              <Rating value={rating} readOnly />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '20px',
                paddingRight: '20%',
              }}
            >
              {/* First Section: Experience */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '900' }}>{experience}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: '400', color: '#7B7B7B' }}>Experience</Typography>
              </Box>

              {/* Vertical Line */}
              <Box
                sx={{
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#D6D6D6',
                }}
              />

              {/* Second Section: Patients */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '900' }}>{patients}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: '400', color: '#7B7B7B' }}>Patients</Typography>
              </Box>

              {/* Vertical Line */}
              <Box
                sx={{
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#D6D6D6',
                }}
              />

              {/* Third Section: Fees */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '900' }}>{fees}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: '400', color: '#7B7B7B' }}>Fees</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </GenericCard>
  );
};

export default DoctorCard;
