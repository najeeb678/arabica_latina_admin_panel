import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

import GenericInput from "@/_components/common/InputField/GenericInput";
import { format } from "date-fns";
import { createSchedule, getSchedule } from "@/redux/slices/ScheduleSlice";
import { getDoctorsofSubService } from "@/redux/slices/ServicesSlice";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentsSlotsOfDoctor,
} from "@/redux/slices/AppointmentSlice";
import SlotSelect from "./SlotSelect";

interface AddAppointmentProps {
  handleClose?: () => void;
  selectedAppointment?: any | null;
}
const AddAppointment: React.FC<AddAppointmentProps> = ({
  handleClose = () => {},
  selectedAppointment = null,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [subServices, setSubServices] = useState([]);
  const [doctorsOfSubServices, setDoctorsOfSubServices] = useState([]);
  const [slotsData, setSlotsData] = useState([]);
  const allServiceData = useSelector(
    (state: any) => state.service.allServicesData
  );
  const formatSlotTime = (startTime: string, endTime: string) => {
    const start = format(new Date(startTime), "h:mm a");
    const end = format(new Date(endTime), "h:mm a");
    return `${start} - ${end}`;
  };

  const availableSlots = slotsData
    .filter((slot: any) => slot.status === "AVAILABLE")
    .map((slot: any) => ({
      ...slot,
      displayTime: formatSlotTime(slot.startTime, slot.endTime),
    }));
  const transformPayload = (data: any) => {
    return {
      contactNo: data.contactNo,
      dob: data.dob,
      slotId: data.slotId,
      doctorId: data.doctorId,
      name: data.name || "John",
      paymentMethod: "Cash",
      scheduledDate: new Date(data.scheduleDate).toISOString(),
      subServiceId: data.subServiceId,
      type: "booking",
      email: data.email,
    };
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      doctorId: "",
      subServiceId: "",
      serviceId: "",
      dob: "",
      slotId: "",
      contactNo: "",
      scheduleDate: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      doctorId: Yup.string().required("Doctor selection is required"),
      contactNo: Yup.string().required("Contact No is required"),
      slotId: Yup.string().required("Slot selection is required"), //TODO:UNCOMMENT
      serviceId: Yup.string().required("Service selection is required"),
      subServiceId: Yup.string().required("Sub Service selection is required"),
      scheduleDate: Yup.date().required("Date is required").nullable(),
      dob: Yup.date().required("Date of birth is required").nullable(),
    }),
    onSubmit: async (data) => {
      const payload = transformPayload(data);
      setLoading(true);

      try {
        if (isUpdate) {
          toast(" updated successfully", { type: "success" });
        } else {
          // Create new doctor
          const res = await dispatch(bookAppointment(payload)).unwrap();

          if (res) {
            handleClose();
            dispatch(getAllAppointments({ search: "", filter: "" }));
            toast("Appointment created successfully", { type: "success" });
          }
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

  const handleServiceChange = (value: any) => {
    formik.setFieldValue("serviceId", value?.id || "");

    // Find the selected service
    const selectedService = allServiceData.find(
      (service: any) => service.id === value?.id
    );

    // If a service is selected, set its sub-services
    if (selectedService && selectedService.subServices) {
      setSubServices(selectedService.subServices);
    } else {
      setSubServices([]); // Reset sub-services if no service is selected
    }
  };
  const handleSubServiceChange = (value: any) => {
    formik.setFieldValue("subServiceId", value?.id || "");
    dispatch(getDoctorsofSubService(value?.id))
      .unwrap()
      .then((res: any) => {
        setDoctorsOfSubServices(res);
      });
  };
  const handleDoctorChange = async (value: any) => {
    try {
      // Set the selected doctor's ID in the formik state
      formik.setFieldValue("doctorId", value?.id || "");

      if (formik.values.scheduleDate) {
        // Format the schedule date using date-fns
        const formattedDate = format(
          new Date(formik.values.scheduleDate),
          "yyyy-MM-dd'T'HH:mm:ss.000'Z'"
        );

        // Prepare the payload
        const payload = {
          doctorId: value?.id,
          dateSelected: formattedDate,
        };

        // Dispatch the action to get appointment slots
        const response = await dispatch(
          getAppointmentsSlotsOfDoctor(payload)
        ).unwrap();

        // Store the available slots in the local state
        setSlotsData(response);
      } else {
        toast.error("Please select a schedule date first.");
      }
    } catch (error: any) {
      console.error("Error fetching appointment slots:", error);
      toast.error("Failed to fetch appointment slots.");
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
              <GenericInput
                name="name"
                label="Full Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                placeholder="Enter Full name"
              />
              {formik.touched.name && formik.errors.name && (
                <span className="error-message">
                  {" "}
                  {typeof formik.errors.name === "string"
                    ? formik.errors.name
                    : ""}
                </span>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                name="email"
                label="Email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error-message">
                  {" "}
                  {typeof formik.errors.email === "string"
                    ? formik.errors.email
                    : ""}
                </span>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Contact No "
                type="number"
                name="contactNo"
                value={formik.values.contactNo}
                onChange={formik.handleChange("contactNo")}
                onBlur={formik.handleBlur("contactNo")}
                placeholder="Add contactNo"
                error={
                  formik.touched.contactNo && Boolean(formik.errors.contactNo)
                } // Pass error prop
                helperText={
                  formik.touched.contactNo && formik.errors.contactNo
                    ? formik.errors.contactNo
                    : undefined
                }
                // sx={{ margin: "8px 0" }} // Optional styling
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Date of Birth"
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange("dob")}
                onBlur={formik.handleBlur("dob")}
                placeholder="Select date"
                error={formik.touched.dob && Boolean(formik.errors.dob)} // Pass error prop
                helperText={
                  formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : undefined
                }
                // sx={{ margin: "8px 0" }} // Optional styling
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <GenericInput
                label="Schedule Date"
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
              <SingleSelect
                title="Select a Service"
                textFieldLabel="Select Service"
                data={allServiceData || []}
                onChange={handleServiceChange}
                onBlur={formik.handleBlur("serviceId")}
                name="serviceId"
                value={
                  allServiceData.find(
                    (service: any) => service.id === formik.values.serviceId
                  ) || null
                }
              />
              {formik.touched.serviceId && formik.errors.serviceId && (
                <Typography color="error" variant="caption">
                  {formik.errors.serviceId}
                </Typography>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Select a Sub-Service"
                textFieldLabel="Select Sub Service"
                data={subServices || []}
                onChange={handleSubServiceChange}
                onBlur={formik.handleBlur("subServiceId")}
                name="subServiceId"
                value={
                  subServices.find(
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
            <Grid size={{ xs: 12, md: 6 }} component="div">
              <SingleSelect
                title="Select a Doctor"
                textFieldLabel="Select Doctor"
                data={doctorsOfSubServices || []}
                onChange={handleDoctorChange}
                onBlur={formik.handleBlur("doctorId")}
                name="doctorId"
                value={
                  doctorsOfSubServices.find(
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
              <SlotSelect
                title="Select a Slot"
                placeholder="Select a Slot"
                options={availableSlots}
                value={
                  availableSlots.find(
                    (slot) => slot.id === formik.values.slotId
                  ) || null
                }
                onChange={(event, newValue) =>
                  formik.setFieldValue("slotId", newValue?.id)
                }
                onBlur={formik.handleBlur("slotId")}
                error={formik.touched.slotId && Boolean(formik.errors.slotId)}
                helperText={
                  formik.touched.slotId && formik.errors.slotId
                    ? formik.errors.slotId
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
                "Update Appointment"
              ) : (
                <>
                  {/* <AddIcon sx={{ marginRight: 1 }} /> */}
                  Book Appointment
                </>
              )}
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddAppointment;
