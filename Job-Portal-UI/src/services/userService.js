import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return Array.isArray(data) ? data : [];
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

export const updateUser = async (id, userData) => {
  await api.put(`/users/${id}`, userData);
};

export const createUser = async (userData) => {
  await api.post("/users", userData);
};
