// AdminDashboard.tsx
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Greetings from "../Greetings";
import AdminAnalyticsCards from "./AdminAnalyticsCards";
import AdminAppointmentsTable from "./AdminAppointmentsTable";
import { Typography } from "@mui/material";
import PatientChart from "../../../common/Charts/PieCharts/PieChartCard";
import TopDepartments from "./TopDepartments";
import AdminRecentPatientsTable from "./AdminRecentPatientsTable";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";

const AdminDashboard = ({ userData, greetingText }: any) => {
  const dispatch = useAppDispatch();
  const { topDepartments, loading } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const transformedTopDepartmentsData = topDepartments
    ? topDepartments.slice(0, 4).map((department, index) => {
        return {
          label: department.serviceName,
          value: department.percentage,
        };
      })
    : [];

  const colors = ["#3A90F3", "#67DF9C", "#F4B244", "#EC5564"];

  const dynamicText = topDepartments
    ? topDepartments.slice(0, 4).map((department, index) => {
        const color = colors[index % colors.length];
        return {
          label: department.serviceName,
          color: color,
        };
      })
    : [];

  return (
    <Grid container spacing={1.6}>
      <Grid size={{ xs: 12 }} component="div">
        <Greetings
          greeting={`${greetingText}`}
          name={userData?.name || ""}
          message="Have a great day at work"
          imgUrl="/images/admin.png"
        />
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <AdminAnalyticsCards />
      </Grid>

      <Grid container spacing={1.6}>
        <Grid size={{ xs: 12, lg: 9 }} component="div">
          <AdminAppointmentsTable />
        </Grid>
        <Grid size={{ xs: 6, lg: 3 }} component="div">
          <PatientChart
            title="Patient by Department"
            chartData={transformedTopDepartmentsData}
            dynamicText={dynamicText}
          />
        </Grid>
        <Grid size={{ xs: 6, lg: 3 }} component="div">
          <TopDepartments />
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }} component="div">
          <AdminRecentPatientsTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
