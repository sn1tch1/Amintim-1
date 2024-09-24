import React, { useEffect, useState } from "react";
import AdminRouters from "../router/AdminRouters.jsx";
import Sidebar from "../AdminPanel/component/Sidebar.jsx";
import { useSidebar } from "../context/SidebarContext.jsx";

const AdminLayout = () => {
  const { isCollapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000); // Adjust threshold as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-xl font-semibold">
          You can't access the admin panel from mobile. Please log in from a
          desktop.
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`flex bg-gray-50 duration-300 ${
        isCollapsed ? "ml-16" : "ml-64"
      }`}
    >
      <Sidebar />
      <AdminRouters />
      <div className="end-point-space d-block" style={{ width: "10px" }}></div>
    </div>
  );
};

export default AdminLayout;
