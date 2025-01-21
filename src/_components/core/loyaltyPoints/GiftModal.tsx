import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { createGiftSlice } from "@/redux/slices/loyaltyPointSlice";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import { ThreeDots } from "react-loader-spinner";

const GiftModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subServiceId: "",
  });
  const [error, setError] = useState("");

  const { subServices } = useAppSelector((state) => state.loyaltyPoints);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(""); // Reset error when modal closes
  };

  const handleSinleSelectChange = (value: any) => {
    setFormData({ ...formData, subServiceId: value?.id });
    if (value?.id) {
      setError(""); // Clear error when a valid selection is made
    }
  };

  const handleSaveChanges = () => {
    setLoading(true);
    const payload = {
      subServiceId: formData.subServiceId,
    };

    if (!formData.subServiceId) {
      setError("Please select a Sub-Service."); // Set error message
      setLoading(false);
      return;
    }

    dispatch(createGiftSlice(payload)).finally(() => {
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Box marginTop="-28px" display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "108px",
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
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          Add a Gift
        </CustomTypography>
      </Button>

      <CustomModal
        open={open}
        title="Gift Information"
        handleClose={handleClose}
        isFooter={false}
        modalWidth="50%"
      >
        <Box component="form">
          <SingleSelect
            title="Sub Service"
            textFieldLabel="Select Sub-Service"
            name="subServiceId"
            data={subServices || []}
            onChange={handleSinleSelectChange}
            value={
              subServices?.find(
                (service) => service.id === formData.subServiceId
              ) || null
            }
            sx={{ height: "48px", borderRadius: "5px", marginBottom: "8px" }}
          />
          {error && (
            <CustomTypography
              sx={{
                color: "red",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              {error}
            </CustomTypography>
          )}
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
                  backgroundColor: "#FBC 02D !important",
                  color: "white !important",
                  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05 )",
                  transform: "scale(1.005)",
                },
              }}
              onClick={handleSaveChanges}
              disabled={!formData.subServiceId} 
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

export default GiftModal;
