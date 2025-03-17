import { Card, Input, List, Pagination, Modal, Button, Form, message } from "antd";
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');

    const pageSize = 9;

    // Axios instance with session support
    const api = axios.create({
        baseURL: "http://localhost:8080/api",
        withCredentials: true, // Allow browser to send cookies
    });

    useEffect(() => {
        checkAuthStatus();
        fetchJobs(currentPage);
    }, [currentPage]);

    const fetchJobs = async (page) => {
        setLoading(true);
        try {
            const response = await api.get(`/jobs?page=${page - 1}&size=${pageSize}`);
            setJobs(response.data || []);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        }
        setLoading(false);
    };

    const checkAuthStatus = async () => {
        try {
            const response = await api.get("/auth/status");
            setIsAuthenticated(response.data.authenticated);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

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
        const response = await api.get(`/jobs/search?${new URLSearchParams({
            title: e.target.value,
        }).toString()}`);
        setJobs({ content: response.data });
    }, 100);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async () => {
        try {
            const response = await api.post("/auth/login", { email }, {
                withCredentials: true, // ✅ Include cookies for session authentication
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            message.success("User found by name!");
            setIsAuthenticated(true);
            handleOk();
        } catch (error) {
            message.error("User not found. Check if the name exists.");
        }
    };
    

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setIsAuthenticated(false);
            message.success("Logged out successfully.");
        } catch (error) {
            message.error("Logout failed.");
        }
    };


    const handleApply = async (jobId) => {
        try {
            const response = await api.post("/job-applications/apply", null, {
                params: { email, jobId }, // ✅ Gửi email + job ID
                withCredentials: true
            });
    
            message.success("Application submitted successfully!");
        } catch (error) {
            message.error("Failed to apply. Please try again.");
        }
    };

    return (
        <GlassContainer style={{ width: jobs?.content?.length <= 2 ? "100%" : undefined }}>
            
            {/* Authentication Buttons */}
            {isAuthenticated ? (
                <Button type="primary" danger onClick={handleLogout} style={{ marginBottom: 20 }}>
                    Logout
                </Button>
            ) : (
                <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
                    Login
                </Button>
            )}

            {/* Login Modal */}
            <Modal title="Login" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Search Input */}
            <StyledInput
                placeholder="Search for job titles"
                onChange={onSearchChange}
            />

            {/* Job List */}
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={jobs?.content}
                renderItem={(job) => (
                    <Card
                        title={<Link to={`/jobs/${job.id}`}>{job.title}</Link>}
                        extra={isAuthenticated ? (
                            <Button type="primary" onClick={() => handleApply(job.id)}>
                                Apply
                            </Button>
                        ) : null}
                    >
                        <p><strong>Company:</strong> {job.company?.name}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> {job.salaryRange}</p>
                    </Card>
                )}
            />
            )}

            {/* Pagination */}
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

