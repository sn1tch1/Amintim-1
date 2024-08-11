import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import BaseURL from "../utils/BaseURL";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  // let isLoggedIn;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          // const userData = await response.json();
          setUser(response.data);
          // setIsLoggedIn(true);
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

    {
      !token ? setIsLoggedIn(false) : setIsLoggedIn(true);
    }
  }, []);

  const login = async () => {
    // setUser(userData);
    setIsLoggedIn(true);
    // isLoggedIn = true;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    // isLoggedIn = false;
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
