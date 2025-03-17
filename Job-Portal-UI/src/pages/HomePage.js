import { Card, Input, List, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

    &::placeholder {
    color: rgba(0, 0, 0, 0.5) !important; 
    opacity: 1 !important; 
  }
`;

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const pageSize = 9;

    useEffect(() => {
        const fetchJobs = async (page) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs?page=${page-1}&size=${pageSize}`);
    
                setJobs(response.data || []); 
                
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]); 
            }
            setLoading(false);
        };
    
        fetchJobs(currentPage);
    }, [currentPage]);
    
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const debounce = (fn, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    };

    const onSearchChange = debounce(async (e) => {
        const response = await axios.get(`http://localhost:8080/api/jobs/search?${new URLSearchParams({
            title: e.target.value,
        }).toString()}`);
        setJobs({content: response.data}); 
    }, 100);

    return (
        <GlassContainer style={{ width: jobs?.content?.length <= 2 ? "100%" : undefined }}>

            <StyledInput
                placeholder="Search for job titles"
                style={{
                    borderColor: "rgba(0, 0, 0, 0.88)",
                    color: "rgba(0, 0, 0, 0.88)"
                }}
                onChange={onSearchChange}
            />
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={jobs?.content}
                    renderItem={(job) => (
                        <Card
                            title={<Link to={`/jobs/${job.id}`}>{job.title}</Link>}
                        >
                            <p><strong>Company:</strong> {job.company?.name}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salaryRange}</p>
                        </Card>
                    )}
                />
            )}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={jobs?.totalElements || 0} 
                onChange={onPageChange}
                style={{ marginTop: '20px' }}
            />
        </GlassContainer>
    );
};

export default HomePage;

