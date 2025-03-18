import { useState, useEffect } from "react";
import { fetchJobApplications, fetchUsers, fetchJobs, updateJobApplicationStatus } from "../services/jobApplicationService";
import { message } from "antd";

export const useJobApplications = (initialPage = 1, initialPageSize = 10) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: initialPage, pageSize: initialPageSize, total: 0 });

  useEffect(() => {
    loadJobApplications(pagination.current, pagination.pageSize);
    loadUsers();
    loadJobs();
  }, [pagination.current, pagination.pageSize]);

  const loadJobApplications = async (page, pageSize) => {
    setLoading(true);
    try {
      const data = await fetchJobApplications(page, pageSize);
      setJobApplications(data.content || []);
      setPagination((prev) => ({ ...prev, total: data.totalElements }));
    } catch {
      message.error("Failed to fetch job applications.");
      setJobApplications([]);
    }
    setLoading(false);
  };

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      message.error("Failed to fetch users.");
    }
  };

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch {
      message.error("Failed to fetch jobs.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobApplicationStatus(id, newStatus);
      message.success(`Job application ${newStatus.toLowerCase()} successfully.`);
      loadJobApplications(pagination.current, pagination.pageSize);
    } catch {
      message.error(`Failed to update job application status to ${newStatus}.`);
    }
  };

  return { jobApplications, users, jobs, loading, pagination, setPagination, handleStatusChange };
};
