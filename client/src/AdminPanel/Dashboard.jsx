import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { format, parseISO } from "date-fns"; // for date formatting and parsing
import BASE_URL from "../utils/BaseURL";
import "./styles/dashboard.css";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

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
              `Failed to fetch data from ${url}. Status: ${res.status}`
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
    data: purchases,
    loading: loadingPurchases,
    error: errorPurchases,
  } = useFetch(`${BASE_URL}/purchase`);

  const {
    data: memorials,
    loading: loadingMemorials,
    error: errorMemorials,
  } = useFetch(`${BASE_URL}/memorial`);

  // Categorize users
  const admins = users.filter((user) => user.role === "admin");
  const regularUsers = users.filter((user) => user.role === "user");

  // Data for User Chart (Pie Chart)
  const userChartData = {
    labels: ["Admins", "Regular Users"],
    datasets: [
      {
        label: "# of Users",
        data: [admins.length, regularUsers.length],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Extract purchase data from nested structure
  const purchaseItems =
    purchases?.purchases?.flatMap((purchase) =>
      purchase.items.map((item) => ({
        type: item.type,
        quantity: item.quantity,
        price: item.price,
      }))
    ) || [];

  const purchaseTypes = purchaseItems.map((item) => item.type);
  const purchaseQuantities = purchaseItems.map((item) => item.quantity);

  // Data for Purchases Chart (Bar Chart)
  const purchaseChartData = {
    labels: purchaseTypes,
    datasets: [
      {
        label: "Quantity",
        data: purchaseQuantities, // Using quantity of each item type
        backgroundColor: "#FFCE56",
        borderColor: "#FFCE56",
        borderWidth: 1,
      },
    ],
  };

  // Helper function to group memorials by a time unit (day, week, month)
  const groupMemorialsByDate = (memorials, unit = "day") => {
    const formatPattern =
      unit === "day" ? "yyyy-MM-dd" : unit === "week" ? "yyyy-ww" : "yyyy-MM";
    const memorialsByDate = memorials.reduce((acc, memorial) => {
      const dateKey = format(parseISO(memorial.createdAt), formatPattern); // Assuming createdAt field in memorials data
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      acc[dateKey] += 1;
      return acc;
    }, {});
    return memorialsByDate;
  };

  const memorialsByDay = groupMemorialsByDate(memorials, "day");
  const memorialsByDayLabels = Object.keys(memorialsByDay);
  const memorialsByDayData = Object.values(memorialsByDay);

  // Data for Memorial Pages (Bar Chart for Daily memorial creation)
  const memorialChartData = {
    labels: memorialsByDayLabels, // Dates (daily)
    datasets: [
      {
        label: "Memorial Pages",
        data: memorialsByDayData, // Number of memorials created on each day
        backgroundColor: "#4BC0C0",
        borderColor: "#4BC0C0",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard container pt-4">
      <div className="mb-8">
        <h1 className="dashboard-heading text-4xl font-bold text-center">
          Dashboard Overview
        </h1>
        <h5 className="text-center pt-3 mt-2 text-lg text-gray-600">
          Quick Summary of Your Platform's Data
        </h5>
      </div>

      {/* Top section for Users and Purchases charts */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Users Chart */}
        <div className="chart-box  p-6 md:w-1/3 ">
          <h3 className="text-xl font-semibold text-center mb-4">Users</h3>
          {loadingUsers && <span>Loading...</span>}
          {errorUsers && <span>{errorUsers}</span>}
          {!loadingUsers && !errorUsers && (
            <Pie
              data={userChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          )}
        </div>

        {/* Purchases Chart */}
        <div className="chart-box flex flex-col justify-between p-6 md:w-2/3">
          <h3 className="text-xl font-semibold text-center mb-4">Purchases</h3>
          {loadingPurchases && <span>Loading...</span>}
          {errorPurchases && <span>{errorPurchases}</span>}
          {!loadingPurchases && !errorPurchases && purchaseItems.length > 0 && (
            <Bar
              data={purchaseChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          )}
          {!loadingPurchases &&
            !errorPurchases &&
            purchaseItems.length === 0 && (
              <p className="text-center">No purchase data available.</p>
            )}
        </div>
      </div>

      {/* Memorial Pages Chart below */}
      <div className="flex justify-center mt-12">
        <div className="chart-box  p-6  w-full ">
          <h3 className="text-xl font-semibold text-center mb-4">
            Memorial Pages (Daily)
          </h3>
          {loadingMemorials && <span>Loading...</span>}
          {errorMemorials && <span>{errorMemorials}</span>}
          {!loadingMemorials && !errorMemorials && (
            <Bar
              data={memorialChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
