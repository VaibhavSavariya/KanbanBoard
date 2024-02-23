import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const Task = ({ task, removeTask }) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          width={"100%"}
          p={1}
          border={"1px solid"}
          borderColor={"#777980"}
          bgcolor={"#45474E"}
        >
          {task?.taskName}
        </Typography>
        <IconButton onClick={removeTask}>
          <Delete />
        </IconButton>
      </Stack>
    </>
  );
};

export default Task;
