import { axiosClient } from "../axios";
// All Endpoints.

// export const mockableGetUrl = () => {
//   return axiosClient.get(`https://jsonplaceholder.typicode.com/users`);
// };
export const createBoard = (data) => {
  return axiosClient.post(`/boards/createBoard`, data);
};
export const getBoards = () => {
  return axiosClient.get(`/boards/getBoards`);
};
export const getBoardById = (id) => {
  return axiosClient.get(`/boards/getBoardById/${id}`);
};
export const deleteBoard = (id) => {
  return axiosClient.delete(`/boards/deleteBoard/${id}`);
};
export const updateBoard = (id, data) => {
  return axiosClient.put(`/boards/updateBoard/${id}`, data);
};

const boardsAPI = {
  createBoard,
  getBoards,
  getBoardById,
  deleteBoard,
  updateBoard,
};
export default boardsAPI;
