import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Doctor, Column, FilterConfig } from "@/types/types";
import { Box } from "@mui/material";
import { RootState } from "@/redux/store";
import { getRole, getUserId } from "@/utils/utils";
import {
  fetchDoctorUpcomingAppointments,
  fetchDoctorsRecentPatients,
} from "@/redux/slices/doctorDashboardSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchRecentPatients } from "@/redux/slices/AdminDashboardSlice";

const PatientsTable = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const [patientFilter, setPatientFilter] = useState<string>("weekly");
  const [filteredName, setFilteredName] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isRoleLoaded, setIsRoleLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getRole();
      setUserRole(role);
      setIsRoleLoaded(true);
    };

    fetchRole();
  }, []);

  const { recentPatients } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const { doctorsRecentPatients } = useAppSelector(
    (state: RootState) => state.doctorDashboard
  );
  const userId = getUserId();

  useEffect(() => {
    if (isRoleLoaded) {
      const payload = {
        timeFrame: patientFilter,
        search: "",
      };

      if (userRole === "Admin") {
        dispatch(fetchRecentPatients(payload))
          .unwrap()
          .then(() => {
            setLoading(false);
          });
      } else {
        dispatch(
          fetchDoctorsRecentPatients({ doctorId: userId || "", ...payload })
        )
          .unwrap()
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [patientFilter, dispatch, userRole, isRoleLoaded]);

  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);

  const transformedPatientData = (
    recentPatients ||
    doctorsRecentPatients ||
    []
  ).map((data: any, index: any) => ({
    Sr_No: index + 1,
    ID: data.id,
    patientName: data?.patientId?.name || "N/A",
    email: data?.patientId?.email || "N/A",
    dateOfBirth: data?.patientId?.dateOfBirth || "N/A",
    doctorName: data?.doctorId?.name || "N/A",
    scheduledTime:
      `${new Date(data?.startTime).toLocaleTimeString("en-US", {
        timeZone: "UTC",
      })}` || "N/A",
    scheduledDate: new Date(data.startTime).toLocaleDateString() || "N/A",
    age: calculateAge(data?.patientId?.dateOfBirth) || "N/A",
    department: data?.subService?.service.name || "N/A",
  }));

  function calculateAge(dateOfBirth: string): string | null {
    if (!dateOfBirth) {
      return null;
    }

    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) {
      return null;
    }

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

  const columns: Column<any>[] = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={"5px"}
            sx={{ marginLeft: "-20px" }}
          >
            <CustomCheckbox
              isDisabled
              onChange={() => {
                // console.log("Selected Patient:", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "PATIENT", accessor: "patientName" },
    { label: "EMAIL", accessor: "email" },
    { label: "DATE OF BIRTH", accessor: "dateOfBirth" },
    { label: "AGE", accessor: "age" },
    { label: "SCHEDULED DATE", accessor: "scheduledDate" },
    { label: "SCHEDULED TIME", accessor: "scheduledTime" },
    ...(userRole === "Admin"
      ? [{ label: "DOCTOR", accessor: "doctorName" }]
      : []),
    { label: "DEPARTMENT", accessor: "department" },
  ];

  let onSearchPatient: any;

  if (userRole === "Admin") {
    onSearchPatient = (searchTerm: string) => {
      const payload = {
        timeFrame: patientFilter,
        search: searchTerm,
      };

      dispatch(fetchRecentPatients(payload)).unwrap();
    };
  } else {
    onSearchPatient = (searchTerm: string) => {
      const payload = {
        doctorId: userId || "",
        timeFrame: patientFilter,
        search: searchTerm,
      };

      dispatch(fetchDoctorsRecentPatients(payload)).unwrap();
    };
  }
  const searchFunc = useCallback(_debounce(onSearchPatient, 500), [
    patientFilter,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setPatientFilter(value);
  };

  const filters: FilterConfig[] = [
    {
      label: "Filter by",
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
      <GenericTable<any>
        data={transformedPatientData}
        columns={columns}
        title="Recent Patient Records"
        loading={loading}
        handleSearchChange={handleSearchChange}
        filters={filters}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
        customTableStyles={{
          overflowY: "hidden",
        }}
      />
    </>
  );
};

export default PatientsTable;
