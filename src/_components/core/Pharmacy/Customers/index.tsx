"use client";
import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import CustomCheckbox from "@/_components/common/CustomCheckBox";

import { Column } from "@/types/types";

import { Box } from "@mui/material";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchCustomerShipmentData } from "@/redux/slices/PharmacySlice";
import GenericTable from "@/_components/common/GenericTable";

const CustomersTable = ({ customersData = [], loading = false }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredName, setFilteredName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCustomerShipmentData({ search: searchInput }));
    };
    if (searchInput) {
      fetchData();
    }
  }, [searchInput, dispatch]);

  const transformedCustomersData = Array.isArray(customersData)
    ? customersData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        id: data?.id,
        name: data?.customer_id?.name,
        address: data?.address?.address,
        email: data?.customer_id?.email,
        contact: data?.customer_id?.contactNumber,
        payment: data?.paymentMethod,
        status: data?.status,
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
                // console.log("Selected Doctor:", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ORDER ID", accessor: "id" },
    { label: "BUYER NAME", accessor: "name" },
    { label: "ADDRESS", accessor: "address" },
    { label: "EMAIL", accessor: "email" },
    { label: "CONTACT NUMBER", accessor: "contact" }, // Access the mobile field instead of ContactNumber
    { label: "PAYMENT METHOD", accessor: "payment" },
    { label: "STATUS", accessor: "status" },
  ];
  const onSearchProducts = (searchTerm: string) => {
    setSearchInput(searchTerm);
  };

  const searchFunc = useCallback(_debounce(onSearchProducts, 500), []);

  const handleSearchChange = (value: string) => {
    searchFunc(value);
  };

  return (
    <>
      <GenericTable<any>
        data={transformedCustomersData || []}
        columns={columns}
        title="Buyer Details"
        loading={loading}
        handleSearchChange={handleSearchChange}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
      />
    </>
  );
};

export default CustomersTable;
