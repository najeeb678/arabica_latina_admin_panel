import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomTypography from "../CustomTypography/CustomTypography";

const BootstrapDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "modalWidth", // Avoid passing modalWidth to the DOM
})<{ modalWidth?: string }>(({ theme, modalWidth = "70%" }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    width: `${modalWidth} !important`, // Use modalWidth prop dynamically
  },
}));
interface BootstrapDialogTitleProps {
  children: React.ReactNode;
  onClose: () => void;
  id?: string;
  titleStyle?: React.CSSProperties;
}

const BootstrapDialogTitle: React.FC<BootstrapDialogTitleProps> = ({
  children,
  onClose,
  titleStyle,
  ...other
}) => (
  <DialogTitle sx={{ m: 0, p: 2.5 }} {...other}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CustomTypography
        sx={{
          color: "black",
          fontWeight: 400,
          fontSize: "14px",
          flexGrow: 1,
          ...titleStyle,
        }}
      >
        {children}
      </CustomTypography>
      {onClose && (
        <IconButton
          aria-label="close modal"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,

            right: 12,
            color: "#fbc02d",
          }}
        >
          <CloseIcon sx={{ fontSize: "18px", fontWeight: "800" }} />
        </IconButton>
      )}
    </div>
  </DialogTitle>
);

interface CustomizationDialogProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  handleClose: () => void;
  isFooter?: boolean;
  customStyles?: React.CSSProperties;
  fullWidth?: boolean;
  disableBackdropClose?: boolean;
  modalWidth?: string;
  titleStyle?: React.CSSProperties;
}

const CustomModal: React.FC<CustomizationDialogProps> = ({
  children,
  open,
  title,
  handleClose,
  titleStyle,
  isFooter = false,
  customStyles = {},
  fullWidth = false,
  disableBackdropClose = false,
  modalWidth = "70%", // Default modal width
}) => {
  return (
    <BootstrapDialog
      onClose={disableBackdropClose ? undefined : handleClose} // Adjusting based on the flag
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={fullWidth}
      maxWidth="xl"
      modalWidth={modalWidth}
      sx={{
        overflowY: "hidden",
        ...customStyles,
      }}
      BackdropProps={{
        onClick: disableBackdropClose ? (e) => e.stopPropagation() : undefined,
        style: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
      }}
    >
      <div
        style={{
          ...customStyles, // Ensure that customStyles width is respected here as well
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          titleStyle={titleStyle}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ maxHeight: "80vh", overflowY: "auto" }}>
          {children}
        </DialogContent>

        {isFooter && (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        )}
      </div>
    </BootstrapDialog>
  );
};

export default CustomModal;
