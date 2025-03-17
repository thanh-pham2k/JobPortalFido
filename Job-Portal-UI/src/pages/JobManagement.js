import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/jobs");
      const data = Array.isArray(response.data.content) ? response.data.content : [];
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingJob(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingJob(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      if (editingJob) {
        await axios.put(`http://localhost:8080/api/jobs/${editingJob.id}`, values);
      } else {
        values["company"] = {name: values.company}
        await axios.post("http://localhost:8080/api/jobs", values);
      }
      setIsModalVisible(false);
      fetchJobs();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const columns = [
    { title: "Job ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Company", dataIndex: ["company", "name"], key: "company.name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Job Type", dataIndex: "jobType", key: "jobType" },
    { title: "Salary Range", dataIndex: "salaryRange", key: "salaryRange" },
    { title: "Posted By", dataIndex: "postedBy", key: "postedBy" },
    { title: "Posted Date", dataIndex: "postedDate", key: "postedDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Job
      </Button>
      <Table
        columns={columns}
        dataSource={jobs || []}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingJob ? "Edit Job" : "Add Job"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description" }]}>
            <Input />
          </Form.Item>

          
          <Form.Item
            label="Company"
            rules={[{ required: true, message: "Please enter company" }]}
          >
            <Form.Item
              name={["company", "name"]}
              noStyle
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select company"
                defaultValue={editingJob ? editingJob.company.name : undefined}
                options={[
                  { value: "Google", label: "Google" },
                  { value: "Facebook", label: "Facebook" },
                  { value: "Amazon", label: "Amazon" },
                ]}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Please enter location" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jobType" label="Job Type" rules={[{ required: true, message: "Please enter job type" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="salaryRange" label="Salary Range" rules={[{ required: true, message: "Please enter salary range" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="postedBy" label="Posted By" rules={[{ required: true, message: "Please enter posted by" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="postedDate" label="Posted Date" rules={[{ required: true, message: "Please enter posted date" }]} initialValue={new Date().toISOString()}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default JobManagement;