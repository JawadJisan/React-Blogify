import { Navigate, Outlet } from "react-router-dom";
// import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { auth } = useAuth();

  return <>{auth?.authToken ? <>{children}</> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
