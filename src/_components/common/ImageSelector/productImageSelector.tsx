import React, { useState } from "react";
import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { ThreeDots } from "react-loader-spinner";
import { uploadImage } from "../../../redux/slices/categoriesSlice";
import { toast } from "react-toastify";

interface ProductImageUploaderProps {
  selectedImage: string;
  height?: number;
  width?: number;
  onImageChange: (imageUrl: string) => void;
  setIsImageUploading?: (isUploading: boolean) => void;
}
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  selectedImage,
  height,
  width,
  onImageChange,
  setIsImageUploading,
}) => {
  const [uploading, setUploading] = useState(false);
  const dispatch: any = useDispatch();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    const file = event.target.files?.[0];
    if (file) {
      // Check file size before uploading
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image is too large. Please upload an image under 1024KB.");
        fileInput.value = "";
        return;
      }

      setUploading(true);
      if (setIsImageUploading) setIsImageUploading(true);

      try {
        const formData = new FormData();
        formData.append("image", file);
        const imageUrl = await dispatch(uploadImage(formData)).unwrap();

        onImageChange(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        fileInput.value = "";
      } finally {
        if (setIsImageUploading) {
          setIsImageUploading(false);
        }
        setUploading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Product Image */}
        <Button
          sx={{
            height: height || 180,
            width: width || 160,
            textAlign: "center",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
            border: "2px dashed #ddd",
            backgroundColor: "#f9f9f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="label"
          disabled={uploading}
        >
          {selectedImage ? (
            <Avatar
              alt="Product image"
              src={selectedImage}
              variant="rounded"
              sx={{
                height: height || 180,
                width: width || 160,
                opacity: uploading ? 0.5 : 1,
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#aaa",
              }}
            >
              <PhotoCamera fontSize="large" />
              <Typography variant="caption">Upload Image</Typography>
            </Box>
          )}

          {uploading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Typography variant="caption">Uploading</Typography>
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  visible
                />
              </Box>
            </Box>
          )}
          <input
            type="file"
           accept="image/png, image/jpg, image/jpeg, image/webp"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {/* Edit Button */}
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: 0.5,
            boxShadow: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          disabled={uploading}
        >
          <EditIcon fontSize="small" />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
      </Box>
      <Typography variant="caption" color="textSecondary" mt={1}>
        Accepted formats: PNG, JPG, JPEG,webp
      </Typography>
    </Box>
  );
};

export default ProductImageUploader;
