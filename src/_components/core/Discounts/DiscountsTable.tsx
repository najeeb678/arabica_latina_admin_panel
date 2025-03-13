import React, { useState } from "react";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import { toast } from "react-toastify";
import { ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { formatDate } from "@/utils/utils";
import AddDiscount from "./AddDiscount";
import { deleteDiscount } from "@/redux/slices/discountSlice";

interface discountProps {
  discountsData: any[];
  loading: boolean;
}
const DiscountsTable: React.FC<discountProps> = ({
  discountsData,
  loading,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);

  const transformedData = discountsData
    ? discountsData
        .filter((data: any) => !data.is_Deleted) // Exclude deleted items
        .map((data: any, index: number) => ({
          Sr_No: index + 1,
          ID: data?.discountId,
          promoCode: data?.promoCode,
          percentage: `${data?.percentage} %`,
          date: formatDate(data?.createdAt),
          isActive: data?.is_Active,
        }))
    : [];

  const columns: Column<any>[] = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (_: string, row: any) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={"5px"}
        >
          <CustomCheckbox isDisabled />
          <span>{row.Sr_No}</span>
        </Box>
      ),
    },
    { label: "ID", accessor: "ID" },
    { label: "Promo Code", accessor: "promoCode" },
    { label: "Percentage", accessor: "percentage" },
    { label: "CREATION DATE", accessor: "date" },
    { label: "IS ACTIVE", accessor: "isActive" },

    {
      label: "Actions",
      accessor: "actions",
      render: (_: any, row: any) => (
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
              onClick: () => handleOpenDelete(row),
            },
          ]}
        />
      ),
    },
  ];

  const handleOpenUpdate = (row: any) => {
    setSelectedDiscount({
      id: row.ID,
      percentage: row.percentage.replace(" %", ""),
    });
    setOpenCreateModal(true);
  };

  const handleOpenDelete = (row: any) => {
    setSelectedDiscount(row);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDiscount = async () => {
    if (!selectedDiscount) return;
    try {
      await dispatch(deleteDiscount(selectedDiscount.ID)).unwrap();
      toast.success("Discount deleted successfully!");
    } catch {
      toast.error("Failed to delete discount.");
    }
    setIsDeleteModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleNewDiscount = () => {
    setSelectedDiscount(null);
    setOpenCreateModal(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Create a Discount",
      variant: "contained",
      onClick: handleNewDiscount,
       size: "md",
      textColored: true,
      sx: {
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        width: "150px !important",
        fontSize: "14px",
        fontWeight: "bold !important",
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
        data={transformedData}
        columns={columns}
        title="Discounts"
        loading={loading}
        buttons={buttons}
        // handleSearchChange={handleSearchChange}
        // filters={filters}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
      />

      <CustomModal
        open={openCreateModal}
        title={selectedDiscount ? "Update Discount " : "Add Discount"}
        handleClose={() => setOpenCreateModal(false)}
        modalWidth="40%"
      >
        <AddDiscount
          handleClose={() => setOpenCreateModal(false)}
          initialData={selectedDiscount}
        />
      </CustomModal>

      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Discount"
        description="Are you sure you want to delete this discount?"
        cancel={() => setIsDeleteModalOpen(false)}
        proceed={handleDeleteDiscount}
      />
    </>
  );
};

export default DiscountsTable;
