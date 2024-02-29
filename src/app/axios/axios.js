import axios from "axios";
import { getCookies } from "cookies-next";
import toast from "react-hot-toast";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = `https://kanban-board-ten-blond.vercel.app/api`;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
// axiosClient.interceptors.request.use((config) => {
//   if (config.url !== "/users/login") {
//     const jwt = getCookies("token") || "";
//     if (Object.keys(jwt).length > 0) {
//       config.headers["Authorization"] = `Bearer ${jwt?.token}`;
//     } else {
//       // Token is undefined or null, show error message and cancel the request
//       // toast.error("Token is missing. Please log in.");
//       return Promise.reject(new Error("Token is missing"));
//     }
//   }

//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (!error.response)
//       if (!navigator.onLine) {
//         toast.error("You are currently offline");
//         return Promise.reject(error);
//       } else {
//         toast.error("APIs not working at the moment. Pleas try again later.");
//         return Promise.reject(error);
//       }
//     return Promise.reject(error);
//   }
// );
