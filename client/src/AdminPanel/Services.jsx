import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/BaseURL";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Orders = () => {
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      const response = await fetch(`${BASE_URL}/purchases`, {
        method: "GET",
        credentials: "include",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data. Status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      // Filter orders based on status
      const filteredOrders =
        status === ""
          ? data.data
          : data.data.filter((order) => order.status === status);

      setOrders(filteredOrders);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]); // Re-fetch data when status changes

  const handleAction = async (orderId, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/bookings/booking/${orderId}`, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ status: newStatus.toLowerCase() }),
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message || "Failed to update status");
        return;
      }

      toast.success("Successfully Updated.");
      setTimeout(() => {
        fetchData(); // Refresh the data
      }, 1000);
    } catch (err) {
      toast.error("Error during updating catch.");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="data-box container-fluid pt-4">
      <div className="row align-item-center justify-content-center">
        <h1 className="dashboard-heading">Orders</h1>
        <div className="d-flex align-item-center justify-content-between pt-5 flex-column flex-sm-row">
          <div className="mt-3">
            <h5 className="dashboard-text">All Orders</h5>
          </div>
          <div className="d-flex gap-1 mb-1 align-items-end text-white">
            <button
              className={`filter-btn btn btn-light ${
                status === "" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("")}
            >
              All
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "confirmed" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("confirmed")}
            >
              Confirmed
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "cancelled" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "completed" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("completed")}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="col-12 table-responsive">
          <table className="table table-box tours-table shadow">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">FirstName</th>
                <th scope="col">Items</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7}>Loading.......</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7}>{error}</td>
                </tr>
              )}
              {!loading &&
                !error &&
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{order?.userId?.firstName}</td>
                    <td>
                      {order.items.map((item, i) => (
                        <div key={i}>
                          <p>Type: {item.type}</p>
                          <p>Price: ${item.price}</p>
                          {item.keys.map((key, j) => (
                            <p key={j}>Key used: {key.isUsed ? "Yes" : "No"}</p>
                          ))}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
