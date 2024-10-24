import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
// import MyAccount from "../pages/MyAccount.jsx";
import Dashboard from "../AdminPanel/Dashboard.jsx";
import Services from "../AdminPanel/Services.jsx";
import Users from "../AdminPanel/Users.jsx";
import MemorialPages from "../AdminPanel/Memorials.jsx";
import MemorialViewPage from "../AdminPanel/component/MemorialDetail.jsx";
import Purchase from "../AdminPanel/Purchases.jsx";
import Referrals from "../AdminPanel/Partners.jsx";

const AdminRouters = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/services" element={<Services />} />
      <Route path="/admin/purchases" element={<Purchase />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/memorials" element={<MemorialPages />} />
      <Route path="/admin/referrals" element={<Referrals />} />
      <Route path="/admin/memorial/:id" element={<MemorialViewPage />} />

      {/* User Logged In? */}
      {/* {user ? (
        <Route path="/my-account/:id" element={<MyAccount />} />
      ) : (
        <Route path="/my-account/:id" element={<Navigate to="/" />} />
      )} */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AdminRouters;
