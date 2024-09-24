import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/BaseURL";

const Orders = () => {
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

      const response = await fetch(`${BASE_URL}/purchase`, {
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
      setOrders(data.purchases);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-4 ">
      <h1 className="text-3xl font-semibold text-center">Purchases</h1>
      <h5 className="text-lg text-center mt-3">All Purchases</h5>

      <div className="overflow-x-auto mt-5 w-full">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Delivery Info</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              orders?.map((order, index) => (
                <tr key={order._id} className="border-b">
                  <th scope="row" className="text-center py-2 px-4">
                    {index + 1}
                  </th>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="mb-2">
                        <p>Type: {item.type}</p>
                        <p>Price: ${item.price}</p>
                        {item.keys.map((key, j) => (
                          <p key={j}>Key used: {key.isUsed ? "Yes" : "No"}</p>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4">
                    <p>Country: {order?.deliveryInfo?.country}</p>
                    <p>First Name: {order?.deliveryInfo?.firstName}</p>
                    <p>Last Name: {order?.deliveryInfo?.lastName}</p>
                    <p>Address: {order?.deliveryInfo?.address}</p>
                    <p>City: {order?.deliveryInfo?.city}</p>
                    <p>Postal Code: {order?.deliveryInfo?.postalCode}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
