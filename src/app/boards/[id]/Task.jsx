import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, removeTask }) => {
  return (
    <>
      <Draggable draggableId={task?.id} index={index}>
        {(provided) => (
          <Stack
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
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
        )}
      </Draggable>
    </>
  );
};

export default Task;
