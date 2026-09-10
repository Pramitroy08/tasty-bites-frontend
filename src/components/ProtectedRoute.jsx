
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ adminOnly = false }) {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const location = useLocation();

  // No authentication token
  if (!token) {
    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  let user = null;

  try {
    user = userString
      ? JSON.parse(userString)
      : null;
  } catch (error) {
    console.error("Invalid user data:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        replace
      />
    );
  }

  // Authentication data must contain a valid user
  if (!user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        replace
      />
    );
  }

  // Admin-only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
