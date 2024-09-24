import React, { useEffect, useState } from "react";
import "./App.css";
import AdminLayout from "./Layout/AdminLayout.jsx";
import ClientLayout from "./Layout/ClientLayout.jsx";

function App() {
  const [data, setData] = useState(null);
  const role = localStorage.getItem("role");
  const useFetch = (url) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found in localStorage");
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
          setData(result.data);
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
  useFetch();

  // if (error) {
  //   console.error("Error fetching user data:", error);
  //   return <ClientLayout />; // If there's an error, fallback to ClientLayout
  // }

  // If userData is fetched successfully
  const userRole = role;
  console.log(userRole);
  return (
    <div>
      {userRole === "admin" ? <AdminLayout /> : <ClientLayout />}
    </div>
  );
}

export default App;
