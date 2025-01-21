import React, { useEffect } from "react";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchDoctorTopDepartments } from "@/redux/slices/doctorDashboardSlice";
import { getUserId } from "@/utils/utils";

const TopDepartments = () => {
  const dispatch = useAppDispatch();
  let userId = getUserId();
  const { doctorTopDepartments, loading } = useAppSelector(
    (state) => state.doctorDashboard
  );

  useEffect(() => {
    dispatch(fetchDoctorTopDepartments({ doctorId: userId || "" }));
  }, [dispatch]);

  return (
    <GenericCard height="292px">
      <CustomTypography
        sx={{
          marginTop: "15px",
          marginLeft: "5px",
          marginBottom: "25px",
          padding: "0px",
          fontFamily: "Raleway",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "19.2px",
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
          gap: "15px",
          flexDirection: "column",
        }}
      >
        {doctorTopDepartments?.map((item, index) => (
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
                backgroundColor: "#F5F5F5", // Background color for the icon box only
                borderRadius: "8px", // Rounded corners for the icon box
              }}
            >
              <img
                src={`icons/TopDepartments/${item.serviceName
                  .toLowerCase()
                  .replace(/\s/g, "-")}.svg`} // Assuming you have images named accordingly
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
                marginLeft: "25px",
                marginBottom: "2px",
              }}
            >
              {/* Title */}
              <CustomTypography
                sx={{
                  fontSize: "12px",
                  fontWeight: "300",
                  fontFamily: "Avenir",
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
                  fontFamily: "Avenir",
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
