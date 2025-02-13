import GenericInput from "@/_components/common/InputField/GenericInput";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createDiscount, updateDiscount } from "@/redux/slices/discountSlice";
import { useDispatch } from "react-redux";
import Button from "@/_components/common/button";

const AddDiscount = ({
  handleClose,
  initialData = null, // If provided, it's update mode
}: {
  handleClose: () => void;
  initialData?: { id: string; percentage: string } | null;
}) => {
  const [percentage, setPercentage] = useState(initialData?.percentage || "");
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (initialData) setPercentage(initialData.percentage);
  }, [initialData]);

  const validatePercentage = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num > 0 && num <= 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePercentage(percentage)) {
      toast.error("Please enter a valid percentage (1-100).", {
        position: "top-right",
      });
      return;
    }

    try {
      if (initialData) {
        await dispatch(
          updateDiscount({ id: initialData.id, payload: { percentage } })
        ).unwrap();

        toast.success("Discount updated successfully!", {
          position: "top-right",
        });
      } else {
        // Create Discount
        await dispatch(createDiscount({ percentage })).unwrap();
        toast.success("Discount added successfully!", {
          position: "top-right",
        });
      }

      setPercentage("");
      handleClose(); // Close the modal
    } catch (error) {
      toast.error("Failed to save discount. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <GenericInput
          name="percentage"
          label="Discount Percentage"
          type="number"
          value={percentage}
          onChange={(val) => setPercentage(val)}
        />
        <Button
          variant="contained"
          label={initialData ? "Update Discount" : "Add Discount"}
          size="md"
          isDisabled={false}
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
        />
      </form>
    </>
  );
};

export default AddDiscount;
