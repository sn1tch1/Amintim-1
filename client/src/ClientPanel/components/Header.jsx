import React, { useState, useRef } from "react";
import BottomDrawer from "./bottomDrawer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import BaseURL from "../../utils/BaseURL";
import Logo from "../../assets/logo3b.png";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const btnRef = useRef();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BaseURL}/users/logout`);
      if (response.status === 201 || 200) {
        toast.success("Logged Out");
        navigate("/");
        logout();
      } else {
        console.log("responseeee", response);
      }
    } catch (error) {
      toast.error("Please try again catch.");
    }
  };

  return (
    <header className="bg-white p-4 border-black border-b-2 fixed top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="h-[40px] w-auto mx-auto">
          <img
            src={Logo}
            alt="Amintim"
            className="w-auto h-full object-contain"
          />
        </div>
        {/* <button ref={btnRef} onClick={openDrawer} className="text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <SideBar
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          finalFocusRef={btnRef}
          isSignedIn={isSignedIn}
        /> */}
        <button ref={btnRef} onClick={openDrawer} className="text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <BottomDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          finalFocusRef={btnRef}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
};

export default Header;
