import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ButtonConfig, Column } from "@/types/types";
import Button from "@mui/material";
import { Box } from "@mui/material";
import GenericTable from "@/_components/common/GenericTable";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { RootState } from "@/redux/store";
import { getLoyaltyPackages } from "@/redux/slices/loyaltyPointSlice";

const tableColumns: Column<any>[] = [
  {
    label: "SR.NO",
    accessor: "srNo",
    render: (value) => value,
  },
  { label: "Offers", accessor: "offer" },
  {
    label: "Silver",
    accessor: "silver",
    render: (value: boolean) =>
      value && (
        <CheckIcon
          style={{ color: "rgba(123, 123, 123, 1)", width: "220px" }}
        />
      ),
  },
  {
    label: "Gold",
    accessor: "gold",
    render: (value: boolean) =>
      value && (
        <CheckIcon
          style={{ color: "rgba(123, 123, 123, 1)", width: "220px" }}
        />
      ),
  },
  {
    label: "PLATINUM",
    accessor: "platinum",
    render: (value: boolean) =>
      value && (
        <CheckIcon
          style={{ color: "rgba(123, 123, 123, 1)", width: "220px" }}
        />
      ),
  },
];
const ManageLoyaltyOffers = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { loyaltyPackages } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getLoyaltyPackages())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);



  // Step 1: Group subservices by their name
  const groupedData = loyaltyPackages
    ? loyaltyPackages.flatMap((packageData) =>
        packageData.SubServices.map((subService: any) => ({
          ...subService,
          loyaltyType: packageData.loyaltyType, // Add loyaltyType to each subService
        }))
      )
    : [];

  // Step 2: Group by subService name and track which loyalty types are associated
  const uniqueServices = groupedData.reduce((acc, subService) => {
    const { name, loyaltyType } = subService;
    if (!acc[name]) {
      acc[name] = { name, loyaltyTypes: [] };
    }
    if (!acc[name].loyaltyTypes.includes(loyaltyType)) {
      acc[name].loyaltyTypes.push(loyaltyType);
    }
    return acc;
  }, {});

  // Step 3: Map unique services to table rows
  const tableData = Object.values(uniqueServices).map(
    (service: any, index) => ({
      srNo: index + 1, // Sequential SR.NO
      offer: service.name,
      silver: service.loyaltyTypes.includes("Silver"),
      gold: service.loyaltyTypes.includes("Gold"),
      platinum: service.loyaltyTypes.includes("Platinum"),
    })
  );

  return (
    <GenericTable
      title="Manage Loyalty Point Offers"
      sx={{
        fontSize: "10px",
        fontWeight: 400,
        lineHeight: "19.2px",
        textAlign: "center",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
        color: "rgba(123, 123, 123, 1)",
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
      data={tableData}
      columns={tableColumns}
      loading={loading}
      showPagination={false}
    />
  );
};

export default ManageLoyaltyOffers;
