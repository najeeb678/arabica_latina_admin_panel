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
  deleteSubServices,
  getAllServices,
  getAllsubServices,
  getSubServicesofService,
  updateStatusOfSubService,
} from "@/redux/slices/ServicesSlice";
import { useRouter } from "next/router";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import AddSubService from "./AddSubService";
const SubServicesTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [services, setServices] = useState(servicesData);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sub_serviceId } = router.query;
  const { subServicesOfService } = useAppSelector(
    (state: RootState) => state.service
  );

  const handleNewSubService = (): any => {
    setOpenCreateModal(true);
  };

  useEffect(() => {
    if (sub_serviceId) {
      dispatch(getSubServicesofService({ id: sub_serviceId }));
    }
  }, [dispatch, sub_serviceId]); 

  const data = subServicesOfService
    ? subServicesOfService.map((subService: any, index) => {
        return {
          ID: subService?.id,
          Sr_No: index + 1,
          SERVICE: subService?.name,
          IMAGE: subService?.picture,
          STATUS: subService?.is_Active,
          DESCRIPTION: subService?.description,
        };
      })
    : [];
  useEffect(() => {
    setLoading(true);
    dispatch(getSubServicesofService({ id: sub_serviceId })).unwrap()
    .finally(() => {
      setLoading(false);
    });;
  }, [dispatch]);

  // Set default status to "inactive" if not provided
  useEffect(() => {
    const updatedServices = services.map((service) => ({
      ...service,
      STATUS: service.STATUS || "inactive", // Set default value for STATUS if missing
    }));
    setServices(updatedServices);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSubService = () => {
    if (selectedServices) {
      dispatch(deleteSubServices(selectedServices));
      setIsDeleteModalOpen(false);
    }
  };

  const handleOpenDeleteModal = (service: any) => {
    setSelectedServices(service);
    setIsDeleteModalOpen(true);
  };

  // Handle status change
  const handleStatusChange = (srNo: number, newStatus: string) => {

    const data = {
      id: srNo,
      status: newStatus,
    };
    dispatch(updateStatusOfSubService(data));
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.Sr_No === srNo ? { ...service, STATUS: newStatus } : service
      )
    );
  };

  const handleOpenUpdate = async (service: any) => {
    setSelectedServices(service);
    setOpenCreateModal(true);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (srNo: number) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(srNo)
        ? prevSelected.filter((id) => id !== srNo)
        : [...prevSelected, srNo]
    );
  };

  // Options for the status dropdown
  const statusDropdownoptions = [
    { value: true, label: "Active", color: "green" },
    { value: false, label: "Inactive", color: "red" },
  ];

  // Define columns for the table
  const columns: Column<any>[] = [
    {
      label: "SR. NO",
      accessor: "Sr_No",
      render: (_, row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CustomCheckbox
          // checked={selectedServices?.includes(row.Sr_No)} // Check if the checkbox should be selected
          // onChange={() => handleCheckboxChange(row.Sr_No)} // Handle checkbox toggle
          />
          <span style={{ marginLeft: "8px" }}>{row.Sr_No}</span>{" "}
          {/* Display SR. NO next to the checkbox */}
        </div>
      ),
    },
    { label: "SUB SERVICE", accessor: "SERVICE" },
    { label: "DESCRIPTION", accessor: "DESCRIPTION" },

    {
      label: "Image",
      accessor: "IMAGE",
      render: (value: string) => {
        return (
          <img
            src={value}
            alt="Service"
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
    },
    {
      label: "Status",
      accessor: "STATUS",
      render: (value: string, row: (typeof servicesData)[0]) => {
        // Ensure the default value is 'inactive' if the status is not provided
        const selectedStatus = row.STATUS;

        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {/* Status Dropdown */}
            <StatusDropdown
              key={row.Sr_No} // Force re-render on status change
              options={statusDropdownoptions}
              selectedValue={selectedStatus}
              onChange={(val) => handleStatusChange(row.ID, val)}
              sx={{
                width: "160px",
                backgroundColor: "#f5f5f5",
                height: "30px",
              }}
            />

            {/* Actions Dropdown */}
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
                    handleOpenDeleteModal(row);
                    // setIsDeleteModalOpen(true);
                  },
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
      label: "Add a new Sub Service",
      onClick: handleNewSubService,
      sx: {
        width: "135px !important",
        height: "29px !important",
        background: "#FBC02D !important",
        borderRadius: "50px !important",
        //fontFamily: "Avenir",
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
      <GenericTable<any>
        data={data}
        columns={columns}
        loading={loading}
        title="Sub Services"
        buttons={buttons}
      />
      <CustomModal
        open={openCreateModal}
        title={"Add Sub Service"}
        handleClose={() => setOpenCreateModal(false)}
        modalWidth="50%"
      >
        <AddSubService
          subServiceData={selectedServices}
          handleClose={() => setOpenCreateModal(false)}
        />
      </CustomModal>
      <CustomModal
        open={isDeleteModalOpen}
        title="Confirm Delete"
        handleClose={() => setIsDeleteModalOpen(false)}
      >
        <Box display="flex" justifyContent="center" gap="16px" mt={2}>
          <button onClick={handleDeleteSubService}>Yes</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
        </Box>
      </CustomModal>
    </>
  );
};

export default SubServicesTable;
