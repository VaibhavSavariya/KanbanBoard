"use client";
import { db } from "@/firebase";
import useStore from "@/store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import boardsAPI from "../axios/services/boards";

const useApp = () => {
  const { boards, setBoards, addBoard } = useStore();
  const router = useRouter();
  const uid = JSON.parse(secureLocalStorage.getItem("Me"));
  const boardsColRef = collection(db, `users/${uid}/boards`);

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
      // toast.error("Error creating board data");
      throw error;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const DocRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(DocRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      toast.error("Error updating board data");
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
      const res = await boardsAPI.getBoards();
      console.log("res:", res);
      setBoards(res?.data?.boards);
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
      const DocRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await deleteDoc(DocRef);
      const tBoards = boards.filter((board) => board?.id !== boardId);
      setBoards(tBoards);
      router.push("/boards");
    } catch (error) {
      toast.error("Error deleting board data");
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
