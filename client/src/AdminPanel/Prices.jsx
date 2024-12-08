import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/BaseURL";
import { toast } from "react-hot-toast";

const AdminPrices = () => {
  const [priceData, setPriceData] = useState({
    price1: { actualPrice: "", discountedPrice: "" },
    price2: { actualPrice: "", discountedPrice: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch prices
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(`${BASE_URL}/price`, { headers });
      const { price1, price2 } = res.data.data; // Assuming the response has price1 and price2 directly
      setPriceData({ price1, price2 });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePrices = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Filter out unwanted fields before sending the data
      const updatedData = {
        price1: {
          actualPrice: priceData.price1.actualPrice,
          discountedPrice: priceData.price1.discountedPrice,
        },
        price2: {
          actualPrice: priceData.price2.actualPrice,
          discountedPrice: priceData.price2.discountedPrice,
        },
      };

      const res = await axios.post(`${BASE_URL}/price`, updatedData, {
        headers,
      });
      toast.success("Prices updated successfully!");
      const { price1, price2 } = res.data.data; // Assuming the response has price1 and price2 directly
      setPriceData({ price1, price2 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update prices.");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold text-center">
        Admin - Manage Prices
      </h1>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center mt-4">Loading prices...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Price Display */}
      {!loading && !error && priceData && (
        <div className="mt-6">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Price Type</th>
                <th className="py-2 px-4">Actual Price</th>
                <th className="py-2 px-4">Discounted Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(priceData).map(([priceKey, price], index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{priceKey}</td>
                  <td className="py-2 px-4 text-center">
                    {price.actualPrice} RON
                  </td>
                  <td className="py-2 px-4 text-center">
                    {price.discountedPrice} RON
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Update Prices Form */}
          <form
            onSubmit={updatePrices}
            className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Update Prices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(priceData).map(([priceKey, price], index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-2">{priceKey}</h3>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Actual Price for {priceKey}
                    </label>
                    <input
                      type="number"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      value={price.actualPrice}
                      onChange={(e) =>
                        setPriceData((prevData) => ({
                          ...prevData,
                          [priceKey]: {
                            ...prevData[priceKey],
                            actualPrice: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter new actual price"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Discounted Price for {priceKey}
                    </label>
                    <input
                      type="number"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      value={price.discountedPrice}
                      onChange={(e) =>
                        setPriceData((prevData) => ({
                          ...prevData,
                          [priceKey]: {
                            ...prevData[priceKey],
                            discountedPrice: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter new discounted price"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700"
            >
              Update Prices
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPrices;
