import { Card, Input, List, Pagination } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GlassContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  margin: auto;
`;

const StyledInput = styled(Input)`
  width: 300px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.88) !important;
  border: 1px solid rgba(0, 0, 0, 0.88) !important;
`;

const jobs = [
    { id: 1, title: "Software Engineer", company: { name: "Google" }, location: "New York", salaryRange: "$100,000 - $200,000" },
    { id: 2, title: "Data Scientist", company: { name: "Amazon" }, location: "Seattle", salaryRange: "$150,000 - $300,000" },
    { id: 3, title: "Product Manager", company: { name: "Facebook" }, location: "San Francisco", salaryRange: "$120,000 - $240,000" },
    { id: 4, title: "UX Designer", company: { name: "Microsoft" }, location: "Redmond", salaryRange: "$90,000 - $180,000" },
    { id: 5, title: "DevOps Engineer", company: { name: "Netflix" }, location: "Los Angeles", salaryRange: "$110,000 - $220,000" },
    { id: 6, title: "Security Analyst", company: { name: "IBM" }, location: "Austin", salaryRange: "$95,000 - $190,000" },
    { id: 7, title: "Systems Administrator", company: { name: "Dell" }, location: "Round Rock", salaryRange: "$85,000 - $170,000" },
    { id: 8, title: "Mobile Developer", company: { name: "Snapchat" }, location: "Venice", salaryRange: "$105,000 - $210,000" },
    { id: 9, title: "AI Researcher", company: { name: "OpenAI" }, location: "Palo Alto", salaryRange: "$130,000 - $260,000" },
    { id: 10, title: "Cloud Engineer", company: { name: "Oracle" }, location: "Redwood City", salaryRange: "$115,000 - $230,000" },
    { id: 11, title: "Software Tester", company: { name: "Adobe" }, location: "San Jose", salaryRange: "$80,000 - $160,000" },
    { id: 12, title: "Front-end Developer", company: { name: "Twitter" }, location: "San Francisco", salaryRange: "$100,000 - $200,000" },
    { id: 13, title: "Back-end Developer", company: { name: "LinkedIn" }, location: "Mountain View", salaryRange: "$110,000 - $220,000" },
    { id: 14, title: "Full Stack Developer", company: { name: "Uber" }, location: "San Francisco", salaryRange: "$120,000 - $240,000" },
    { id: 15, title: "Data Engineer", company: { name: "Spotify" }, location: "New York", salaryRange: "$150,000 - $300,000" },
    { id: 16, title: "Machine Learning Engineer", company: { name: "Tesla" }, location: "Palo Alto", salaryRange: "$140,000 - $280,000" },
    { id: 17, title: "Blockchain Developer", company: { name: "Coinbase" }, location: "San Francisco", salaryRange: "$125,000 - $250,000" },
    { id: 18, title: "IT Support Specialist", company: { name: "HP" }, location: "Houston", salaryRange: "$70,000 - $140,000" },
];

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <GlassContainer style={{ width: paginatedJobs.length <= 2 ? "100%" : undefined }}>
            <StyledInput
                placeholder="Search jobs..."
                style={{ placeholder: { color: "black !important" }, borderColor: "rgba(255, 255, 255, 0.6)" }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={paginatedJobs}
                renderItem={(job) => (
                    <Card
                        title={<Link to={`/jobs/${job.id}`}>{job.title}</Link>}
                    >
                        <p><strong>Company:</strong> {job.company.name}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> {job.salaryRange}</p>
                    </Card>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredJobs.length}
                onChange={onPageChange}
                style={{ marginTop: '20px' }}
            />
        </GlassContainer>
    );
};

export default HomePage;

