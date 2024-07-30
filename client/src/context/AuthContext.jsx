import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log(response);
          // const userData = await response.json();
          setUser(response.data);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          // Handle error if fetching user data fails
          logout();
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
      }
    };
    fetchUserData();
  }, []);

  const login = async () => {
    // setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
