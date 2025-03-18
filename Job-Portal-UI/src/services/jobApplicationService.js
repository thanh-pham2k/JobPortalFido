import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// Fetch job applications with pagination
export const fetchJobApplications = async (page, pageSize) => {
  const { data } = await api.get(`/job-applications?page=${page - 1}&size=${pageSize}`);
  return data;
};

// Fetch users
export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return Array.isArray(data) ? data : [];
};

// Fetch jobs
export const fetchJobs = async () => {//pageable
  const { data } = await api.get("/jobs");
  return data;
};

// Update job application status
export const updateJobApplicationStatus = async (id, newStatus) => {
  await api.patch(`/job-applications/${id}/status/${newStatus}`);
};
