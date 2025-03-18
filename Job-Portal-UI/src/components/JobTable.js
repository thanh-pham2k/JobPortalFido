import { Table, Button } from "antd";
import { fetchJobs } from "../services/apiService";

const JobTable = ({ jobs, setJobs, loading, onEdit, onDelete }) => {
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
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => onDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];
  const handlePageChange = async (page, pageSize) => {
    const jobs = await fetchJobs(page, pageSize);
    setJobs(jobs);
  };
  return (
    <Table
      columns={columns}
      dataSource={jobs?.content}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        total: jobs?.totalElements,
        onChange: handlePageChange,
      }}
    />
  );
};

export default JobTable;

