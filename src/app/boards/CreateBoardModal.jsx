"use client";
import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../components/layout/ModalHeader";
import { colors } from "@/theme";
import useApp from "../hooks/useApp";
import { LoadingButton } from "@mui/lab";
import { Create } from "@mui/icons-material";

const CreateBoardModal = ({ onClose }) => {
  const { createBoard } = useApp();
  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    setLoading(true);
    try {
      if (boardName?.length > 0) {
        await createBoard(boardName, color);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };
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

          {/* <Button
            disabled={loading || boardName?.length < 3}
            onClick={handleCreate}
            size="large"
            variant="contained"
          >
            Create
          </Button> */}
          <LoadingButton
            disabled={boardName?.length < 3}
            loading={loading}
            loadingPosition="start"
            onClick={handleCreate}
            startIcon={<Create />}
            variant="contained"
            size="large"
          >
            Create
          </LoadingButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateBoardModal;
