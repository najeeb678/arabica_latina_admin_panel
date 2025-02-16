import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import {
  fetchOrdersAsync,
  updateOrderStatusAsync,
} from "../../../redux/slices/OrdersSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import { Orders as OrdersType } from "@/types/types";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";

const OrdersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, status, error } = useSelector(
    (state: RootState) => state.orders
  );

  const [processedOrders, setProcessedOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddOrderFormOpen, setIsAddOrderFormOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  // Update processedOrders when the orders in Redux store change
  useEffect(() => {
    if (orders) {
      const updatedOrders = orders.map((order: any, index: number) => {
        const productNames = order.orderItems
          ? order.orderItems
              .map((item: any) => item.variant?.product?.name)
              .join(", ")
          : "";
        return {
          ...order,
          Sr_No: index + 1,
          productNames,
        };
      });

      setProcessedOrders(updatedOrders);
    }
  }, [orders]);

  const handleDeleteOrder = () => {
    console.log("Selected order ID");
  };

  const handleStatusChange = (newStatus: string, orderId: string) => {
    dispatch(updateOrderStatusAsync({ orderId, status: newStatus }));
  };

  const columns = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: number, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="5px"
          >
            <CustomCheckbox
              isDisabled
              onChange={(e) =>
                console.log(`Checkbox for ${value}:`, e.target.checked)
              }
            />
            <span>{value}</span>
          </Box>
        );
      },
    },
    {
      label: "Product Name",
      accessor: "productNames",
      render: (value: string) => <span>{value}</span>,
    },
    {
      label: "Address",
      accessor: "address",
      render: (value: any) => {
        return (
          <span>{`${value?.address}, ${value?.city}, ${value?.area}`}</span>
        );
      },
    },
    {
      label: "Contact Number",
      accessor: "contactNumber",
      render: (value: string) => {
        return <span>{value}</span>;
      },
    },
    {
      label: "Quantity",
      accessor: "quantity",
      render: (value: number) => {
        return <span>{value}</span>;
      },
    },
    {
      label: "Total",
      accessor: "total",
      render: (value: number) => <span>${value}</span>,
    },
    {
      label: "Payment Method",
      accessor: "paymentMethod",
      render: (value: string) => {
        return <span>{value}</span>;
      },
    },
    {
      label: "Status",
      accessor: "status",
      render: (value: string, row: any) => {
        const options = [
          { value: "PENDING", label: "Pending", color: "#FBC02D" },
          { value: "CONFIRMED", label: "Confirmed", color: "#4CAF50" },
          { value: "DISPATCHED", label: "Dispatched", color: "#2196F3" },
          { value: "DELIVERED", label: "Delivered", color: "#00897B" },
          { value: "CANCELLED", label: "Cancelled", color: "#E64A19" },
        ];

        return (
          <StatusDropdown
            options={options}
            selectedValue={value}
            onChange={(newStatus: string) =>
              handleStatusChange(newStatus, row.orderId)
            }
            sx={{ width: "100%" }}
          />
        );
      },
    },
  ];

  return (
    <>
      <GenericTable
        data={processedOrders || []}
        columns={columns}
        title="Orders"
        loading={status === "loading"}
        showPagination={true}
      />

      {/* Modal for confirming order deletion */}
      <TransitionsDialog
        heading="Confirm Delete"
        description="Are you sure you want to delete this order?"
        open={isDeleteModalOpen}
        cancel={() => setIsDeleteModalOpen(false)}
        proceed={handleDeleteOrder}
      />
    </>
  );
};

export default OrdersList;
