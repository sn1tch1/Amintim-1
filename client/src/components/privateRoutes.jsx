import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  // const storedUser = localStorage.getItem("token");
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  const location = useLocation();
  if (isLoggedIn === false) {
    // Redirect them to the login page if not logged in or if storedUser is not present
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
