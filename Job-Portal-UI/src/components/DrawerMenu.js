import { Drawer, Button } from "antd";
import { useNavigate } from "react-router-dom";

const DrawerMenu = ({ drawerVisible, handleDrawerClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer title="Quick Actions" placement="right" onClose={handleDrawerClose} open={drawerVisible}>
      <Button type="primary" block onClick={() => navigate("/managements/jobs")}>Manage Jobs</Button>
      <Button type="primary" block onClick={() => navigate("/managements/users")} style={{ marginTop: "10px" }}>Manage Users</Button>
      <Button type="primary" block onClick={() => navigate("/managements/job-applications")} style={{ marginTop: "10px" }}>Job Applications</Button>
    </Drawer>
  );
};

export default DrawerMenu;
