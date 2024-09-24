import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import { Link } from "react-router-dom";
import BASE_URL from "../utils/BaseURL";

const Dashboard = () => {
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          const token = localStorage.getItem("token");

          if (!token) {
            throw new Error("Token not found in cookies");
          }

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: headers,
          });
          if (!res.ok) {
            throw new Error(
              `Failed to fetch data from ${url}. Status: ${res.status} - ${res.statusText}`
            );
          }

          const result = await res.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, loading, error };
  };

  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch(`${BASE_URL}/users`);

  const {
    data: Purchases,
    loading: loadingPurchases,
    error: errorPurchases,
  } = useFetch(`${BASE_URL}/purchase`);
  const {
    data: Memorials,
    loading: loadingMemorials,
    error: errorMemorials,
  } = useFetch(`${BASE_URL}/memorial`);

  // Categorize users
  const admins = users.filter((user) => user.role === "admin");
  const regularUsers = users.filter((user) => user.role === "user");
  console.log(users);
  console.log(Purchases);

  return (
    <div className="dashboard container pt-4">
      <div>
        <h1 className="dashboard-heading text-4xl font-bold">Dashboard</h1>
        <h5 className="ps-3 pt-3 mt-5 dashboard-text text-xl">
          General Report
        </h5>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <Link
          to="/admin/users"
          className="general-box mt-5 border-2 flex flex-col justify-center items-center shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6"
        >
          <h3 className="text-lg font-semibold">Users</h3>
          <h3 className="pt-3 text-2xl">
            {loadingUsers && <span>Loading...</span>}
            {errorUsers && <span>{errorUsers}</span>}
            {!loadingUsers && !errorUsers && users.length}
          </h3>
        </Link>
        <Link
          to="/admin/purchases"
          className="general-box mt-5 border-2 flex flex-col justify-center items-center shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6"
        >
          <h3 className="text-lg font-semibold">Purchases</h3>
          <h3 className="pt-3 text-2xl">
            {loadingPurchases && <span>Loading...</span>}
            {errorPurchases && <span>{errorPurchases}</span>}
            {!loadingPurchases &&
              !errorPurchases &&
              Purchases?.purchases?.length}
          </h3>
        </Link>
        <Link
          to="/admin/memorials"
          className="general-box mt-5 border-2 flex flex-col justify-center items-center shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6"
        >
          <h3 className="text-lg font-semibold">Memorial Pages</h3>
          <h3 className="pt-3 text-2xl">
            {loadingMemorials && <span>Loading...</span>}
            {errorMemorials && <span>{errorMemorials}</span>}
            {!loadingMemorials && !errorMemorials && Memorials.length}
          </h3>
        </Link>
        <Link
          to="/admin/referrals"
          className="general-box mt-5 border-2 flex flex-col justify-center items-center shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6"
        >
          <h3 className="text-lg font-semibold">Referral Codes</h3>
          <h3 className="pt-3 text-2xl">
            {loadingUsers && <span>Loading...</span>}
            {errorUsers && <span>{errorUsers}</span>}
            {!loadingUsers && !errorUsers && regularUsers.length}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
