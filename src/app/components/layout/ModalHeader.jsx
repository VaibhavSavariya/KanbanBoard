import { Close } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const ModalHeader = ({ title, onClose }) => {
  return (
    <>
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Stack>
    </>
  );
};

export default ModalHeader;
