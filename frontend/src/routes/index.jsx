import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminLogin",
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: "/admin",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path: "/user",
    element: <UserDashboard></UserDashboard>,
  },
    {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
