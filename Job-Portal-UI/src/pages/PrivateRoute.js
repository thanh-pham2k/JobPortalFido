import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const email = localStorage.getItem("email"); // Retrieve user data from localStorage

  if (!email || email !== "admin@gmail.com") {
    return <Navigate to="/" replace />; // Redirect to homepage if not admin
  }

  return element;
};

export default PrivateRoute;
