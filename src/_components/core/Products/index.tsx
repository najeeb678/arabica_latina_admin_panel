import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllProducts } from "@/redux/slices/productsSlice";
import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { ButtonConfig, Column, FilterConfig } from "@/types/types";
import { Box } from "@mui/material";
import { formatDate } from "@/utils/utils";
import AddAppointment from "./AddAppointment";

const AdminProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsData, loadingproductsData } = useSelector(
    (state: any) => state.products
  );

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredName, setFilteredName] = useState<string>("");
  const [appointmentsFilter, setAppointmentsFilter] =
    useState<string>("weekly");
  const [openAppointmentModal, setOpenAppointmentModal] =
    useState<boolean>(false);

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
        Category: product?.category?.name || "N/A",
        Base_Price: product?.basePrice || 0,
        Description: product?.description || "N/A",
        Created_At: formatDate(product?.createdAt) || "N/A",
        Updated_At: formatDate(product?.updatedAt) || "N/A",
        Variants: product?.Variants.map((variant: any) => ({
          Variant_ID: variant?.variantId || "N/A",
          Color: variant?.color || "N/A",
          Size: variant?.size || "N/A",
          Style: variant?.style || "N/A",
          Price: variant?.price || 0,
          In_Stock: variant?.isInStock ? "Yes" : "No",
        })),
      }))
    : [];

  const columns: Column<any>[] = [
    { label: "Sr_No", accessor: "Sr_No" },
    { label: "Product ID", accessor: "Product_ID" },
    { label: "Name", accessor: "Name" },
    { label: "Category", accessor: "Category" },
    { label: "Base Price", accessor: "Base_Price" },
    { label: "Description", accessor: "Description" },
    { label: "Created At", accessor: "Created_At" },
    { label: "Updated At", accessor: "Updated_At" },
  ];

  const onSearchAppointment = (searchTerm: string) => {
    dispatch(getAllProducts({ search: searchTerm, filter: appointmentsFilter }))
      .unwrap()
      .then(() => console.log("Search complete"))
      .catch((err) => console.error("Search Error", err));
  };

  const searchFunc = useCallback(_debounce(onSearchAppointment, 500), [
    appointmentsFilter,
  ]);

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

  const buttons: ButtonConfig[] = [
    {
      label: "Add Product",
      variant: "contained",
      onClick: () => setOpenAppointmentModal(true),
      size: "sm",
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
          borderRadius: "50px",
        }}
      />

      {/* <CustomModal
        open={openAppointmentModal}
        title={selectedAppointments ? "Update Appointment" : "Add Product"}
        handleClose={handleCloseUpdate}
        modalWidth="70%"
      > */}
      {/* <AddAppointment handleClose={() => setOpenAppointmentModal(false)} />
      </CustomModal> */}
    </>
  );
};

export default AdminProductsTable;
