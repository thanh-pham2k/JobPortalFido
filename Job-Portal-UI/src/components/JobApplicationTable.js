import { Table, Button } from "antd";

const JobApplicationTable = ({ jobApplications, loading, pagination, onPageChange, onStatusChange }) => {
  const columns = [
    { title: "Application ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: ["user", "name"], key: "user.name", render: (text) => text || "Unknown" },
    { title: "Job", dataIndex: ["job", "title"], key: "job.title", render: (text) => text || "Unknown" },
    { title: "Company", dataIndex: ["job", "company", "name"], key: "job.company.name", render: (text) => text || "Unknown" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Applied At", dataIndex: "appliedAt", key: "appliedAt" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => onStatusChange(record.id, "ACCEPTED")} style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button onClick={() => onStatusChange(record.id, "REJECTED")} danger>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobApplications || []}
      rowKey="id"
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        onChange: onPageChange,
      }}
    />
  );
};

export default JobApplicationTable;
