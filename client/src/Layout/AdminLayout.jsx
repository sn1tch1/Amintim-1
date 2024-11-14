import React, { useEffect, useState } from "react";
import AdminRouters from "../router/AdminRouters.jsx";
import Sidebar from "../AdminPanel/component/Sidebar.jsx";
import { useSidebar } from "../context/SidebarContext.jsx";

const AdminLayout = () => {
  const { isCollapsed } = useSidebar();

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
