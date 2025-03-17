import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GlassContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/jobs/${id}`).then((response) => {
            setJob(response.data);
        });
    }, [id]);

    if (!job) return <p>Loading...</p>;

    return (
        <GlassContainer>
            <Card title={job.title}>
                <p><strong>Company:</strong> {job.company.name}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salaryRange}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <Button type="primary">Apply Now</Button>
            </Card>
        </GlassContainer>
    );
};

export default JobDetails;
