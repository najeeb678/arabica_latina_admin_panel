import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

import AddAppointment from "./AddAppointment";
import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  changeAppointmentStatus,
  deleteAppointment,
  getAllAppointments,
} from "@/redux/slices/AppointmentSlice";

import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";

import { formatDate, formatTime, getUserId } from "@/utils/utils";
import { fetchDoctorUpcomingAppointments } from "@/redux/slices/doctorDashboardSlice";

const DoctorAppointmentsTable = ({ appointmentsData, loading }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  let userId = getUserId();
  const [openAppointmentModal, setOpenAppointmentModal] =
    useState<boolean>(false);
  const [selectedAppointments, setSelectedAppointments] = useState<any | null>(
    null
  );
  const [appointmentsFilter, setAppointmentsFilter] =
    useState<string>("weekly");
  const [filteredName, setFilteredName] = useState<string>("");

  useEffect(() => {
    const payload = {
      doctorId: userId || "",
      filter: appointmentsFilter,
      search: filteredName,
    };

    dispatch(fetchDoctorUpcomingAppointments(payload));
  }, [filteredName, appointmentsFilter, dispatch, userId]);

  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);
  const transformedDoctorsData = appointmentsData
    ? appointmentsData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        ID: data?.id,
        patientName: data?.patientId?.name || "N/A",
        doctor: data?.doctorId?.name || "N/A",
        startTime: formatTime(data?.startTime) || "N/A",
        endTime: formatTime(data?.endTime) || "N/A",
        date: formatDate(data?.scheduledDate),
        service: data?.subService?.name || "N/A",
        fees: data?.doctorId?.doctorFee || 0,
        status: data?.status || "Unknown",
      }))
    : [];
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await dispatch(
        changeAppointmentStatus({ appointmentId, status: newStatus })
      );

      if (response.meta.requestStatus === "fulfilled") {
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
                // console.log("Selected Doctor:", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ID", accessor: "ID" },

    { label: "PATIENT", accessor: "patientName" },
    { label: "DOCTOR", accessor: "doctor" },
    { label: "START TIME", accessor: "startTime" },
    { label: "END TIME", accessor: "endTime" },
    { label: "Date", accessor: "date" },

    { label: "SERVICE", accessor: "service" },
    { label: "FEES", accessor: "fees" },

    {
      label: "STATUS",
      accessor: "status",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap={"10px"}
          >
            {/* {row.status} */}
            <StatusDropdown
              options={statusDropdownoptions}
              selectedValue={row.status || "Pending"}
              onChange={(val) => handleStatusChange(row.ID, val)}
              sx={{
                width: "160px",
                backgroundColor: "#f5f5f5",
                height: "25px",
              }}
            />
            {/* <DropDownForActions
              items={[
                {
                  icon: (
                    <DriveFileRenameOutlineIcon
                      fontSize="inherit"
                      color="primary"
                      sx={{ fontSize: "12px" }}
                    />
                  ),
                  label: "Update",
                  onClick: () => handleOpenUpdate(row),
                },
                {
                  icon: (
                    <DeleteIcon
                      fontSize="inherit"
                      color="error"
                      sx={{ fontSize: "12px" }}
                    />
                  ),
                  label: "Delete",
                  onClick: () => {
                    setSelectedAppointments(row);
                    setIsDeleteModalOpen(true);
                  },
                },
              ]}
            /> */}
          </Box>
        );
      },
    },
  ];

  const onSearchAppointment = (searchTerm: string) => {
    const payload = {
      doctorId: userId || "",
      filter: appointmentsFilter,
      search: searchTerm,
    };

    dispatch(fetchDoctorUpcomingAppointments(payload)).unwrap();
  };

  const searchFunc = useCallback(_debounce(onSearchAppointment, 500), [
    appointmentsFilter,
  ]);

  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setAppointmentsFilter(value);
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

  const handleOpenUpdate = async (id: any) => {
    setOpenAppointmentModal(true);
  };
  const handleCloseUpdate = () => {
    setSelectedAppointments(null);
    setOpenAppointmentModal(false);
  };
  const handleAppointmentDelete = async (id: any) => {
    try {
      const res = await dispatch(deleteAppointment(id)).unwrap();
      if (res) {
        toast.success("Appointment deleted successfully");
      }
      setSelectedAppointments(null);

      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete the Appointment");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <GenericTable<Doctor>
        data={transformedDoctorsData}
        columns={columns}
        title="Appointments"
        loading={loading}
        handleSearchChange={handleSearchChange}
        filters={filters}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
      />

      <CustomModal
        open={openAppointmentModal}
        title={selectedAppointments ? "Update Appointment" : "Add Appointment"}
        handleClose={handleCloseUpdate}
        modalWidth="70%"
      >
        <AddAppointment />
      </CustomModal>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Appointment"
        description="Are you sure you want to delete this Appointment?"
        cancel={() => {
          setSelectedAppointments(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleAppointmentDelete(selectedAppointments?.ID)}
      />
    </>
  );
};

export default DoctorAppointmentsTable;
