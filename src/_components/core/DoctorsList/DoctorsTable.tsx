import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

import AddDoctorForm from "./AddDoctorForm";
import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteDoctor,
  fetchDoctorById,
  getAllDoctors,
} from "@/redux/slices/DoctorsSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DoctorsTable = ({ doctorsData, loading }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [openDoctorModal, setOpenDoctorModal] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [doctorsfilter, setDoctorsFilter] = useState<string>("weekly");
  const [filteredName, setFilteredName] = useState<string>("");

  useEffect(() => {
    dispatch(getAllDoctors({ search: filteredName, filter: doctorsfilter }));
  }, [filteredName, doctorsfilter, dispatch]);
  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);
  const transformedDoctorsData = doctorsData
    ? doctorsData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        ID: data.id,
        Name: data.name,
        SPECIALIZATION: data.specialization?.name,
        DEGREE: data.degreeName,
        Mobile: data.contactNumber,
        EMAIL: data.email,
        DateOfJoining: data?.createdAt
          ? format(new Date(data.createdAt), "MM/dd/yyyy")
          : "",
      }))
    : [];

  const columns: Column<Doctor>[] = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: string, row: Doctor) => {
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
    { label: "NAME", accessor: "Name" },
    { label: "SPECIALIZATION", accessor: "SPECIALIZATION" },
    { label: "DEGREE", accessor: "DEGREE" },
    { label: "MOBILE", accessor: "Mobile" }, // Access the mobile field instead of ContactNumber
    { label: "EMAIL", accessor: "EMAIL" },
    {
      label: "DATE OF JOINING",
      accessor: "DateOfJoining",
      render: (value: string, row: Doctor) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <span>{value}</span>
            <DropDownForActions
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
                    setSelectedDoctor(row);
                    setIsDeleteModalOpen(true);
                  },
                },
              ]}
            />
          </Box>
        );
      },
    },
  ];
  const onSearchDoctor = (searchTerm: string) => {
    dispatch(
      getAllDoctors({ search: searchTerm, filter: doctorsfilter })
    ).unwrap();
  };

  const searchFunc = useCallback(_debounce(onSearchDoctor, 500), [
    doctorsfilter,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setDoctorsFilter(value);
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

  const handleOpenUpdate = async (doctor: any) => {
    let doctorId = doctor?.ID;

    const res = await dispatch(fetchDoctorById(doctorId)).unwrap();

    setSelectedDoctor(res);
    setOpenDoctorModal(true);
  };
  const handleCloseUpdate = () => {
    setSelectedDoctor(null);
    setOpenDoctorModal(false);
  };
  const handleDoctorDelete = (doctorId: any) => {
    try {
      const res = dispatch(deleteDoctor(doctorId)).unwrap();
      setSelectedDoctor(null);
      toast.success("Doctor deleted successfully");
      setIsDeleteModalOpen(false);
      // dispatch(getAllDoctors({ name: "", filter: "" }));
    } catch (error) {
      toast.error("Failed to delete the doctor");
    }
    setIsDeleteModalOpen(false);
  };

  const handleNewDoctor = () => {
    setOpenDoctorModal(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Add Doctor",
      variant: "contained",
      onClick: handleNewDoctor, // Open the Add Doctor modal
      size: "sm",
      textColored: true,
      sx: {
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        boxShadow: "none",
        "&:hover": {
          color: "white !important",
        },
      },
    },
  ];

  return (
    <>
      <GenericTable<Doctor>
        data={transformedDoctorsData}
        columns={columns}
        title="Doctors List"
        loading={loading}
        buttons={buttons}
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
        open={openDoctorModal}
        title={selectedDoctor ? "Update Doctor" : "Add Doctor"}
        handleClose={handleCloseUpdate}
        modalWidth="70%"
      >
        <AddDoctorForm
          doctorData={selectedDoctor}
          handleClose={handleCloseUpdate}
        />
      </CustomModal>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Doctor"
        description="Are you sure you want to delete this Doctor?"
        cancel={() => {
          setSelectedDoctor(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleDoctorDelete(selectedDoctor.ID)}
      />
    </>
  );
};

export default DoctorsTable;
