// GenericTable.tsx
import React, { useState } from "react";
import CustomPagination from "./CustomPagination";
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Card,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import SearchFilter from "./searchFilter";
import SelectDropdown from "./SelectDropdown/SelectDropdown";
import Button from "./button";
import { ButtonConfig, Column, FilterConfig } from "@/types/types";
import CustomTypography from "./CustomTypography/CustomTypography";
import { wrap } from "module";

// Update the props for GenericTable with a generic type T
interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[]; // Use the Column type here
  title?: string;
  loading?: boolean;
  showPagination?: boolean;
  buttons?: ButtonConfig[];
  filters?: FilterConfig[];
  handleSearchChange?: (value: string) => void;
  searchStyle?: { [key: string]: any };
  customContent?: React.ReactNode;

  sx?: SxProps<Theme>;
  titleStyles?: SxProps<Theme>;
  customTableStyles?: SxProps<Theme>;
}

const GenericTable = <T extends {}>({
  data,
  columns,
  title,
  filters = [],
  loading,
  showPagination = true,
  buttons = [],
  handleSearchChange,
  searchStyle = {},
  customContent,
  customTableStyles,
  titleStyles,
  sx,
}: GenericTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLElement> | null, // Use HTMLElement here
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(
      event,
      Math.max(0, Math.ceil(data.length / rowsPerPage) - 1)
    );
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px 25px 10px 25px",
        marginBottom: "8px",
        overflow: "auto",
        border: "1px solid #CECECE",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          mb: 2,

          //minWidth: 650,
        }}
      >
        <Box sx={{ width: "auto" }}>
          {title && (
            <CustomTypography
              sx={{
                fontSize: "16px",
                fontFamily: "var(--font-raleway)",
                fontWeight: "450",
                lineHeight: "19px",
                whiteSpace: "nowrap",
                marginRight: "25px",
                ...titleStyles,
              }}
            >
              {title}
            </CustomTypography>
          )}
        </Box>
        <Box sx={{ width: "40%" }}>
          {handleSearchChange && (
            <SearchFilter
              placeholder="Search"
              onSearchChange={handleSearchChange}
              sx={searchStyle}
            />
          )}
        </Box>

        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {customContent && (
            <Box
              sx={{
                mr: 2,
                ml: 2,
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              {customContent}
            </Box>
          )}
          {filters.map((filter, index) => (
            <Box
              key={index}
              sx={{
                marginLeft: "5px",
              }}
            >
              <SelectDropdown
                options={filter.options}
                onSelectChange={filter.onChange}
                placeholder={filter.label as string}
                sx={filter.sx ? filter.sx : {}}
              />
            </Box>
          ))}
          {buttons &&
            buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                label={button.label}
                size={button.size}
                isDisabled={button.isDisabled}
                leadingIcon={button.leadingIcon}
                trailingIcon={button.trailingIcon}
                type={button.type}
                loading={button.loading}
                altStyle={button.altStyle}
                textColored={button.textColored}
                onClick={button.onClick}
                sx={button.sx}
              />
            ))}
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          minWidth: 650,
          ...customTableStyles,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "40vh",
              height: "100%",
            }}
          >
            <CircularProgress size={50} sx={{ color: "#fbc02d" }} />
          </Box>
        ) : data.length === 0 ? (
          // No data available view
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // marginBottom: "20px",
              alignItems: "center",
              minHeight: "40vh",
              textAlign: "center",
            }}
          >
            <img
              src="/images/no-data.png"
              alt="No Data"
              style={{
                width: "150px", // Adjust the image size as needed
                height: "auto",
                marginBottom: "20px",
              }}
            />
            <Typography variant="h6" color="textSecondary">
              No data available
            </Typography>
          </Box>
        ) : (
          <Table aria-label="generic table">
            <TableHead sx={{ background: "#F5F5F5", height: "36px" }}>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      borderRight: "4px solid #ffffff",
                      borderBottom: "1px solid #F7FAFF",

                      padding: "5px 0px",
                      minWidth: "60px",
                      width: "auto",
                    }}
                  >
                    <CustomTypography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily: " var(--font-raleway)",
                        color: "#797979",
                      }}
                    >
                      {column.label}
                    </CustomTypography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ borderBottom: "1px solid #B2B2B2" }}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align="center"
                      sx={{
                        width: 100,
                        fontSize: "11px",
                        fontWeight: "400",
                        fontFamily: " var(--font-raleway)",
                        color: "#797979",

                        lineHeight: "17px",
                        height: "36px",
                        minWidth: "90px",
                        padding: "5px 10px",
                      }}
                    >
                      {/* Render value or action using the render function */}
                      {column.render
                        ? column.render(row[column.accessor as keyof T], row) // Custom render function
                        : row[column.accessor as keyof T] !== undefined
                        ? String(row[column.accessor as keyof T])
                        : "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {data.length >= 5 && showPagination && (
          <Box
            sx={{
              display: "flex",
              mt: 1,
              height: "40px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <CustomPagination
              count={data.length} // Total number of rows in data
              page={page} // Current page
              rowsPerPage={rowsPerPage} // Rows per page
              onPageChange={handleChangePage} // Handle page change
              onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
            />
          </Box>
        )}
      </TableContainer>
    </Card>
  );
};

export default GenericTable;
