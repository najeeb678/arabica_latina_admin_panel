import React, { useEffect, useState } from "react";
import Link from "next/link";

import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";

import { Patient, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import CustomStatusStyles from "@/_components/common/CustomStatusStyles";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import { fetchDoctorsRecentPatients } from "@/redux/slices/doctorDashboardSlice";
import { formatDate, getUserId } from "@/utils/utils";

const DoctorRecentPatientsTable = () => {
  const [patientfilter, setPatientFilter] = useState<string>("weekly");
  const [loading, setLoading] = useState<boolean>(false);

  const [userId, setuserId] = useState<any>("");
  const dispatch = useAppDispatch();
  const { doctorsRecentPatients } = useAppSelector(
    (state: RootState) => state.doctorDashboard
  );

  const payload = {
    doctorId: userId || "",
    timeFrame: patientfilter,
    search: "",
  };
  useEffect(() => {
    let user = getUserId();
    setLoading(true);
    setuserId(user);
    if (user) {
      dispatch(fetchDoctorsRecentPatients(payload))
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.warn("User  ID is not defined.");
    }
  }, [patientfilter, dispatch, userId]);

  type TriageType = "Non Urgent" | "Urgent" | "Emergency" | "Out Patient";

  const transformedRecenetPatientData = Array.isArray(doctorsRecentPatients)
    ? doctorsRecentPatients?.map((patient, index) => {
        const triage: TriageType = "Urgent";

        return {
          Sr_No: index + 1,
          ID: patient?.id,
          PatientName: patient?.name || "N/A",
          Age: calculateAge(patient?.dob) || "N/A",
          DateOfBirth: formatDate(patient?.dob) || "N/A",
          Mobile: patient?.contactNo || "N/A",
          Department: patient?.subService?.service?.name || "N/A",
          Triage: triage,
        };
      })
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
  const triageStyleMapping = {
    "Non Urgent": {
      color: "#8adcd5",
      backgroundColor: "#effaf9",
    },
    Urgent: { color: "#f4b566", backgroundColor: "#fdf5e6" },
    Emergency: { color: "#ec2526", backgroundColor: "#fbe6f5" },
    "Out Patient": {
      color: "#939393",
      backgroundColor: "#efefef",
    },
  };

  const columns: Column<Patient>[] = [
    {
      label: "SR. No",
      accessor: "Sr_No",
      render: (value: string, row: Patient) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={"5px"}
          >
            <CustomCheckbox
              isDisabled
              onChange={() => {
                console.log("Selected Patient:", row.PatientName);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ID", accessor: "ID" },
    { label: "Patient Name", accessor: "PatientName" },
    { label: "Age", accessor: "Age" },
    { label: "Date of Birth", accessor: "DateOfBirth" },
    { label: "Mobile", accessor: "Mobile" },
    { label: "Department", accessor: "Department" },
    {
      label: "Triage",
      accessor: "Triage",
      render: (value: string, row: Patient) => (
        <CustomStatusStyles
          status={row.Triage}
          styleMapping={triageStyleMapping}
          additionalStyles={{ borderRadius: "30px", minWidth: "120px" }}
        />
      ),
    },
  ];

  const handleSelectChange = (value: string) => {
    setPatientFilter(value);
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
      <GenericTable<Patient>
        data={transformedRecenetPatientData}
        columns={columns}
        title="Recent Patients"
        loading={loading}
        customContent={
          <Link
            href="/patients"
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
        filters={filters}
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

export default DoctorRecentPatientsTable;
