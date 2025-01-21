import CustomCheckbox from "@/_components/common/CustomCheckBox";
import GenericTable from "@/_components/common/GenericTable";
import StatusDropdown from "@/_components/common/SelectDropdown/StatusDropdown";
import {
  changeUserRedeemedPackageStatus,
  getLoyaltyPackages,
  getRedeemPackages,
} from "@/redux/slices/loyaltyPointSlice";
import { RootState } from "@/redux/store";
import { Column } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const RedeemPackages = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { userRedeemPackages } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  const statusDropdownoptions = [
    { value: true, label: "Redeemed", color: "#28A745" }, // Green for success
    { value: false, label: "Not Redeemed", color: "#DC3545" }, // Red for not redeemed
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(getRedeemPackages())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleStatusChange = async (id: string, val: string) => {
    setLoading(true);

    dispatch(
      changeUserRedeemedPackageStatus({
        userRedeemedPackageId: id,
        status: val,
      })
    )
      .unwrap()
      .finally(() => {
        dispatch(getRedeemPackages())
          .unwrap()
          .then(() => {
            setLoading(false);
          });
      });
  };

  const transformedAppointmentsData = userRedeemPackages
    ? userRedeemPackages.map((data, index) => ({
        Sr_No: index + 1,
        ID: data?.id,
        Patient: data?.patient?.name || "N/A",
        loyalty: data?.loyaltyType || "N/A",
        isRedeemed: data?.isRedeemed,
        status: data?.isRedeemed,
        Date: new Date(data?.createdAt).toLocaleDateString() || "N/A",
      }))
    : [];

  const columns: Column<any>[] = [
    {
      label: "SR. No",
      accessor: "Sr_No",
      render: (value: string, row: any) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={"5px"}
        >
          <CustomCheckbox
            isDisabled={true}
            onChange={() => {
              console.log("row1:", row.Patient);
            }}
          />
          <span>{row.Sr_No}</span>
        </Box>
      ),
    },

    { label: "Patient", accessor: "Patient" },
    { label: "Loyalty", accessor: "loyalty" },

    { label: "Date", accessor: "Date" },

    { label: "IsRedeemed", accessor: "isRedeemed" },
    {
      label: "Status",
      accessor: "status",
      render: (value: string, row: any) => (
        <StatusDropdown
          options={statusDropdownoptions}
          selectedValue={row.status}
          onChange={(val) => handleStatusChange(row.ID, val)}
          sx={{ width: "160px", backgroundColor: "#f5f5f5", height: "20px" }}
        />
      ),
    },
  ];

  return (
    <>
      <GenericTable<any>
        data={transformedAppointmentsData}
        columns={columns}
        title="User Redeemed Package"
        loading={loading}
        sx={{
          height: "292px",
          overflowY: "hidden",
          marginBottom: "0px",
        }}
        customTableStyles={{
          overflowY: "hidden",
        }}
        titleStyles={{
          fontFamily: "var(--font-avenir-medium)",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "19.2px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      />
    </>
  );
};

export default RedeemPackages;
