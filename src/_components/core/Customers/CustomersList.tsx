import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import { fetchCustomers } from "../../../redux/slices/CustomersSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import { Customers as CustomersType } from "@/types/types";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

const CustomersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Adjusted for correct state mapping
  const { customers, status, error } = useSelector((state: RootState) => state.customers);

  const [processedCustomers, setProcessedCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomersType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCustomers()); // Fetch customers on component mount
  }, [dispatch]);

  useEffect(() => {
    if (customers) {
      // Add a serial number to each customer for display in the table
      const updatedCustomers = customers.map((customer: CustomersType, index: number) => ({
        ...customer,
        Sr_No: index + 1,
      }));


      setProcessedCustomers(updatedCustomers);
    }
  }, [customers]);

  const handleDeleteCustomer = () => {
    console.log("Selected customer ID:", selectedCustomer?.userId);
    // Add logic to handle customer deletion
  };

  const columns = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: number) => (
        <Box display="flex" alignItems="center" justifyContent="center" gap="5px">
          <CustomCheckbox
            isDisabled
            onChange={(e) => console.log(`Checkbox for ${value}:`, e.target.checked)}
          />
          <span>{value}</span>
        </Box>
      ),
    },
    {
      label: "Name",
      accessor: "name",
      render: (value: string) => <span>{value}</span>,
    },
    {
      label: "Email",
      accessor: "email",
      render: (value: string) => <span>{value}</span>,
    },
    {
      label: "Contact Number",
      accessor: "contactNumber",
      render: (value: string | null) => <span>{value || "N/A"}</span>,
    },
 
    {
      label: "Subscription",
      accessor: "subscription",
      render: (value: boolean) => <span>{value ? "Subscribed" : "Not Subscribed"}</span>,
    },
    {
      label: "Email Verified",
      accessor: "is_emailVerified",
      render: (value: boolean) => <span>{value ? "Yes" : "No"}</span>,
    },
  ];

  return (
    <>
      <GenericTable
        data={processedCustomers || []}
        columns={columns}
        title="Customers"
        loading={status === "loading"}
        showPagination={true}
      />

      {/* Modal for confirming customer deletion */}
      <TransitionsDialog
        heading="Confirm Delete"
        description="Are you sure you want to delete this customer?"
        open={isDeleteModalOpen}
        cancel={() => setIsDeleteModalOpen(false)}
        proceed={handleDeleteCustomer}
      />
    </>
  );
};

export default CustomersList;
