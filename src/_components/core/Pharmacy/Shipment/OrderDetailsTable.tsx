"use client";
import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { format } from "date-fns";
import { Column } from "@/types/types";

import { Box } from "@mui/material";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  fetchCustomerShipmentData,
  updateOrderStatus,
} from "@/redux/slices/PharmacySlice";
import GenericTable from "@/_components/common/GenericTable";
import { formatDate } from "@/utils/utils";
import Link from "next/link";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import { toast } from "react-toastify";

const OrderDetailsTable = ({ ordersData = [], loading = false }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredName, setFilteredName] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      await dispatch(fetchCustomerShipmentData({ search: searchInput }));
    };
    if (searchInput) {
      fetchData();
    }
  }, [searchInput, dispatch]);
  console.log("ordersData", ordersData);
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "MM/dd/yyyy hh:mm a");
  };
  const transformedCustomersData = Array.isArray(ordersData)
    ? ordersData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        orderId: data?.unique_code,
        orderDetails:
          data?.orderItems.map((item: any) => item?.items?.name) || "N/A",
        // orderDetails: data?.orderItems.map((item: any) =>
        //   item?.items?.name ? item.items.name.slice(0, 15) : "N/A"
        // ) || "N/A",
        quantity: data?.quantity || "N/A",
        price: data?.totalPrice,
        createdAt: formatDateTime(data?.created_at),
        details: data,
        deliveryDate: formatDate(data?.deliveryDate),
        status: data?.status,
        payment: data?.paymentMethod,
      }))
    : [];
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();

      if (response) {
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const statusDropdownoptions = [
    { value: "PENDING", label: "Pending", color: "#FFA500" },
    { value: "CONFIRMED", label: "Confirmed", color: "#28A745" },
    { value: "DISPATCHED", label: "Dispatched", color: "#007BFF" },
    { value: "DELIVERED", label: "Delivered", color: "#DC3545" },
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
            <CustomCheckbox isDisabled onChange={() => {}} />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "ORDER ID", accessor: "orderId" },
    { label: "ORDER DETAILS", accessor: "orderDetails" },
    { label: "QUANTITY", accessor: "quantity" },
    { label: "PRICE", accessor: "price" },
    { label: "CREATED AT ", accessor: "createdAt" },
    // { label: "DELIVERY DATE ", accessor: "deliveryDate" },
    { label: "PAYMENT METHOD", accessor: "payment" },
    {
      label: "DETAILS ",
      accessor: "",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={"5px"}
          >
            <Link
              href={`/pharmacy/order-details/${row?.details?.id}`}
              style={{ fontFamily: "var(--font-avenirLight)" }}
            >
              View
            </Link>
          </Box>
        );
      },
    },
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
              onChange={(val) => handleStatusChange(row?.details?.id, val)}
              sx={{
                width: "160px",
                backgroundColor: "#f5f5f5",
                height: "25px",
              }}
            />
          </Box>
        );
      },
    },
  ];
  const onSearchProducts = (searchTerm: string) => {
    setSearchInput(searchTerm);
  };

  const searchFunc = useCallback(_debounce(onSearchProducts, 500), []);

  const handleSearchChange = (value: string) => {
    searchFunc(value);
  };
  if (!isClient) return null;
  return (
    <>
      <GenericTable<any>
        data={transformedCustomersData || []}
        columns={columns}
        title="Shipment Details"
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

export default OrderDetailsTable;
