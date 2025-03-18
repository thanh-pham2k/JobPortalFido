import { useState, useEffect } from "react";
import { fetchJobs, deleteJob, updateJob, createJob } from "../services/jobService";
import { message } from "antd";





export const useJobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const jobData = await fetchJobs();
      setJobs(jobData);
    } catch {
      message.error("Failed to fetch jobs.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      message.success("Job deleted successfully.");
      loadJobs();
    } catch {
      message.error("Failed to delete job.");
    }
  };

  const handleSave = async (id, values, isEditing) => {
    try {
      if (isEditing) {
        await updateJob(id, values);
      } else {
        await createJob(values);
      }
      message.success("Job saved successfully.");
      loadJobs();
    } catch {
      message.error("Failed to save job.");
    }
  };

  return { jobs,setJobs, loading, handleDelete, handleSave };
};
