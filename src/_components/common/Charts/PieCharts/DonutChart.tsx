import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { title } from "process";

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const CircularChart = ({
  chartData = [],
  colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6"],
  title,
  sx = {},
  chartSize = 150,
}: {
  chartData: { label: string; value: number }[];
  colors?: string[];
  title?: React.ReactNode; // Accept JSX for labels
  sx?: React.CSSProperties;
  chartSize?: number;
}) => {
  // Transform backend data into Chart.js format
  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        backgroundColor: colors,
        data: chartData.map((item) => item.value),
        // borderWidth: 0,
        // borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false, // Hide the color square
      },
    },
    cutout: "76%",
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${chartSize}px`,
        height: `${chartSize}px`,
        margin: "auto",
        ...sx,
      }}
    >
      <Doughnut data={data} options={options} />
      {title && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            
          }}
        > 
          {title}
        </div>
      )}
    </div>
  );
};

export default CircularChart;
