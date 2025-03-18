import { Card, List, Button } from "antd";
import { Link } from "react-router-dom";

const JobList = ({ jobs, isAuthenticated, user, setUser, handleApply }) => {
  const handleButtonClick = async (jobId) => {
    const updatedUser = await handleApply(localStorage.getItem("email"), jobId);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={jobs?.content}
      renderItem={(job) => (
        <Card
          title={<Link to={`/jobs/${job.id}`}>{job.title}</Link>}
          extra={
            isAuthenticated &&
            !user?.jobApplications?.some((ja) => ja?.job?.id === job?.id) && (
              <Button type="primary" onClick={() => handleButtonClick(job.id)}>Apply</Button>
            )
          }
        >
          <p><strong>Company:</strong> {job.company?.name}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salaryRange}</p>
        </Card>
      )}
    />
  );
};

export default JobList;

