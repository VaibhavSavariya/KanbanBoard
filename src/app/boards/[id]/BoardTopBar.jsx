import { colors } from "@/theme";
import { ArrowBackSharp, Delete } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";

const BoardTopBar = ({ router, currentBoard, lastUpdated }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            borderBottom: "5px solid",
            borderColor: colors[currentBoard?.color],
          }}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <IconButton onClick={() => router.back()}>
              <ArrowBackSharp />
            </IconButton>
            <Typography variant="h5">{currentBoard?.name}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="body2">
              {" "}
              Last Updated : {lastUpdated}
            </Typography>
            <IconButton>
              <Delete />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default BoardTopBar;
