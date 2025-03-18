import { useState, useEffect } from "react";
import { fetchJobs, applyJob } from "../services/apiService";
import { message } from "antd";

export const useJobs = (currentPage = 1, pageSize = 10) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs(currentPage, pageSize);
  }, [currentPage]);

  const loadJobs = async (page, size) => {
    setLoading(true);
    try {
      const jobData = await fetchJobs(page, size);
      setJobs(jobData);
    } catch {
      message.error("Failed to fetch jobs.");
      setJobs([]);
    }
    setLoading(false);
  };

  const handleApply = async (email, jobId) => {
    try {
      const updatedUser = await applyJob(email, jobId);
      return updatedUser;
    } catch {
      throw new Error("Application failed");
    }
  };

  return { jobs, setJobs, loading, handleApply };
};
