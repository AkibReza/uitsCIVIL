import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/uitsCIVIL/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/uitsCIVIL/dashboard" />;
  }

  return children;
};
