import { create } from "zustand";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  setLoginState: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
      },
      false,
      "setLoginState"
    ),
});
const useStore = create(devtools(store));
export default useStore;
