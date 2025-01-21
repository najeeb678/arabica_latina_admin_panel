import React from "react";
// import GenericTable from "./GenericTable";
// import GenericTable from "@/components/common/GenericTable";  

import { ButtonConfig, Column } from "@/types/types";
import CheckIcon from "@mui/icons-material/Check";
import GenericTable from "@/_components/common/GenericTable";

// Sample Data
const tableData = [
  { srNo: "01", offer: "Crown", silver: true, gold: true, platinum: true },
  { srNo: "02", offer: "Tooth Decay", silver: true, gold: true, platinum: true },
  { srNo: "03", offer: "Braces", silver: true, gold: false, platinum: true },
  { srNo: "04", offer: "Flossing", silver: false, gold: true, platinum: false },
];

// Columns Definition
const tableColumns: Column<typeof tableData[0]>[] = [
  {
    label: "SR.NO",
    accessor: "srNo",
    render: (value) => value,
  },
  {
    label: "Offers",
    accessor: "offer",
  },
  {
    label: "Silver",
    accessor: "silver",
    render: (value) => value && <CheckIcon />,
  },
  {
    label: "Gold",
    accessor: "gold",
    render: (value) => value && <CheckIcon />,
  },
  {
    label: "Platinum",
    accessor: "platinum",
    render: (value) => value && <CheckIcon />,
  },
];

// Buttons Configuration
const buttons: ButtonConfig[] = [
  {
    label: "Add New Offer",
    onClick: () => alert("Add New Offer Clicked"),
    variant: "contained",
  },
];

const ManageLoyaltyOffers = () => {
  return (
    <GenericTable
      data={tableData}
      columns={tableColumns}
      title="Manage Loyalty Point Offers"
      buttons={buttons}
      loading={false} // Set to true if data is being loaded
      showPagination={true}
    />
  );
};

export default ManageLoyaltyOffers;
