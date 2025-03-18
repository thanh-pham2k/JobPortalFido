import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const fetchJobs = async () => {//pageable
  const { data } = await api.get("/jobs");
  return data;
};

export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};

export const updateJob = async (id, jobData) => {
  await api.put(`/jobs/${id}`, jobData);
};

export const createJob = async (jobData) => {
  jobData.company = jobData.company;
  await api.post("/jobs", jobData);
};

export const fetchJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};


export const searchJobs = async (filters) => {
  const response = await api.get("/jobs/search", { params: filters });
  return response.data;
};

