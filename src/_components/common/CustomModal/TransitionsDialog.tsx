import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// Define props for the component
interface TransitionsDialogProps {
  heading: string;
  description: string;
  open: boolean;
  cancel: () => void;
  proceed: () => void;
}

// Define the Transition component with proper types
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionsDialog: React.FC<TransitionsDialogProps> = ({
  heading,
  description,
  open,
  cancel,
  proceed,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={cancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="bg-black">
        <DialogTitle
          sx={{ color: "#161616", fontFamily: "Avenir", fontWeight: "400" }}
        >
          {heading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "#161616", fontWeight: "300" }}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#fbc02d" }} onClick={cancel}>
            Disagree
          </Button>
          <Button sx={{ color: "#fbc02d" }} onClick={proceed}>
            Agree
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default TransitionsDialog;
