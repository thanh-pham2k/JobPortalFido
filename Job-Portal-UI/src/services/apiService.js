import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const fetchJobs = async (page, pageSize) => {//pageable
  const { data } = await api.get(`/jobs?page=${page - 1}&size=${pageSize}`);
  return data;
};

export const checkAuthStatus = async () => {
  const { data } = await api.get("/auth/status");
  return data.authenticated;
};

export const login = async (email) => {
  const { data } = await api.post("/auth/login", { email });
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const applyJob = async (email, jobId) => {
  const { data } = await api.post("/job-applications/apply", null, {
    params: { email, jobId },
  });
  return data;
};

  