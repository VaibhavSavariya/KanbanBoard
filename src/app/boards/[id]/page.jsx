"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopBar from "./BoardTopBar";
import { useRouter } from "next/navigation";
import BoardInterface from "./BoardInterface";
import useStore from "@/store";
import useApp from "@/app/hooks/useApp";
import AppLoader from "@/app/components/layout/loader/AppLoader";
import AlertDialogSlide from "./AlertModal";
import moment from "moment";

const BoardId = ({ params }) => {
  const router = useRouter();
  const { boards, areBoardsFetched } = useStore();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { fetchBoard, deleteBoard } = useApp();
  const currentBoard = useMemo(
    () => boards?.find((board) => board?._id === params?.id),
    []
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const boardData = useMemo(() => data, [data]);
  const handleUpdateLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-Us")),
    []
  );
  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(params?.id);
      if (boardData) {
        const { updatedAt, tabs } = boardData;
        setData(tabs);
        setLastUpdated(moment(updatedAt).format("lll"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteBoard(params?.id);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !currentBoard) {
      router.push("/boards");
    } else {
      handleFetchBoard();
    }
  }, []);
  return (
    <>
      {open && (
        <AlertDialogSlide
          onClose={handleClose}
          onDelete={handleDelete}
          open={open}
        />
      )}
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <BoardTopBar
            openAlert={() => setOpen(true)}
            router={router}
            currentBoard={currentBoard}
            lastUpdated={lastUpdated}
          />
          <BoardInterface
            updateLastUpdated={handleUpdateLastUpdated}
            tabsData={boardData}
            boardId={params?.id}
          />
        </>
      )}
    </>
  );
};

export default BoardId;
