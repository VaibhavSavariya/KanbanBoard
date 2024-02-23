import ModalHeader from "@/app/components/layout/ModalHeader";
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

          <Button
            onClick={() => addTask(taskName)}
            disabled={taskName?.length < 3 || addTaskLoading}
            size="large"
            variant="contained"
          >
            Add task
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
