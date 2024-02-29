import ModalHeader from "@/app/components/layout/ModalHeader";
import { AddTask, Task } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AddTaskModal = ({ tabName, onClose, addTask, addTaskLoading }) => {
  const [taskName, setTaskName] = useState("");
  return (
    <>
      <Dialog open fullWidth maxWidth="xs">
        <Stack p={2}>
          <ModalHeader title={`Add "${tabName}" Task `} onClose={onClose} />
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            mt={3}
            mb={-3}
          >
            <Typography>Status:</Typography>
            <Chip size="small" label={tabName} />
          </Stack>
          <Stack my={5} spacing={3}>
            <TextField
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              label="Task Name"
            />
          </Stack>

          <LoadingButton
            disabled={taskName?.length < 3}
            loading={addTaskLoading}
            loadingPosition="start"
            onClick={() => addTask(taskName)}
            startIcon={<AddTask />}
            variant="contained"
            size="large"
          >
            Add task
          </LoadingButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
