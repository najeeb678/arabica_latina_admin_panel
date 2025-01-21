import React, { useEffect } from "react";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchTopDepartments } from "@/redux/slices/AdminDashboardSlice";

const TopDepartments = () => {
  const dispatch = useAppDispatch();

  const { topDepartments, loading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchTopDepartments());
  }, [dispatch]);

  const serviceNameToFileMap = {
    "Dental Care": "dental-care.svg",
    Dermatologist: "dermatology.svg",
    Gynocology: "gynocology.svg",
    Thin: "thin.svg",
  };
  type TopDepartment = {
    serviceName: keyof typeof serviceNameToFileMap;
    patientCount: number;
    percentage: number;
  };
  return (
    <GenericCard height="292px">
      <CustomTypography
        sx={{
          marginTop: "20px",
          marginLeft: "5px",
          marginBottom: "25px",
          padding: "0px",
          fontSize: "16px",
          fontFamily: "var(--font-raleway)",
          fontWeight: "450",
          lineHeight: "19px",
          marginRight: "25px",
        }}
      >
        Top Departments
      </CustomTypography>
      <Box
        sx={{
          width: "100%",
          height: "198px",
          overflowY: "auto",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        {topDepartments?.map((item: TopDepartment, index) => (
          <Box
            key={index}
            sx={{
              width: "auto", // Set the width of the outer box for icon and title
              height: "42px", // Set the height of the outer box
              display: "flex",
              alignItems: "center",
              paddingLeft: "5px",
              borderRadius: "8px",
            }}
          >
            {/* Icon Box with background color */}
            <Box
              sx={{
                width: "44px",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
              }}
            >
              <img
                src={`icons/TopDepartments/${
                  serviceNameToFileMap[item.serviceName] ||
                  "icons/TopDepartments/dermatology.svg"
                }`}
                alt={item.serviceName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Title and Percentage */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "left",
                marginLeft: { xs: "10px", md: "15px", lg: "25px" },
                //marginLeft: "25px",
                marginBottom: "2px",
              }}
            >
              {/* Title */}
              <CustomTypography
                sx={{
                  fontSize: "12px",
                  fontWeight: "300",
                  //fontFamily: "Avenir",
                  fontFamily: "AvenirBook",
                  lineHeight: "14.4px",
                  textAlign: "center",
                }}
              >
                {item.serviceName}
              </CustomTypography>

              {/* Percentage */}
              <CustomTypography
                sx={{
                  fontSize: "10px",
                  fontWeight: "300",
                  //fontFamily: "Avenir",
                  fontFamily: "AvenirBook",
                  lineHeight: "12px",
                  textAlign: "left",
                  color: "#7B7B7B",
                }}
              >
                {item.percentage} %
              </CustomTypography>
            </Box>
          </Box>
        ))}
      </Box>
    </GenericCard>
  );
};

export default TopDepartments;
