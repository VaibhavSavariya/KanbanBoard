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

const useApp = () => {
  const { boards, setBoards, addBoard } = useStore();
  const router = useRouter();
  const uid = JSON.parse(secureLocalStorage.getItem("Me"));

  const boardsColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async (name, color) => {
    try {
      const doc = await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc?.id,
      });
      toast.success("Board Created Successfully!");
    } catch (error) {
      toast.error("Error creating board data");
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
    const DocRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const res = await getDoc(DocRef);
      if (res.exists) {
        return res.data();
      }
    } catch (error) {
      toast.error("Error fetching board data");
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));

      setBoards(boards);
    } catch (err) {
      toast.error("Error fetching boards");
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
