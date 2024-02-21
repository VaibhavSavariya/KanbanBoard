"use client";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../components/layout/ModalHeader";
import { colors } from "@/theme";

const CreateBoardModal = ({ onClose }) => {
  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState(0);
  return (
    <>
      <Dialog open fullWidth maxWidth="xs">
        <Stack p={2}>
          <ModalHeader title={"Create Board"} onClose={onClose} />
          <Stack my={5} spacing={3}>
            <TextField
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              label="Board Name"
            />
            <Stack direction={"row"} spacing={1.5}>
              <Typography>Color:</Typography>

              {colors.map((clr, index) => (
                <Box
                  sx={{
                    cursor: "pointer",
                    border: color === index ? `3px solid #383838` : "none",
                    outline: `3px solid ${clr}`,
                  }}
                  onClick={() => setColor(index)}
                  backgroundColor={clr}
                  height={25}
                  width={25}
                  borderRadius={"50%"}
                  key={index}
                />
              ))}
            </Stack>
          </Stack>
          <Button size="large" variant="contained">
            Create
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateBoardModal;
