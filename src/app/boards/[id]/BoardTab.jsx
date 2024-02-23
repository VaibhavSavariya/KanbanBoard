import { Add } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import StrictModeDroppable from "@/app/components/layout/StrictModeDroppable";

const BoardTab = ({ tab, tasks, name, addTask, removeTask }) => {
  return (
    <>
      <StrictModeDroppable droppableId={tab}>
        {(provided) => (
          <Grid
            {...provided.droppableProps}
            ref={provided.innerRef}
            item
            sm={4}
            xs={12}
          >
            <Stack p={3} bgcolor={"black"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="h6">{name}</Typography>
                <IconButton onClick={() => addTask(tab)} size="small">
                  <Add fontSize="small" />
                </IconButton>
              </Stack>
              <Stack mt={2} spacing={2}>
                {tasks?.map((task, index) => (
                  <Task
                    removeTask={() => removeTask(tab, task?.id)}
                    key={task?.id}
                    task={task}
                    index={index}
                  />
                ))}
              </Stack>
              {provided.placeholder}
            </Stack>
          </Grid>
        )}
      </StrictModeDroppable>
    </>
  );
};

export default memo(BoardTab);
