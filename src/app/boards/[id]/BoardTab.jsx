import { Add } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import Task from "./Task";

const BoardTab = ({ tab, tasks, name, addTask, removeTask }) => {
  return (
    <>
      <Grid item xs={4}>
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
            {tasks?.map((task) => (
              <Task
                removeTask={() => removeTask(tab, task?.id)}
                key={task?.id}
                task={task}
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default memo(BoardTab);
