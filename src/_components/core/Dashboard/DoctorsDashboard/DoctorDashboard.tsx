import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Greetings from "../Greetings";
import DoctorAnalyticsCards from "./DoctorAnalyticsCards";
import PatientChart from "@/_components/common/Charts/PieCharts/PieChartCard";
import NextAppointment from "./NextAppointmentCard";
import DoctorAppointmentsTable from "./DoctorAppointmentsTable";
import DoctorRecentPatientsTable from "./DoctorRecentPatientsTable";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchDoctorTopDepartments } from "@/redux/slices/doctorDashboardSlice";
import { getUserId } from "@/utils/utils";
const DoctorsDashboard = ({userData,greetingText}:any) => {
let userId=getUserId()
  const dispatch = useAppDispatch();

  
  const { doctorTopDepartments, loading } = useAppSelector((state) => state.doctorDashboard);

  useEffect(() => {
    dispatch(fetchDoctorTopDepartments({doctorId: userId||""}));
  }, [dispatch]);

  const transformedTopDepartmentsData = doctorTopDepartments
    ? doctorTopDepartments.slice(0, 4).map((department, index) => {
        return {
          label: department.serviceName,
          value: department.percentage,
        };
      })
    : [];

  const colors = ["#3A90F3", "#67DF9C", "#F4B244", "#EC5564"];

  const dynamicText = doctorTopDepartments
    ? doctorTopDepartments.slice(0, 4).map((department, index) => {
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
          name={userData?.name||""}
          message="Have a great day at work"
          imgUrl="/images/Dr.png"
        />
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <DoctorAnalyticsCards />
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <Grid container spacing={1.6}>
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <DoctorAppointmentsTable />
          </Grid>

          <Grid size={{ xs: 6, md: 3 }} component="div">
            <NextAppointment />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} component="div">
            <PatientChart
              title="Patient by Services"
              chartData={transformedTopDepartmentsData}
              dynamicText={dynamicText}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <DoctorRecentPatientsTable />
      </Grid>
    </Grid>
  );
};

export default DoctorsDashboard;
