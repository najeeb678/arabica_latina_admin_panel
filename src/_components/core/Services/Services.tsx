import React, { useState, useEffect } from "react";
import GenericTable from "@/_components/common/GenericTable";
import { Box } from "@mui/material";
import { ButtonConfig, Column } from "@/types/types";
import { servicesData } from "@/utils/ServicesConstants";
import Link from "next/link";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import {
  deleteServices,
  getAllServices,
  updateStatusOfService,
} from "@/redux/slices/ServicesSlice";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import AddService from "./AddService";

const ServicesTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [services, setServices] = useState(servicesData);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { allServicesData } = useAppSelector(
    (state: RootState) => state.service
  );

  const data = Array.isArray(allServicesData)
    ? allServicesData.map((service: any, index: number) => {
        return {
          Sr_No: index + 1,
          ID: service?.id,
          SERVICE: service?.name,
          NoOfSubServices: service?.subServiceCount,
          ViewSubServices: "View",
          IMAGE: service?.picture,
          STATUS: service?.is_Active,
          DESCRIPTION: service?.description,
        };
      })
    : [];

  useEffect(() => {
    setLoading(true);
    dispatch(getAllServices({ search: "", filter: "" }))
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleNewService = (): any => {
    setOpenCreateModal(true);
  };

  useEffect(() => {
    const updatedServices = services.map((service) => ({
      ...service,
      STATUS: service.STATUS || "inactive",
    }));
    setServices(updatedServices);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (id: any, newStatus: string) => {
    const data = {
      id: id,
      status: newStatus,
    };
    dispatch(updateStatusOfService(data));
    setServices((prevServices) =>
      prevServices.map((service: any) =>
        service.id === id ? { ...service, STATUS: newStatus } : service
      )
    );
  };

  const handleCheckboxChange = (srNo: number) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(srNo)
        ? prevSelected.filter((id) => id !== srNo)
        : [...prevSelected, srNo]
    );
  };

  const handleOpenUpdate = async (service: any) => {
    setSelectedService(service);
    setOpenCreateModal(true);
  };

  const handleOpenDeleteModal = (service: any) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = () => {
    if (selectedService) {
      dispatch(deleteServices(selectedService));
      setIsDeleteModalOpen(false);
    }
  };

  const columns: Column<(typeof servicesData)[0]>[] = [
    {
      label: "SR. NO",
      accessor: "Sr_No",
      render: (_, row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CustomCheckbox
            checked={selectedServices.includes(row.Sr_No)}
            onChange={() => handleCheckboxChange(row.Sr_No)}
          />
          <span style={{ marginLeft: "8px" }}>{row.Sr_No}</span>
        </div>
      ),
    },
    { label: "SERVICE", accessor: "SERVICE" },
    { label: "NO OF SUB SERVICES", accessor: "NoOfSubServices" },
    {
      label: "VIEW SUB-SERVICES",
      accessor: "ViewSubServices",
      render: (_, row) => (
        <Link
          href={`/services/sub-service/${row.ID}`}
          style={{
            color: "#007BFF",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          View
        </Link>
      ),
    },
    {
      label: "Image",
      accessor: "IMAGE",
      render: (value: string) => (
        <img
          src={value}
          alt="Service"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      label: "Status",
      accessor: "STATUS",
      render: (value: string, row: (typeof servicesData)[0]) => {
        const selectedStatus = row.STATUS;
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <StatusDropdown
              key={row.Sr_No}
              options={[
                { value: true, label: "Active", color: "green" },
                { value: false, label: "Inactive", color: "red" },
              ]}
              selectedValue={selectedStatus}
              onChange={(val) => handleStatusChange(row.ID, val)}
              sx={{
                width: "160px",
                backgroundColor: "#f5f5f5",
                height: "30px",
              }}
            />
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
                  onClick: () => handleOpenDeleteModal(row),
                },
              ]}
            />
          </Box>
        );
      },
    },
  ];

  const buttons: ButtonConfig[] = [
    {
      label: "Add a new Service",
      onClick: handleNewService,
      sx: {
        width: "135px !important",
        height: "29px !important",
        background: "#FBC02D !important",
        borderRadius: "50px !important",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: "16.39px",
        whiteSpace: "nowrap",
        boxShadow: "none",
        "&:hover": {
          color: "white !important",
        },
      },
    },
  ];

  return (
    <>
      <GenericTable<(typeof servicesData)[0]>
        data={data}
        columns={columns}
        loading={loading}
        title="Services"
        buttons={buttons}
      />
      <CustomModal
        open={openCreateModal}
        title={"Add Service"}
        handleClose={() => setOpenCreateModal(false)}
        modalWidth="50%"
      >
        <AddService
          serviceData={selectedService}
          handleClose={() => setOpenCreateModal(false)}
        />
      </CustomModal>
      <CustomModal
        open={isDeleteModalOpen}
        title="Confirm Delete"
        handleClose={() => setIsDeleteModalOpen(false)}
      >
        <Box display="flex" justifyContent="center" gap="16px" mt={2}>
          <button onClick={handleDeleteService}>Yes</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
        </Box>
      </CustomModal>
    </>
  );
};

export default ServicesTable;
