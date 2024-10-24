import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import BaseURL from "../utils/BaseURL";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
      }
    };
    fetchUserData();
  }, []);

  const login = async (token) => {
    try {
      const response = await axios.get(`${BaseURL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("token", token); // Store the token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        // window.location.reload();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("discountAmount");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
