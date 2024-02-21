"use client";
import React, { useState } from "react";
import Topbar from "./Topbar";
import CreateBoardModal from "./CreateBoardModal";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import NoBoards from "./NoBoards";
import { OpenInNew } from "@mui/icons-material";
import BoardCard from "./BoardCard";

const Boards = () => {
  const [showModal, setShowModal] = useState(false);
  const boardObj = {
    name: "Todo Board",
    createdAt: "09/05/2024",
  };

  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
      {/* <NoBoards /> */}
      <Stack px={3} mt={5}>
        <Grid container spacing={4}>
          <BoardCard board={boardObj} />
          <BoardCard board={boardObj} />
          <BoardCard board={boardObj} />
        </Grid>
      </Stack>
    </>
  );
};

export default Boards;
