import React, { useState, useCallback } from "react";
import { Input, Pagination, Button } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useJobs } from "../hooks/useJobs";
import JobList from "../components/JobList";
import LoginModal from "../components/LoginModal";
import DrawerMenu from "../components/DrawerMenu";
import { searchJobs } from "../services/jobService";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [title, setTitle] = useState("");

  const { isAuthenticated, user,setUser, handleLogin, handleLogout } = useAuth();
  const { jobs, setJobs, loading, handleApply } = useJobs(currentPage, 9);

  const handleSearchChange = useCallback(async (e) => {
    const title = e.target.value;
    setTitle(title);
    try {
      const response = await searchJobs({ title });
      setJobs({content: response});  // ✅ Update job list with search results
    } catch {
    }
  }, [setJobs]);



  

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h2>Job Portal</h2>
        <div>
          {isAuthenticated && <Button type="primary" onClick={() => setDrawerVisible(true)}>Panel</Button>}
          <Button type={isAuthenticated  ? "primary" : "default"} danger={isAuthenticated} onClick={isAuthenticated ? handleLogout : () => setIsModalVisible(true)}>
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
  
      {/* Search Input */}
      <Input
        placeholder="Search jobs"
        style={{ marginBottom: 20 }}
        value={title}
        onChange={handleSearchChange}
      />

      <JobList jobs={jobs} isAuthenticated={isAuthenticated} user={user} 
      handleApply={handleApply} setUser={setUser} />
      <Pagination current={currentPage} pageSize={9} total={jobs?.totalElements || 0} onChange={setCurrentPage} />

      <LoginModal isModalVisible={isModalVisible} handleOk={() => setIsModalVisible(false)} handleCancel={() => setIsModalVisible(false)} handleLogin={handleLogin} />
      <DrawerMenu drawerVisible={drawerVisible} handleDrawerClose={() => setDrawerVisible(false)} />
    </>
  );
};

export default HomePage;
