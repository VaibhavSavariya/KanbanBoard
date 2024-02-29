"use client";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import boardsAPI from "../axios/services/boards";
import moment from "moment";

const useApp = () => {
  const { boards, setBoards, addBoard } = useStore();
  const router = useRouter();
  const uid = JSON.parse(secureLocalStorage.getItem("Me"));

  const createBoard = async (name, color) => {
    try {
      const create = await boardsAPI.createBoard({
        name,
        color,
        userRef: uid,
      });
      addBoard(create?.data?.board);
      toast.success("Board Created Successfully!");
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    try {
      await boardsAPI.updateBoard(boardId, {
        tabs,
        updatedAt: moment(),
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const fetchBoard = async (boardId) => {
    try {
      const res = await boardsAPI.getBoardById(boardId);
      if (res.status === 200) {
        return res.data?.boardById;
      }
    } catch (error) {
      toast.error("Error fetching board data");

      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const res = await fetch(
        "https://kanban-board-ten-blond.vercel.app/api/boards/getBoards",
        {
          next: { revalidate: 0 },
        }
      );
      const data = await res.json();
      setBoards(data?.boards);
    } catch (error) {
      toast.error("Error fetching boards");
      console.log("error:", error);
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await boardsAPI.deleteBoard(boardId);
      const tBoards = boards.filter((board) => board?._id !== boardId);
      setBoards(tBoards);
      router.push("/boards");
      toast.success("Board deleted successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  return {
    createBoard,
    fetchBoards,
    fetchBoard,
    updateBoardData,
    deleteBoard,
  };
};

export default useApp;
