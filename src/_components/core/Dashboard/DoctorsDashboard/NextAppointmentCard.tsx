import React, { useEffect, useState } from "react";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import GenericCircularProgress from "@/_components/common/CircularProgress/GenericCircularProgress";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { fetchDoctorNextAppointment } from "@/redux/slices/doctorDashboardSlice";
import { getUserId } from "@/utils/utils";
const dummyAppointment = {
  remainingTime: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  appointmentDetails: {
    patientName: "John Doe",
    time: "3:00 PM",
    date: "2024-12-31",
  },
};
const NextAppointment = () => {
  const [remainingTime, setRemainingTime] = useState(0); // In milliseconds
  const [progress, setProgress] = useState(100); // Progress percentage
  const dispatch = useAppDispatch();
  let userId = getUserId();
  // const [doctorNextAppointment, setDoctorNextAppointment] =
  //   useState<any>(dummyAppointment);
  const { doctorNextAppointment, loading } = useAppSelector(
    (state) => state.doctorDashboard
  );

  useEffect(() => {
    dispatch(
      fetchDoctorNextAppointment({
        doctorId: userId || "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (doctorNextAppointment?.remainingTime) {
      setRemainingTime(doctorNextAppointment.remainingTime); // Initialize with remaining time from API
    }
  }, [doctorNextAppointment]);

  useEffect(() => {
    const totalDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = Math.max(prev - 1000, 0);
        // Calculate the progress dynamically
        setProgress((newTime / totalDuration) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatTime = (ms: any) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")} Hr : ${minutes
      .toString()
      .padStart(2, "0")} Min : ${seconds.toString().padStart(2, "0")} Sec`;
  };

  return (
    <GenericCard height="292px">
      <CustomTypography
        sx={{
          marginTop: "15px",
          marginLeft: "5px",
          padding: "0px",

          marginBottom: "20px",
          fontSize: "16px",
          fontFamily: "var(--font-raleway)",
          fontWeight: "450",
          lineHeight: "19px",
          whiteSpace: "nowrap",
          marginRight: "25px",
        }}
      >
        {doctorNextAppointment
          ? `Next Appointment in`
          : "No upcoming appointments"}
      </CustomTypography>
      {!doctorNextAppointment && (
        <>
          <GenericCircularProgress
            value={100} // Dynamic progress
            size={145}
            color="#3A90F3"
            label={
              <img
                src="icons/Group.svg"
                alt="Center Icon"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            }
          />
          <CustomTypography
            sx={{
              marginTop: "25px",
              fontFamily: "Avenir",
              fontWeight: "700",
              fontSize: "17px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#7B7B7B",
            }}
          >
            {formatTime(remainingTime)}
          </CustomTypography>
        </>
      )}
      {doctorNextAppointment && (
        <>
          <GenericCircularProgress
            value={progress} // Dynamic progress
            size={145}
            color="#3A90F3"
            label={
              <img
                src="icons/Group.svg"
                alt="Center Icon"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            }
          />
          <CustomTypography
            sx={{
              marginTop: "25px",
              fontFamily: "Avenir",
              fontWeight: "700",
              fontSize: "17px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#7B7B7B",
            }}
          >
            {formatTime(remainingTime)}
          </CustomTypography>
        </>
      )}
    </GenericCard>
  );
};

export default NextAppointment;
