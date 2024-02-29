"use client";
import React, { memo, useEffect, useState } from "react";
import Topbar from "./Topbar";
import CreateBoardModal from "./CreateBoardModal";
import { Grid, Stack } from "@mui/material";
import BoardCard from "./BoardCard";
import useStore from "@/store";
import useApp from "../hooks/useApp";
import NoBoards from "./NoBoards";
import AppLoader from "../components/layout/loader/AppLoader";
import { useRouter } from "next/navigation";

export const revalidate = 0;
const Boards = () => {
  const { boards, areBoardsFetched } = useStore();
  const router = useRouter();
  const { fetchBoards } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <AppLoader />
      ) : (
        <>
          <Stack px={3} mt={5}>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              {boards.map((board, index) => (
                <>
                  <BoardCard board={board} key={board?._id} router={router} />
                </>
              ))}
            </Grid>
          </Stack>
        </>
      )}
    </>
  );
};

export default memo(Boards);
