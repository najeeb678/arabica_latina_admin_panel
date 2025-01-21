import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllDoctors } from "@/redux/slices/DoctorsSlice";
import GenericInput from "@/_components/common/InputField/GenericInput";
import { format } from "date-fns";
import { createSchedule, getSchedule } from "@/redux/slices/ScheduleSlice";
interface AddScheduleFormProps {
  handleClose: () => void;
  selectedSchedule: any | null;
}
const AddScheduleForm: React.FC<AddScheduleFormProps> = ({
  handleClose = () => {},
  selectedSchedule = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const doctorsData: any[] = useSelector(
    (state: any) => state.doctors.doctorsData
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [doctorServices, setDoctorServices] = useState([]);

  useEffect(() => {
    dispatch(getAllDoctors({ search: "", filter: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedSchedule) {
      setIsUpdate(true);
      formik.setValues({
        doctorId: selectedSchedule.doctorId.id || "",
        subServiceId: selectedSchedule.subService.id || "",
        scheduleDate:
          format(new Date(selectedSchedule.scheduleDate), "yyyy-MM-dd") || "",
        slotDuration: selectedSchedule.slotDuration || "",
        startTime: format(new Date(selectedSchedule.startTime), "HH:mm") || "",
        endTime: format(new Date(selectedSchedule.endTime), "HH:mm") || "",
      });

      // Update services based on the selected doctor
      const selectedDoctor = doctorsData.find(
        (doctor: any) => doctor.id === selectedSchedule.doctorId.id
      );


      if (
        selectedDoctor &&
        selectedDoctor.specialization &&
        selectedDoctor.specialization.subServices
      ) {
        setDoctorServices(selectedDoctor.specialization.subServices);
      } else {
        setDoctorServices([]);
      }
    } else {
      setIsUpdate(false);
      formik.resetForm();
    }
  }, [selectedSchedule, doctorsData]);

  const transformPayload = (data: any) => {
    const formattedScheduleDate = format(
      new Date(data.scheduleDate),
      "yyyy-MM-dd'T'00:00:00.000'Z'"
    );
    const startTime = format(
      new Date(`${data?.scheduleDate}T${data.startTime}:00`),
      "yyyy-MM-dd'T'HH:mm:ss.000'Z'"
    );
    const endTime = format(
      new Date(`${data.scheduleDate}T${data.endTime}:00`),
      "yyyy-MM-dd'T'HH:mm:ss.000'Z'"
    );

    return {
      doctorId: data?.doctorId,
      subServiceId: data?.subServiceId,
      scheduleDate: formattedScheduleDate,
      startTime: startTime,
      endTime: endTime,
      slotDuration: parseInt(data.slotDuration, 10),
    };
  };
  const formik = useFormik({
    initialValues: {
      doctorId: "",
      subServiceId: "",
      scheduleDate: "",
      slotDuration: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object().shape({
      doctorId: Yup.string().required("Doctor selection is required"),
      subServiceId: Yup.string().required("Service selection is required"),
      scheduleDate: Yup.date().required("Date is required").nullable(),
      slotDuration: Yup.number()
        .required("Number of slots is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
    }),
    onSubmit: async (data) => {
      const payload = transformPayload(data);
      setLoading(true);
      // try {createSchedule
      try {
        if (isUpdate) {
          //we are not updating schedule

          toast(" updated successfully", { type: "success" });
        } else {
          // Create new doctor
          const res = await dispatch(createSchedule(payload)).unwrap();
          dispatch(getSchedule({ search: "", filter: "" }));
          toast("Schedule created successfully", { type: "success" });
        }
        setLoading(false);
        handleClose();
      } catch (error: any) {
        // console.log("err", error);

        toast.error(error);

        setLoading(false);
      }
    },
  });
  const handleDoctorChange = (value: any) => {
    formik.setFieldValue("doctorId", value?.id || "");

    // Find the selected doctor
    const selectedDoctor = doctorsData.find(
      (doctor: any) => doctor.id === value?.id
    );

    // If a doctor is selected, set the services based on their specialization
    if (
      selectedDoctor &&
      selectedDoctor.specialization &&
      selectedDoctor.specialization.subServices
    ) {
      setDoctorServices(selectedDoctor.specialization.subServices);
    } else {
      setDoctorServices([]); // Reset services if no doctor is selected
    }
  };
  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "5px 20px",
      }}
    >
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Select a Doctor"
                textFieldLabel="Select Doctor"
                data={doctorsData}
                onChange={handleDoctorChange}
                onBlur={formik.handleBlur("doctorId")}
                name="doctorId"
                value={
                  doctorsData?.find(
                    (doctor: any) => doctor.id === formik.values.doctorId
                  ) || null
                }
              />
              {formik.touched.doctorId && formik.errors.doctorId && (
                <Typography color="error" variant="caption">
                  {formik.errors.doctorId}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Select a Service"
                textFieldLabel="Select Service"
                data={doctorServices} // Use the filtered services here
                onChange={(value) => {
                  // console.log(" Service value", value?.id);
                  formik.setFieldValue("subServiceId", value?.id || "");
                }}
                onBlur={formik.handleBlur("subServiceId")}
                name="subServiceId"
                value={
                  doctorServices.find(
                    (service: any) => service.id === formik.values.subServiceId
                  ) || null
                }
              />
              {formik.touched.subServiceId && formik.errors.subServiceId && (
                <Typography color="error" variant="caption">
                  {formik.errors.subServiceId}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Date"
                type="date"
                name="scheduleDate"
                value={formik.values.scheduleDate}
                onChange={formik.handleChange("scheduleDate")}
                onBlur={formik.handleBlur("scheduleDate")}
                placeholder="Select a date"
                error={
                  formik.touched.scheduleDate &&
                  Boolean(formik.errors.scheduleDate)
                } // Pass error prop
                helperText={
                  formik.touched.scheduleDate && formik.errors.scheduleDate
                    ? formik.errors.scheduleDate
                    : undefined
                } // Pass error message or undefined
                // sx={{ margin: "8px 0" }} // Optional styling
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Slot Time (Minutes)"
                type="number"
                name="slotDuration"
                placeholder="Enter Slot Duration"
                value={formik.values.slotDuration}
                onChange={formik.handleChange("slotDuration")}
                onBlur={formik.handleBlur("slotDuration")}
                error={
                  formik.touched.slotDuration &&
                  Boolean(formik.errors.slotDuration)
                }
                helperText={
                  formik.touched.slotDuration && formik.errors.slotDuration
                    ? formik.errors.slotDuration
                    : undefined
                }
              />
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={2} direction="row">
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Start Time"
                type="time"
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange("startTime")}
                onBlur={formik.handleBlur("startTime")}
                error={
                  formik.touched.startTime && Boolean(formik.errors.startTime)
                }
                helperText={
                  formik.touched.startTime && formik.errors.startTime
                    ? formik.errors.startTime
                    : undefined
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="End Time"
                type="time"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange("endTime")}
                onBlur={formik.handleBlur("endTime")}
                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                helperText={
                  formik.touched.endTime && formik.errors.endTime
                    ? formik.errors.endTime
                    : undefined
                }
              />
            </Grid>
          </Grid>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              style={{ marginLeft: "10px" }}
              sx={{
                fontSize: "13px !important",
                fontWeight: "400 !important",
                borderRadius: "50px !important",
                borderColor: "#b2b2b2",
                marginRight: "20px",
                color: "#A6A6A6",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: "12px !important",
                fontWeight: "700 !important",
                fontFamily: "Avenir !important",
                lineHeight: "18px !important",
                borderRadius: "50px !important",
                backgroundColor: "#FBC02D !important",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#FBC02D !important", // Same background color
                  color: "white !important",
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
              }}
              onClick={(e: any) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              {loading ? (
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                  visible
                />
              ) : isUpdate ? (
                "Update Schedule"
              ) : (
                <>
                  {/* <AddIcon sx={{ marginRight: 1 }} /> */}
                  Create Schedule
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddScheduleForm;
