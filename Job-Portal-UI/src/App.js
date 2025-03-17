import { Layout } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetails from "./pages/JobDetails";
import JobManagement from "./pages/JobManagement";

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
          }}
        >
          Job Portal - Glassmorphism UI

        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/managements/jobs" element={<JobManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
