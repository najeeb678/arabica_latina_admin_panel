import GenericInput from "@/_components/common/InputField/GenericInput";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDiscount = () => {
  const [percentage, setPercentage] = useState("");
  const dispatch = useDispatch();

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
      //   await dispatch(addDiscount({ percentage }));
      toast.success("Discount added successfully!", { position: "top-right" });
      setPercentage("");
    } catch (error) {
      toast.error("Failed to add discount. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
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
        name="description"
        label="Description"
        type="number"
        value={percentage}
        onChange={(val) => setPercentage(val)}
        placeholder="Enter discount percentage"
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add Discount
      </button>
    </form>
  );
};

export default AddDiscount;
