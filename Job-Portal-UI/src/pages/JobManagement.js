import React, { useState } from "react";
import { Button } from "antd";
import { useJobs } from "../hooks/useJobs";
import JobTable from "../components/JobTable";
import JobForm from "../components/JobForm";
import { useJobsManagement } from "../hooks/useJobsManagement";

const JobManagement = () => {
  const { jobs,setJobs, loading, handleDelete, handleSave } = useJobsManagement();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleEdit = (record) => {
    setEditingJob(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingJob(null);
    setIsModalVisible(true);
  };

  return (
    <>
      <h1>Job Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Job
      </Button>
      <JobTable jobs={jobs} setJobs = {setJobs} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      <JobForm visible={isModalVisible} setVisible = {setIsModalVisible}  onCancel={() => setIsModalVisible(false)} onSave={handleSave} setJobs = {setJobs} job={editingJob} />
    </>
  );
};

export default JobManagement;
