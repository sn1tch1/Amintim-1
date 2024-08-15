import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BaseURL from "../utils/BaseURL";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userVerified, setUserVerified] = useState(true);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response isVerified:", response.data.isVerified);
        setUserVerified(response.data.isVerified);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserVerified(false); // Assume user is not verified on error
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      setIsLoading(false); // Stop loading if not logged in
    }
  }, [isLoggedIn, token]);

  // Monitor changes to userVerified and log them
  useEffect(() => {
    if (userVerified !== null) {
      console.log("User Verified state updated:", userVerified);
    }
  }, [userVerified]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (userVerified === false) {
    return <Navigate to="/verify" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
