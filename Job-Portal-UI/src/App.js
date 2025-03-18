import { Layout } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetails from "./pages/JobDetails";
import JobManagement from "./pages/JobManagement";
import UserManagement from "./pages/UserManagement";
import JobApplicationManagement from "./pages/JobApplicationManagement";
import PrivateRoute from "./pages/PrivateRoute";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout
        style={{
          minHeight: "100vh",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Header
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Job Portal - Glassmorphism UI
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/*" element={<Navigate to="/" />} />
            <Route
              path="/managements/jobs"
              element={
                <PrivateRoute element={<JobManagement />} />
              }
            />
            <Route
              path="/managements/users"
              element={
                <PrivateRoute element={<UserManagement />} />
              }
            />
            <Route
              path="/managements/job-applications"
              element={
                <PrivateRoute element={<JobApplicationManagement />} />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
