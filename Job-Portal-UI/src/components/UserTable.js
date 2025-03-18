import { Table, Button } from "antd";

const UserTable = ({ users, loading, onEdit, onDelete }) => {
  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (text) => text || "No Resume",
    },
    {
      title: "Job Applications",
      key: "jobApplications",
      render: (_, record) => (
        <ul>
          {record.jobApplications?.length > 0 ? (
            record.jobApplications.map((jobApp) => (
              <li key={jobApp.id}>
                {jobApp.job ? `${jobApp?.job?.title} - ${jobApp?.job?.company?.name} - ${jobApp?.status}` : "Unknown Job"}
              </li>
            ))
          ) : (
            <li>No Job Applications</li>
          )}
        </ul>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button onClick={() => onDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />;
};

export default UserTable;
