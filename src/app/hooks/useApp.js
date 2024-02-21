"use client";
import { db } from "@/firebase";
import useStore from "@/store";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const useApp = () => {
  const { setBoards, addBoard } = useStore();
  const uid = JSON.parse(secureLocalStorage.getItem("Me"));

  const boardsColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async (name, color) => {
    try {
      await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({ name, color, createdAt: new Date().toLocaleString("en-US") });
      toast.success("Board Created Successfully!");
    } catch (error) {
      console.log("error:", error);
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

  return {
    createBoard,
    fetchBoards,
  };
};

export default useApp;
