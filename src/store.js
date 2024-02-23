import { create } from "zustand";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardsFetched: false,
  setLoginState: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLoginState"
    ),
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, "setBoards"),
  addBoard: (board) =>
    set(({ boards }) => ({ boards: [board, ...boards] }), false, "addBoard"),
});
const useStore = create(devtools(store));
export default useStore;
