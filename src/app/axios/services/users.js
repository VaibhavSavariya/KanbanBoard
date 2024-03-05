import { axiosClient } from "../axios";
// All Endpoints.

// export const mockableGetUrl = () => {
//   return axiosClient.get(`https://jsonplaceholder.typicode.com/users`);
// };
export const registerUser = (data) => {
  return axiosClient.post(`/users/register`, data);
};
export const loginUser = (data) => {
  return axiosClient.post(`/users/login`, data, {
    withCredentials: true,
  });
};
export const getUser = (id) => {
  return axiosClient.get(`/user/${id}`);
};
export const loginWithGoogle = (data) => {
  return axiosClient.post(`/auth/google`, data);
};
export const signOut = () => {
  return axiosClient.get(`/users/logout`);
};
export const verifyEmail = (uniqueString) => {
  return axiosClient.post(`/users/verifyEmail`, uniqueString);
};

const users = {
  registerUser,
  loginUser,
  getUser,
  loginWithGoogle,
  signOut,
  verifyEmail,
};
export default users;
