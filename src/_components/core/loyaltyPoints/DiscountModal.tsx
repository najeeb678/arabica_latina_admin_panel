import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { createDiscount } from "@/redux/slices/loyaltyPointSlice";
import { useAppDispatch } from "@/utils/hook";
import { ThreeDots } from "react-loader-spinner";

const DiscountModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "VALUE",
    value: "",
  });
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(""); // Reset error when modal closes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "value") {
      setError(""); // Clear error when user types
    }
  };

  const handleSaveChanges = () => {
    setLoading(true);
    const { type, value } = formData;

    if (type && value) {
      const data = { type: type, value: value };
      dispatch(createDiscount(data))
        .unwrap()
        .finally(() => {
          setLoading(false);
          handleClose();
        });
    } else {
      setError("Please fill in Value."); // Set error message
      setLoading(false);
    }
  };

  return (
    <Box marginTop="-28px" display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "178px",
          height: "29px",
          padding: "1.47px 14px",
          gap: "7.35px",
          borderRadius: "50px",
          borderWidth: "1px",
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
          Add Discount
        </CustomTypography>
      </Button>

      <CustomModal
        open={open}
        title="Discount Information"
        handleClose={handleClose}
        modalWidth="50%"
      >
        <Box component="form">
          <TextField
            label="Value"
            variant="outlined"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder="Add Discount"
            error={!!error} // Show error state
            helperText={error} // Display error message
            sx={{
              marginBottom: "16px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                height: "55px",
                "&:hover fieldset": {
                  borderColor: "#D7D7D7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D7D7D7",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#7B7B7B",
                fontSize: "12px",
              },
              "& .MuiInputLabel-root": {
                color: "#B2B2B2", // Default label color
                "&.Mui-focused": {
                  color: "#FBC02D", // Change color when focused
                },
                "&:hover": {
                  color: "#FBC02D", // Change color on hover
                },
              },
            }}
          />
          <Box display="flex" justifyContent="flex-end" marginTop="16px">
            <Button
              variant="contained"
              color="primary"
              sx={{
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
              onClick={handleSaveChanges}
              disabled={!formData.value} // Disable button if value is empty
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

export default DiscountModal;
