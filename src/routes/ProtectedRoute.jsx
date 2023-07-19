import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../hooks/checkLoginStatus";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const loginStatus = await checkLoginStatus();
      setIsAuthenticated(loginStatus);
      if (!loginStatus) navigate("/login");
    };
    fetchLoginStatus();
  }, [navigate]);

  return isAuthenticated ? element : null;
};
export default ProtectedRoute;
