import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ onClose, onDelete, open }) {
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            // sx={{
            //   backgroundColor: "rgba(232, 90, 79, 0.5)",
            //   color: "white",
            //   padding: "15px",
            //   fontWeight: "600",
            // }}
            id="alert-dialog-slide-description"
          >
            Are you sure you want to delete this board?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#E85A4F",
              color: "white",
            }}
            variant="contained"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
