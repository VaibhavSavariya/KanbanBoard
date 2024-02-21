"use client";
import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import CreateBoardModal from "./CreateBoardModal";
import { Grid, Stack } from "@mui/material";
import BoardCard from "./BoardCard";
import useStore from "@/store";
import useApp from "../hooks/useApp";
import NoBoards from "./NoBoards";
import Loader from "../components/layout/loader/Loader";

const Boards = () => {
  const { boards, areBoardsFetched } = useStore();
  console.log("boards:", boards);
  const { fetchBoards } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const boardObj = {
    name: "Todo Board",
    createdAt: "09/05/2024",
  };

  useEffect(() => {
    if (!areBoardsFetched) {
      fetchBoards(setLoading);
    } else setLoading(false);
  }, []);

  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
      {boards?.length === 0 && !loading && <NoBoards />}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Stack px={3} mt={5}>
            <Grid container spacing={4}>
              {boards.map((board, index) => (
                <>
                  <BoardCard board={board} key={board?.id} />
                </>
              ))}
            </Grid>
          </Stack>
        </>
      )}
    </>
  );
};

export default Boards;
