import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login } = useContext(AuthContext);
  return login ? children : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;