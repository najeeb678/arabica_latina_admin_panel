import React, { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  PhotoCamera,
  Edit as EditIcon,
  Save,
  Cancel,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/slices/categoriesSlice"; 
import { addHeroImages, getHeroImages } from "../../redux/slices/productsSlice"; 
import { toast } from "react-toastify";

const HeroImageUploader: React.FC = () => {
  const dispatch: any = useDispatch();

  const [images, setImages] = useState<{ [key: string]: string }>({
    pic1: "",
    pic2: "",
    pic3: "",
  });

  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({
    pic1: false,
    pic2: false,
    pic3: false,
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading((prev) => ({ ...prev, [key]: true }));
      try {
        const formData = new FormData();
        formData.append("image", file);
        const imageUrl = await dispatch(uploadImage(formData)).unwrap();

        setImages((prev) => ({ ...prev, [key]: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading((prev) => ({ ...prev, [key]: false }));
      }
    }
  };

  const handleSave = async () => {
    try {
      //   await dispatch(saveImages(images)).unwrap();
      toast.success("Images saved successfully!");
    } catch (error) {
      console.error("Error saving images:", error);
      toast.error("Failed to save images.");
    }
  };

  return (
    <Box textAlign="center">
      {/* Image Upload Section */}
      <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
        {Object.keys(images).map((key, index) => (
          <Box key={key} sx={{ position: "relative", textAlign: "center" }}>
            <Button
              sx={{
                width: 280,
                height: 450,
                borderRadius: "12px",
                border: "2px dashed #ddd",
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
              component="label"
            >
              {uploading[key] ? (
                <CircularProgress />
              ) : images[key] ? (
                <Avatar
                  alt={key}
                  src={images[key]}
                  variant="rounded"
                  sx={{ width: 280, height: 450, borderRadius: "12px" }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#aaa",
                    gap: "10px",
                  }}
                >
                  <PhotoCamera fontSize="large" />
                  <Typography variant="caption">
                    Upload Image{" "}
                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {index + 1}
                    </span>
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                hidden
                onChange={(e) => handleImageChange(e, key)}
              />
            </Button>

            {/* Edit Icon */}
            {images[key] && !uploading[key] && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  boxShadow: 2,
                }}
                component="label"
              >
                <EditIcon fontSize="small" />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  hidden
                  onChange={(e) => handleImageChange(e, key)}
                />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      {/* Buttons */}
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          type="submit"
          variant="contained"
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
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
              transform: "scale(1.005)",
            },
          }}
          startIcon={<Save />}
          onClick={handleSave}
          disabled={Object.values(uploading).some((val) => val)}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "13px !important",
            fontWeight: "400 !important",
            borderRadius: "50px !important",
            borderColor: "#FBC02D !important",
            color: "#FBC02D !important",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "#FBC02D !important",
              backgroundColor: "#FBC02D !important",
              color: "white !important",
            },
          }}
          startIcon={<Cancel />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default HeroImageUploader;
