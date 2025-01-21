import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import Grid from "@mui/material/Grid2";
import AnalyticsCard from "@/_components/core/Dashboard/AnalyticsCards";
import { fetchDashboardAnalytics } from "@/redux/slices/AdminDashboardSlice";

const AdminAnalyticsCards = () => {
  const dispatch = useAppDispatch();

  const { analytics, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardAnalytics());
  }, [dispatch]);

  const cardData = [
    {
      image: "/images/Appointment.svg",
      label: "Appointments",
      value: analytics?.totalAppointments || 0,
      percentage: `${
        analytics?.percentageChanges?.appointments || 0
      }% vs last month`,
    },
    {
      image: "/images/Paitents.svg",
      label: "New Patients",
      value: analytics?.totalPatients || 0,
      percentage: `${
        analytics?.percentageChanges?.patients || 0
      }% vs last month`,
    },
    {
      image: "/images/Surgeries.svg",
      label: "Surgeries",
      value: "0",
      percentage: "-15% vs last month",
    },
    {
      image: "/images/Earnings.svg",
      label: "Earnings",
      value: analytics?.totalEarnings || 0,
      currency: "SAR",
      percentage: `${
        analytics?.percentageChanges?.earnings || 0
      }% vs last month`,
    },
  ];

  return (
    <>
      <Grid container spacing={1.6}>
        {cardData.map((data, index) => (
          //  <Grid size={{ xs: 6, md: 8 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
            <AnalyticsCard
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

export default AdminAnalyticsCards;
