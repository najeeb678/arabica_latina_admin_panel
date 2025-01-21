import React from "react";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CircularChart from "@/_components/common/Charts/PieCharts/DonutChart";
import { Box } from "@mui/material";

interface PatientChartProps {
  title: string;
  chartData: { label: string; value: number }[];
  dynamicText: { label: string; color: string }[];
}

const PatientChart: React.FC<PatientChartProps> = ({
  title,
  chartData,
  dynamicText,
}) => {
  // Default chart data when no data is provided
  const defaultChartData = [{ label: "No Data", value: 100 }];
  const finalChartData = chartData.length > 0 ? chartData : defaultChartData;

  return (
    <GenericCard height="292px">
      {/* Title */}
      <CustomTypography
        sx={{
          marginTop: "10px",
          marginLeft: { xs: "0px", md: "0px", lg: "0px" },
          padding: "0px",
          marginBottom: "0px",
          fontSize: "16px",
          fontFamily: "var(--font-raleway)",
          fontWeight: "450",
          lineHeight: "19px",
          whiteSpace: "nowrap",
          marginRight: "25px",
        }}
      >
        {title}
      </CustomTypography>

      {/* Circular Chart */}
      <CircularChart
        sx={{
          marginTop: "30px",
        }}
        chartData={finalChartData}
        chartSize={145}
        colors={
          chartData.length > 0
            ? dynamicText.map((item) => item.color)
            : ["#d3d3d3"]
        }
        title={<img src="/icons/carbon_person.svg" alt="Chart Icon" />}
      />

      {/* Legend */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "5px",
          marginTop: "30px",
        }}
      >
        {dynamicText?.length > 0 ? (
          dynamicText?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Dot for color */}
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  marginRight: "8px", // Spacing between dot and text
                  flexShrink: 0,
                }}
              />
              {/* Label */}
              <CustomTypography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </CustomTypography>
            </Box>
          ))
        ) : (
          <CustomTypography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "14px",
              color: "#d3d3d3", // Default text color when no data is available
            }}
          >
            No data available
          </CustomTypography>
        )}
      </Box>
    </GenericCard>
  );
};

export default PatientChart;
