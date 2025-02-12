import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import DeleteIcon from "@mui/icons-material/Delete";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { formatDate, formatTime } from "@/utils/utils";
import AddDiscount from "./AddDiscount";
interface discountProps {
  discountsData: any[];
  loading: boolean;
}
const DiscountsTable: React.FC<discountProps> = ({
  discountsData,
  loading,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [schedulefilter, setSchedulefilter] = useState<string>("weekly");
  const [searchInput, setSearchInput] = useState<string>("");

  const transformedData = discountsData
    ? discountsData.map((data: any, index: any) => ({
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
                console.log("Selected :", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ID", accessor: "ID" },
    { label: "Promo Code", accessor: "promoCode" },
    { label: "Percentage", accessor: "percentage" },
    { label: "CREATION DATE", accessor: "date" },
    { label: "IS ACTIVE", accessor: "isActive" },

    // {
    //   label: "NUMBER OF SLOTS",
    //   accessor: "number_of_slots",
    //   render: (value: string, row: Doctor) => {
    //     return (
    //       <Box
    //         display="flex"
    //         justifyContent="space-between"
    //         alignItems="center"
    //         width="100%"
    //       >
    //         <span>{value}</span>
    //         <DropDownForActions
    //           items={[
    //             // {
    //             //   icon: (
    //             //     <DriveFileRenameOutlineIcon
    //             //       fontSize="inherit"
    //             //       color="primary"
    //             //       sx={{ fontSize: "12px" }}
    //             //     />
    //             //   ),
    //             //   label: "Update",
    //             //   onClick: () => handleOpenUpdate(row),
    //             // },
    //             {
    //               icon: (
    //                 <DeleteIcon
    //                   fontSize="inherit"
    //                   color="error"
    //                   sx={{ fontSize: "12px", padding: "0px" }}
    //                 />
    //               ),
    //               label: "Delete",
    //               onClick: () => {
    //                 setSelectedSchedule(row);
    //                 setIsDeleteModalOpen(true);
    //               },
    //             },
    //           ]}
    //         />
    //       </Box>
    //     );
    //   },
    // },
  ];
  //   const onSearchSchedule = (searchTerm: string) => {
  //     dispatch(
  //       getSchedule({ search: searchTerm, filter: schedulefilter })
  //     ).unwrap();
  //   };

  //   const searchFunc = useCallback(_debounce(onSearchSchedule, 500), [
  //     schedulefilter,
  //   ]);

  //   const handleSearchChange = (value: string) => {
  //     setSearchInput(value);
  //     searchFunc(value);
  //   };

  const handleSelectChange = (value: string) => {
    setSchedulefilter(value);
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

  //   const handleOpenUpdate = async (row: any) => {
  //     // dispatch(schedule())
  //     const { ID, doctorId, weekday } = row; // Extract necessary data from the row

  //     const res = await dispatch(
  //       fetchScheduleById({ id: ID, doctorId, weekday })
  //     ).unwrap();

  //     setSelectedSchedule(res);
  //     setOpenScheduleModal(true);
  //   };
  //   const handleCloseUpdate = () => {
  //     setSelectedSchedule(null);
  //     setOpenScheduleModal(false);
  //   };
  //   const handleScheduleDelete = (Id: any) => {
  //     try {
  //       const res = dispatch(deleteSchedule(Id)).unwrap();
  //       setSelectedSchedule(null);
  //       toast.success("Schedule deleted successfully");
  //       setIsDeleteModalOpen(false);
  //       // dispatch(getAllDoctors({ search: "", filter: "" }));
  //     } catch (error) {
  //       toast.error("Failed to delete the Schedule");
  //     }
  //     setIsDeleteModalOpen(false);
  //   };

  const handleNewDiscount = () => {
    setOpenCreateModal(true);
  };
  const handleCloseModal = () => {
    setOpenCreateModal(false);
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
        width: "auto",
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
        title={selectedSchedule ? "Update Discount" : "Create Discount"}
        handleClose={handleCloseModal}
        modalWidth="70%"
      >
        <AddDiscount />
      </CustomModal>
      {/*  <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Doctor"
        description="Are you sure you want to delete this Doctor?"
        cancel={() => {
          setSelectedSchedule(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleScheduleDelete(selectedSchedule.ID)}
      /> */}
    </>
  );
};
export default DiscountsTable;
