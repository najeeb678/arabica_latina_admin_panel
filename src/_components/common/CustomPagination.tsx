import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [previousCount, setPreviousCount] = useState(count);

  useEffect(() => {
    if (count !== previousCount && count !== 0) {
      setPreviousCount(count);
    }
  }, [count, previousCount]);

  const totalPages = Math.ceil(previousCount / rowsPerPage);

  const handlePreviousPage = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (page > 0) onPageChange(event, page - 1);
  };

  const handleNextPage = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (page < totalPages - 1) onPageChange(event, page + 1);
  };

  // Logic for determining the pages to show
  const getPagesToShow = () => {
    const pages: number[] = [];

    const range = 1; // Show 1 page before and after the current page

    // Show the first four pages at the start
    if (page <= 4) {
      // Show the first 4 pages if the current page is less than or equal to 4
      for (let i = 0; i < Math.min(4, totalPages); i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, show 1 page before and after the current page
      pages.push(0);
      for (let i = page - range; i <= page + range; i++) {
        if (i >= 0 && i < totalPages) {
          pages.push(i);
        }
      }
    }

    // Ensure that the current page is always included
    if (!pages.includes(page)) {
      pages.push(page);
    }

    // Always show the last page, but only if it's not already included
    if (!pages.includes(totalPages - 1)) {
      pages.push(totalPages - 1);
    }

    // Remove duplicates and sort
    const uniquePages = Array.from(new Set(pages)).sort((a, b) => a - b);

    const pagesWithEllipsis: (number | string)[] = [];

    // Add ellipsis if needed
    for (let i = 0; i < uniquePages.length; i++) {
      if (i > 0 && uniquePages[i] - uniquePages[i - 1] > 1) {
        pagesWithEllipsis.push("...");
      }
      pagesWithEllipsis.push(uniquePages[i]);
    }

    return pagesWithEllipsis;
  };

  const pagesToShow = getPagesToShow();

  return (
    <Box
      //position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
    >
      <Box>
        <Typography sx={{ fontWeight: "300", fontSize: "12px" }}>
          Showing {page * rowsPerPage + 1} -{" "}
          {Math.min((page + 1) * rowsPerPage, previousCount)} of {previousCount}{" "}
          entries
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flext-end"
        sx={{ margin: "10px 0px" }}
      >
        <Box
          onClick={handlePreviousPage}
          sx={{
            backgroundColor: "#FBC02D",
            width: "28px",
            height: "33px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FBC02D", // Consistent hover color
            },
          }}
        >
          <ArrowBackIosRoundedIcon
            sx={{ width: "15px", height: "15px", color: "white" }}
          />
        </Box>

        {pagesToShow.map((pageItem, index) => (
          <Box
            key={index}
            onClick={(event) => {
              if (pageItem !== "...") {
                onPageChange(
                  event as React.MouseEvent<HTMLElement, MouseEvent>,
                  pageItem as number
                );
              }
            }}
            sx={{
              width: "35px",
              height: "33px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 3px",
              cursor: pageItem === "..." ? "default" : "pointer", // Disable cursor for ellipsis
              borderRadius: "4px",
              ...(pageItem === page && {
                color: "#161616",
                backgroundColor: "#F5F5F5", // Highlight the active page
              }),
              ...(pageItem !== page &&
                pageItem !== "..." && {
                  color: "#161616",
                }),
              ...(pageItem === "..." && {
                fontSize: "14px",
                fontWeight: "bold",
              }),
            }}
          >
            {pageItem === "..." ? (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#161616",
                }}
              >
                ...
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                {Number(pageItem) + 1}
              </Typography>
            )}
          </Box>
        ))}

        <Box
          onClick={handleNextPage}
          sx={{
            backgroundColor: "#FBC02D",
            width: "28px",
            height: "33px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FBC02D",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon
            sx={{ width: "15px", height: "15px", color: "white" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomPagination;
