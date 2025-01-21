import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import {
  createLoyaltyPackage,
  getLoyaltyPackages,
  getSubservices,
} from "@/redux/slices/loyaltyPointSlice";
import { RootState } from "@/redux/store";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import GenericInput from "@/_components/common/InputField/GenericInput";
import MultiSelect from "@/_components/common/AdvancedUiElements/MultiSelect";
import { ThreeDots } from "react-loader-spinner";
interface Option {
  id: string; // Ensure id is a string as per your data
  name: string;
}

const packageOptions = [
  { id: "Silver", name: "Silver" },
  { id: "Gold", name: "Gold" },
  { id: "Platinum", name: "Platinum" },
];

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { subServices } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );
  const { loyaltyPackages } = useAppSelector(
    (state: RootState) => state.loyaltyPoints
  );
  const packageToSubServices = loyaltyPackages?.reduce((acc, packageItem) => {
    const { loyaltyType, SubServices } = packageItem;

    // Ensure the package type exists as a key in the accumulator
    if (!acc[loyaltyType]) {
      acc[loyaltyType] = [];
    }

    // Extract IDs of the SubServices and add them to the respective package type
    const subServiceIds = SubServices.map((subService: any) => subService.id);
    acc[loyaltyType].push(...subServiceIds);

    return acc;
  }, {});
  const packageToExpiryDates = loyaltyPackages?.reduce((acc, packageItem) => {
    const { loyaltyType, expiryDate } = packageItem;

    // Ensure the package type exists as a key in the accumulator
    if (!acc[loyaltyType]) {
      acc[loyaltyType] = [];
    }

    // Add the expiryDate to the respective package type
    acc[loyaltyType].push(expiryDate);

    return acc;
  }, {});
  console.log("packageToSubServices", packageToSubServices);
  console.log("packageToExpiryDates", packageToExpiryDates);
  useEffect(() => {
    dispatch(getSubservices());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  interface FormValues {
    metalName: string;
    subServiceIds: string[];
    expiryDate: string;
  }
  const formik = useFormik<FormValues>({
    initialValues: {
      metalName: "",
      subServiceIds: [],
      expiryDate: "",
    },
    validationSchema: Yup.object().shape({
      metalName: Yup.string().required("Package name is required"),
      subServiceIds: Yup.array().min(1, "At least one sub-service is required"),
      expiryDate: Yup.number()
        .required("Expiry days are required")
        .positive("Must be a positive number"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(
          createLoyaltyPackage({
            loyaltyType: values.metalName,
            subServiceIds: values.subServiceIds, // This should be an array
            expiryDate: values.expiryDate,
          })
        )
          .unwrap()
          .finally(() => {
            dispatch(getLoyaltyPackages())
              .unwrap()
              .then(() => {
                setLoading(false);
              });
          });

        toast.success("Loyalty package updated successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to update loyalty package. Please try again.");
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Box marginTop="-28px" display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "108px",
          height: "29px",
          gap: "7.35px",
          borderRadius: "50px",
          backgroundColor: "rgba(251, 192, 45, 1)",
        }}
      >
        <CustomTypography
          sx={{
            fontFamily: "var(--font-avenir-medium)",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "16.39px",
            letterSpacing: "0.01em",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Edit
        </CustomTypography>
      </Button>

      <CustomModal
        open={open}
        title="Edit Information"
        handleClose={handleClose}
        modalWidth="50%"
      >
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <SingleSelect
            title="Select Package"
            textFieldLabel="Package Name"
            name="metalName"
            data={packageOptions}
            onChange={(value) => {
              const selectedPackageName = value?.name;
              formik.setFieldValue("metalName", selectedPackageName);
              const selectedExpiryDates =
                packageToExpiryDates[selectedPackageName] || [];
              formik.setFieldValue("expiryDate", selectedExpiryDates[0] || "");

              const selectedSubServices =
                packageToSubServices[selectedPackageName] || [];
              formik.setFieldValue("subServiceIds", selectedSubServices);
            }}
            value={
              packageOptions.find(
                (option) => option.name === formik.values.metalName
              ) || null
            }
            onBlur={formik.handleBlur("metalName")}
            sx={{ height: "45px", borderRadius: "5px", marginBottom: "6px" }}
          />
          {formik.touched.metalName && formik.errors.metalName && (
            <span className="error-message">{formik.errors.metalName}</span>
          )}

          <MultiSelect
            title="Sub Service"
            textFieldLabel="Select Sub-Service"
            name="subServiceIds"
            data={(subServices as Option[]) || []}
            onChange={(value: Option[] | null) => {
              const selectedIds = value ? value.map((v) => v.id) : [];
              formik.setFieldValue("subServiceIds", selectedIds);
            }}
            value={
              subServices?.filter((service: Option) =>
                formik.values.subServiceIds.includes(service.id)
              ) || []
            }
            onBlur={formik.handleBlur("subServiceIds")}
          />

          {formik.touched.subServiceIds && formik.errors.subServiceIds && (
            <span className="error-message">{formik.errors.subServiceIds}</span>
          )}

          <GenericInput
            label="Expiry Days"
            type="text"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange("expiryDate")}
            onBlur={formik.handleBlur("expiryDate")}
            placeholder="Add No.of expiry days"
            error={
              formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
            }
            helperText={
              formik.touched.expiryDate && formik.errors.expiryDate
                ? formik.errors.expiryDate
                : undefined
            }
            inputfieldHeight="45px"
          />

          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "var(--font-avenir-medium)",
                width: "108px",
                height: "29px",
                gap: "7.35px",
                borderRadius: "50px",
                backgroundColor: "rgba(251, 192, 45, 1)",

                "&:hover": {
                  backgroundColor: "#FBC02D !important",
                  color: "white !important",
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
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
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default EditModal;
