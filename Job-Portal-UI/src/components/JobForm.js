import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { fetchJobs } from "../services/apiService";

const JobForm = ({ visible, setVisible, onCancel, onSave, job, setJobs }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (job) {
      form.setFieldsValue(job);
    } else {
      form.resetFields();
    }
  }, [job]);

  const handleFinish = async (values) => {
    onSave(job?.id, values, !!job);
    const jobData = await fetchJobs(1, 10);
    setJobs(jobData);
    setVisible(false);
  };

  return (
    <Modal
      title={job ? "Edit Job" : "Add Job"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Company" rules={[{ required: true, message: "Please enter company" }]}>
          <Form.Item name={["company", "name"]} noStyle rules={[{ required: true, message: "Please enter company name" }]}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select company"
              defaultValue={job ? job.company.name : undefined}
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
  );
};

export default JobForm;

