import React, { useState } from "react";
import { Table, TableRow, TableCell } from "@mui/material";
import StatusDropdown from "../../common/SelectDropdown/StatusDropdown";

const StatusDropdownTester: React.FC = () => {
  const [status, setStatus] = useState<string>("pending");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const statusDropdownoptions = [
    { value: "pending", label: "Pending", color: "red" },
    { value: "inprogress", label: "In Progress", color: "orange" },
    { value: "completed", label: "Completed", color: "green" },
  ];

  return (
    <Table>
      <TableRow>
        <TableCell>Task Name</TableCell>
        <TableCell>
          <StatusDropdown
            options={statusDropdownoptions}
            selectedValue={status}
            onChange={handleStatusChange}
          />
        </TableCell>
      </TableRow>
    </Table>
  );
};

export default StatusDropdownTester;
