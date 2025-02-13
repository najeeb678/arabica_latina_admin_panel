import GenericInput from "@/_components/common/InputField/GenericInput";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createDiscount, updateDiscount } from "@/redux/slices/discountSlice";

import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

const AddDiscount = ({
  handleClose,
  initialData = null,
}: {
  handleClose: () => void;
  initialData?: { id: string; percentage: string } | null;
}) => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    percentage: Yup.number()
      .typeError("Please enter a valid number")
      .min(1, "Percentage must be at least 1")
      .max(100, "Percentage cannot be more than 100")
      .required("Percentage is required"),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      percentage: initialData?.percentage || "",
    },
    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (initialData) {
          await dispatch(
            updateDiscount({ id: initialData.id, payload: values })
          )
            .unwrap()
            .finally(() => setLoading(false));
          toast.success("Discount updated successfully!", {
            position: "top-right",
          });
        } else {
          await dispatch(createDiscount(values))
            .unwrap()
            .finally(() => setLoading(false));
          toast.success("Discount added successfully!", {
            position: "top-right",
          });
        }

        resetForm();
        handleClose();
      } catch (error) {
        toast.error("Failed to save discount. Please try again.", {
          position: "top-right",
        });
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <GenericInput
          name="percentage"
          type="text"
          value={formik.values.percentage}
          onChange={formik.handleChange("percentage")}
          onBlur={formik.handleBlur("percentage")}
          error={formik.touched.percentage && Boolean(formik.errors.percentage)}
          helperText={
            formik.touched.percentage && formik.errors.percentage
              ? (formik.errors.percentage as any)
              : undefined
          }
          placeholder="Enter Discount Percentage"
          sx={{ marginTop: "-10px" }}
          inputfieldHeight="45px"
        />

        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            // disabled={!formik.isValid || formik.isSubmitting}
            type="submit"
            sx={{
              fontSize: "13px !important",
              fontWeight: "400 !important",
              borderRadius: "50px !important",
              backgroundColor: "#FBC02D !important",
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#FBC02D !important",
                color: "white !important",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5 )",
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
            ) : initialData ? (
              "Update Discount"
            ) : (
              "Add Discount"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddDiscount;
