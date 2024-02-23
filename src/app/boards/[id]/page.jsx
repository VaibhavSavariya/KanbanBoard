"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopBar from "./BoardTopBar";
import { useRouter } from "next/navigation";
import BoardInterface from "./BoardInterface";
import useStore from "@/store";
import useApp from "@/app/hooks/useApp";
import Loader from "@/app/components/layout/loader/Loader";

const BoardId = ({ params }) => {
  const router = useRouter();
  const { boards, areBoardsFetched } = useStore();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { fetchBoard } = useApp();
  const currentBoard = useMemo(
    () => boards?.find((board) => board?.id === params?.id),
    []
  );
  const [loading, setLoading] = useState(true);
  const boardData = useMemo(() => data, [data]);
  const handleUpdateLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-Us")),
    []
  );
  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(params?.id);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        console.log("lastUpdated:", lastUpdated);
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <BoardTopBar
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
