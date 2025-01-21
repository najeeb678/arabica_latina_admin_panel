import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import AnalyticsCard from "@/_components/core/Dashboard/AnalyticsCards";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchDoctorDashboardAnalytics } from "@/redux/slices/doctorDashboardSlice";

const DoctorAnalyticsCards = () => {

  const dispatch = useAppDispatch();
  
  const { doctorAnalytics, loading } = useAppSelector((state) => state.doctorDashboard);

  useEffect(() => {
    dispatch(fetchDoctorDashboardAnalytics({ doctorId: "f35f788e-f3b6-4735-b27a-24e4068fdd87" }));
  }, [dispatch]);
  const cardData = [
    {
      image: "/images/Appointment.svg",
      label: "Appointments",
      value: doctorAnalytics?.totalAppointments || 0,
      percentage: `${doctorAnalytics?.percentageChanges?.appointments || 0}% vs last month`,
    },
    {
      image: "/images/Paitents.svg",
      label: "New Paitents",
      value: doctorAnalytics?.totalPatients || 0,
      percentage: `${doctorAnalytics?.percentageChanges?.patients || 0}% vs last month`,
      currency: "      ",
    },
    {
      image: "/images/Surgeries.svg",
      label: "Surgeries",
      value: "0",
      percentage: "-15% vs last month",
    },
    {
      image: "/images/Earnings.svg",
      label: "Earnings",
      value: doctorAnalytics?.totalEarnings || 0,
      currency: "SAR",
      percentage: `${doctorAnalytics?.percentageChanges?.earnings || 0}% vs last month`,
    },
  ];
  return (
    <>
      <Grid container spacing={1.6}>
        {cardData.map((data, index) => (
         <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
            <AnalyticsCard
              sx={{
                width: "100%",
                height: "140px",
                borderRadius: "8px",
                border: "1px solid #CECECE",
                display: "flex",
                flexDirection: "column",
              }}
              image={data.image}
              label={data.label}
              currency={data.currency}
              value={data.value}
              percentage={data.percentage}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DoctorAnalyticsCards;
