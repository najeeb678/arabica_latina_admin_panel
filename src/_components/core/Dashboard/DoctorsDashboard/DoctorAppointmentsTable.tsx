import React, { useEffect, useState } from "react";
import Link from "next/link";

import GenericTable from "@/_components/common/GenericTable";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import CustomCheckbox from "@/_components/common/CustomCheckBox";

import { Appointment, Column, FilterConfig } from "@/types/types";

import { Box, CircularProgress } from "@mui/material";
import { fetchDoctorUpcomingAppointments } from "@/redux/slices/doctorDashboardSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import { changeAppointmentStatus } from "@/redux/slices/AdminDashboardSlice";
import { toast } from "react-toastify";
import { getUserId } from "@/utils/utils";
import { useDispatch } from "react-redux";

const DoctorAppointmentsTable = () => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  let userId = getUserId();

  const { doctorUpcomingAppointments } = useAppSelector(
    (state: RootState) => state.doctorDashboard
  );

  const [apointmentfilter, setAppointmentFilter] = useState<string>("weekly");

  const transformedAppointmentsData = doctorUpcomingAppointments
    ? doctorUpcomingAppointments.map((appointment, index) => ({
        Sr_No: index + 1,
        ID: appointment?.id,
        Patient: appointment?.patientId?.name || "N/A",
        Doctor: appointment?.doctorId?.name || "N/A",
        Time:
          `${new Date(appointment?.startTime).toLocaleTimeString("en-US", {
            timeZone: "UTC",
          })}` || "N/A",
        Service: appointment?.subService?.name || "N/A",
        Age: calculateAge(appointment?.patientId?.dateOfBirth) || "N/A",
        DateOfBirth: appointment?.patientId?.dateOfBirth || "N/A",
        Mobile: appointment?.patientId?.contactNumber || "N/A",
        Department: appointment?.subService?.name || "N/A",
        Triage: "Urgent",
        Status: appointment?.status || "N/A",
        Date: new Date(appointment?.startTime).toLocaleDateString() || "N/A",
      }))
    : [];

  function calculateAge(dateOfBirth: string): string {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  }

  const payload = {
    doctorId: userId || "",
    filter: apointmentfilter,
    search: "",
  };
  useEffect(() => {
    setLoading(true);
    dispatch(fetchDoctorUpcomingAppointments(payload))
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, apointmentfilter]);

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await dispatch(
        changeAppointmentStatus({ appointmentId, status: newStatus })
      );

      if (response.meta.requestStatus === "fulfilled") {
        const updatedAppointments = doctorUpcomingAppointments
          ? doctorUpcomingAppointments.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, status: newStatus }
                : appointment
            )
          : [];

        dispatch({
          type: "dashboard/setUpcomingAppointments",
          payload: updatedAppointments,
        });
        dispatch(fetchDoctorUpcomingAppointments(payload));
        toast.success("Appointment status updated successfully!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const statusDropdownoptions = [
    { value: "Pending", label: "Pending", color: "#FFA500" },
    { value: "Confirmed", label: "Confirmed", color: "#28A745" },
    { value: "Completed", label: "Completed", color: "#007BFF" },
    { value: "Cancelled", label: "Cancelled", color: "#DC3545" },
  ];

  const columns: Column<Appointment>[] = [
    {
      label: "SR. No",
      accessor: "Sr_No",
      render: (value: string, row: Appointment) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={"5px"}
        >
          <CustomCheckbox
            isDisabled={true}
            onChange={() => {
              console.log("row1:", row.Patient);
            }}
          />
          <span>{row.Sr_No}</span>
        </Box>
      ),
    },
    // { label: "ID", accessor: "ID" },
    { label: "Patient", accessor: "Patient" },
    { label: "Doctor", accessor: "Doctor" },
    { label: "Time", accessor: "Time" },
    { label: "Date", accessor: "Date" },
    { label: "Service", accessor: "Service" },
    {
      label: "Status",
      accessor: "Status",
      render: (value: string, row: Appointment) => (
        <StatusDropdown
          options={statusDropdownoptions}
          selectedValue={row.Status || "Pending"}
          onChange={(val) => handleStatusChange(row.ID, val)}
          sx={{ width: "160px", backgroundColor: "#f5f5f5", height: "20px" }}
        />
      ),
    },
  ];

  const handleSelectChange = (value: string) => {
    setAppointmentFilter(value);
  };

  const filters: FilterConfig[] = [
    {
      label: "Weekly",
      options: [
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
        { label: "All", value: "all" },
      ],
      onChange: handleSelectChange,
    },
  ];

  return (
    <>
      <GenericTable<Appointment>
        data={transformedAppointmentsData}
        columns={columns}
        title="Upcoming Appointments"
        loading={loading}
        filters={filters}
        customContent={
          <Link
            href="/appointments"
            style={{
              color: "#7B7B7B",
              fontSize: "11px",
              lineHeight: "14px",
              fontWeight: "300",
              fontFamily: "AvenirMedium",
            }}
          >
            view all
          </Link>
        }
        sx={{
          height: "292px",
          overflowY: "hidden",
          marginBottom: "0px",
        }}
        customTableStyles={{
          overflowY: "hidden",
        }}
      />
    </>
  );
};

export default DoctorAppointmentsTable;
