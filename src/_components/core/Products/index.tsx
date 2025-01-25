import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { getAllProducts } from "@/redux/slices/productsSlice";

import { formatDate, formatTime } from "@/utils/utils";
import { CgLayoutGrid } from "react-icons/cg";
import { useSelector } from "react-redux";
import AddAppointment from "./AddAppointment";

const AdminProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { productsData, loadingproductsData } = useSelector(
    (state: any) => state.products
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [openAppointmentModal, setOpenAppointmentModal] =
    useState<boolean>(false);
  const [selectedAppointments, setSelectedAppointments] = useState<any | null>(
    null
  );
  const [appointmentsFilter, setAppointmentsFilter] =
    useState<string>("weekly");
  const [filteredName, setFilteredName] = useState<string>("");

  useEffect(() => {
    dispatch(
      getAllProducts({ search: filteredName, filter: appointmentsFilter })
    )
      .unwrap()
      .then((res) => {
        console.log("Fetched Products Data:", res);
      })
      .catch((err) => {
        console.error("Error Fetching Products Data:", err);
      });
  }, [filteredName, appointmentsFilter, dispatch]);

  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);
  const transformedProductsData = productsData
    ? productsData.map((product: any, index: number) => ({
        Sr_No: index + 1,
        Product_ID: product?.productId || "N/A",
        Name: product?.name || "N/A",
        Description: product?.description || "N/A",
        Category: product?.category?.name || "N/A",
        Base_Price: product?.basePrice || 0,
        Composition: product?.composition || "N/A",
        Limited_Edition: product?.limitedAddition ? "Yes" : "No",
        Weight: product?.weight || "N/A",
        Colors_Available: product?.colorsAvailable.join(", ") || "N/A",
        Total_Colors: product?.totalColors || 0,
        Created_At: formatDate(product?.createdAt) || "N/A",
        Updated_At: formatDate(product?.updatedAt) || "N/A",
        Variants: product?.Variants.map((variant: any) => ({
          Variant_ID: variant?.variantId || "N/A",
          Color: variant?.color || "N/A",
          Size: variant?.size || "N/A",
          Style: variant?.style || "N/A",
          Price: variant?.price || 0,
          In_Stock: variant?.isInStock ? "Yes" : "No",
          Attachment: variant?.attachment || "N/A",
        })),
      }))
    : [];
  console.log("productsData", productsData);
  console.log("transformedProductsData", transformedProductsData);
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

    { label: "Product ID", accessor: "Product_ID" },
    { label: "Name", accessor: "Name" },
    { label: "Description", accessor: "Description" },
    { label: "Category", accessor: "Category" },
    { label: "Base Price", accessor: "Base_Price" },
    { label: "Composition", accessor: "Composition" },
    { label: "Limited Edition", accessor: "Limited_Edition" },
    { label: "Weight", accessor: "Weight" },
    { label: "Colors Available", accessor: "Colors_Available" },
    { label: "Total Colors", accessor: "Total_Colors" },
    { label: "Created At", accessor: "Created_At" },
    { label: "Updated At", accessor: "Updated_At" },
  ];
  const onSearchAppointment = (searchTerm: string) => {
    dispatch(
      getAllProducts({ search: searchTerm, filter: appointmentsFilter })
    ).unwrap();
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

  const handleNewAppointment = () => {
    setOpenAppointmentModal(true);
  };
  const buttons: ButtonConfig[] = [
    {
      label: "Add Product",
      variant: "contained",
      onClick: handleNewAppointment,
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
      <GenericTable
        data={transformedProductsData}
        columns={columns}
        title="Products"
        loading={loadingproductsData}
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
        open={openAppointmentModal}
        title={selectedAppointments ? "Update Appointment" : "Add Product"}
        handleClose={handleCloseUpdate}
        modalWidth="70%"
      >
        <AddAppointment
          handleClose={() => {
            setOpenAppointmentModal(false);
          }}
        />
      </CustomModal>
      {/* <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Appointment"
        description="Are you sure you want to delete this Appointment?"
        cancel={() => {
          setSelectedAppointments(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleAppointmentDelete(selectedAppointments.ID)}
      /> */}
    </>
  );
};

export default AdminProductsTable;
