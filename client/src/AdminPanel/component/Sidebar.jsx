import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import weblogo from "../../../public/whiteLogo.png";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { RiReservedFill, RiAdminFill, RiBloggerFill } from "react-icons/ri";
import { FaUsers, FaExpandAlt } from "react-icons/fa";
import { ImShrink2 } from "react-icons/im";
import { GiLargePaintBrush } from "react-icons/gi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { SiPowerpages } from "react-icons/si";
import { TbAffiliateFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    toast.success("Logout Successfully!");
  };

  return (
    <div className="h-full">
      <div
        className={`${
          isCollapsed
            ? "sidebar-collapse-behind-space "
            : "sidebar-behind-space "
        }`}
      ></div>
      <div
        className={`flex flex-col fixed top-0 left-0 bg-gray-900 text-white h-screen transition-all duration-300 ${
          isCollapsed ? "w-12 md:w-16 md:p-1" : "w-64 p-3"
        }`}
        style={{ zIndex: 10 }}
      >
        <button
          className={`text-white hidden md:flex duration-300 items-center my-2 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
          onClick={handleToggleCollapse}
        >
          {isCollapsed ? <FaExpandAlt size={25} /> : <ImShrink2 size={25} />}
        </button>
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-5">
            <img
              className={`rounded h-40 ${isCollapsed ? "hidden" : "block "}`}
              src={weblogo}
              alt="Website Logo"
            />
          </Link>
          <hr className="w-full border-gray-700" />
          <ul className="w-full mt-4  my-20">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <MdDashboard size={25} />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/purchases"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <BiSolidPurchaseTag size={25} />
                {!isCollapsed && <span>Purchases</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/price"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <BiSolidPurchaseTag size={25} />
                {!isCollapsed && <span>Prices</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <FaUsers size={25} />
                {!isCollapsed && <span>Users</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/referrals"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <TbAffiliateFilled size={25} />
                {!isCollapsed && <span>Partners</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/memorials"
                className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
              >
                <SiPowerpages size={25} />
                {!isCollapsed && <span>Memorial Pages</span>}
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto w-full">
          <hr className="w-full border-gray-700" />
          <div className="p-2">
            <button
              onClick={logout}
              className="flex items-center gap-2 p-2 hover:bg-gray-800 transition-all"
            >
              <IoLogOut size={25} />
              {!isCollapsed && <span>Log out</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
