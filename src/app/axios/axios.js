import { getAccessToken } from "@/helpers/getAccessToken";
import axios from "axios";
import toast from "react-hot-toast";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = `http://localhost:3000/api`;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.interceptors.request.use((config) => {
  if (config.url !== "/users/login") {
    const jwt = getAccessToken()?.id || "";
    if (jwt) {
      config.headers.common["Authorization"] = `Bearer ${jwt}`;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response)
      if (!navigator.onLine) {
        toast.error("You are currently offline");
        return Promise.reject(error);
      } else {
        toast.error("APIs not working at the moment. Pleas try again later.");
        return Promise.reject(error);
      }
    return Promise.reject(error);
  }
);
