import React from "react";
import { useJobApplications } from "../hooks/useJobApplications";
import JobApplicationTable from "../components/JobApplicationTable";

const JobApplicationManagement = () => {
  const { jobApplications, loading, pagination, setPagination, handleStatusChange } = useJobApplications();

  const handlePageChange = (current, pageSize) => {
    setPagination((prev) => ({ ...prev, current, pageSize }));
  };

  return (
    <>
      <h1>Job Application Management</h1>
      <JobApplicationTable
        jobApplications={jobApplications}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

export default JobApplicationManagement;
