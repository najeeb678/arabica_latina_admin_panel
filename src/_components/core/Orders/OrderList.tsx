import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import { fetchOrdersAsync } from "../../../redux/slices/OrdersSlice"; 
import { RootState, AppDispatch } from "../../../redux/store";
import { Orders as OrdersType } from "@/types/types";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";

const OrdersList = () => {
   const dispatch = useDispatch<AppDispatch>();

   // Adjusted for correct state mapping
   const { orders, status, error } = useSelector((state: RootState) => state.orders);

   const [processedOrders, setProcessedOrders] = useState<OrdersType[]>([]);
   const [selectedOrder, setSelectedOrder] = useState<OrdersType | null>(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [isAddOrderFormOpen, setIsAddOrderFormOpen] = useState<boolean>(false);

   useEffect(() => {
      dispatch(fetchOrdersAsync()); // Fetch orders on component mount
   }, [dispatch]);

   useEffect(() => {
      if (orders) {
         // Create a new array with product names added to each order
         const updatedOrders = orders.map((order: any, index: number) => {
            // Concatenate all product names in the order
            const productNames = order.orderItems
               .map((item: any) => item.variant?.product?.name) // Extract product names
               .join(", "); // Join names with a comma (you can customize the separator)
               console.log()
            return {
               ...order,
               Sr_No: index + 1,
               productNames, // Add the concatenated product names to the order
            };
         });
   
         // Log the updated orders to verify
         console.log("updatedOrders: ", updatedOrders);
   
         // Set the processed orders with product names included
         setProcessedOrders(updatedOrders);
      }
   }, [orders]);
   
   


   const handleDeleteOrder = () => {
         console.log("Selected order ID");
      
   };

   const columns = [
      {
         label: "Sr_No",
         accessor: "Sr_No",
         render: (value: number, row: OrdersType) => {
            return (
               <Box display="flex" alignItems="center" justifyContent="center" gap="5px">
                  <CustomCheckbox
                     isDisabled
                     onChange={(e) => console.log(`Checkbox for ${value}:`, e.target.checked)}
                  />
                  <span>{value}</span>
               </Box>
            );
         },
      },
      {
         label: "Product Name",
         accessor: "productNames",  // Access the concatenated product names here
         render: (value: string) => <span>{value}</span>,  // Render the concatenated product names
      },
      {
         label: "Address",
         accessor: "address", // Directly referencing address field
         render: (value: string) => {
            return <span>{value}</span>;
         },
      },
      {
         label: "Contact Number",
         accessor: "contactNumber", // Directly referencing contactNumber field
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
         accessor: "status",  // Access the status field
         render: (value: string, row: OrdersType) => {
            const options = [
               { value: "pending", label: "Pending", color: "#FBC02D" },
               { value: "shipped", label: "Shipped", color: "#4CAF50" },
               { value: "delivered", label: "Delivered", color: "#2196F3" },
               { value: "canceled", label: "Canceled", color: "#F44336" },
            ];
   
            const handleStatusChange = (newStatus: string) => {
               // Logic to handle status change, like updating state or sending a request
               console.log(`Status for order ${row.Sr_No} changed to: ${newStatus}`);
            };
   
            return (
               <StatusDropdown
                  options={options}
                  selectedValue={value}
                  onChange={handleStatusChange}
                  label="Order Status"
                  sx={{ width: "100%",}} 
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
