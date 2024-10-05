import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/BaseURL";
import Avatar from "../../public/avatar.jpg";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MemorialPages = () => {
  const [memorialPages, setMemorialPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMemorialPages = async () => {
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

      const res = await fetch(`${BASE_URL}/memorial`, {
        method: "GET",
        credentials: "include",
        headers,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch data. Status: ${res.status} - ${res.statusText}`
        );
      }

      const result = await res.json();
      setMemorialPages(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemorialPages();
  }, []);

  // Function to handle QR status change
  const handleQRStatusChange = async (memorialPageId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${BASE_URL}/memorial/${memorialPageId}/updateQRStatus`,
        { QRCodeStatus: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("QR status updated successfully");
        // Update the memorialPages state with the new QR status
        setMemorialPages((prev) =>
          prev.map((page) =>
            page._id === memorialPageId
              ? { ...page, QRCodeStatus: newStatus }
              : page
          )
        );
      } else {
        throw new Error("Failed to update QR status");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update QR status");
    }
  };

  const handleDelete = async (memorialPageId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE_URL}/memorialPages/${memorialPageId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Memorial Page deleted successfully");
      fetchMemorialPages();
    } catch (err) {
      toast.error("Failed to delete memorial page");
    }
  };

  const navigateToDetails = (id) => {
    navigate(`/admin/memorial/${id}`);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Memorial Pages</h1>
        <h5 className="text-lg mt-3">All Memorial Pages</h5>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Profile Image</th>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Tributes</th>
              <th className="py-2 px-4">QR Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              memorialPages?.map((page, index) => (
                <tr key={page._id} className="border-b">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img
                      src={page.profileImage || Avatar}
                      className="w-12 h-12 rounded-full object-cover border-2"
                      alt="profile-img"
                    />
                  </td>
                  <td className="py-2 px-4">{page._id}</td>
                  <td className="py-2 px-4">{page.firstName}</td>
                  <td className="py-2 px-4">{page.title}</td>
                  <td className="py-2 px-4">{page.user?.firstName}</td>
                  <td className="py-2 px-4">{page.tributes?.length || 0}</td>

                  {/* Dropdown for changing QR code status */}
                  <td className="py-2 px-4">
                    <select
                      value={page.QRCodeStatus || "Not Printed"}
                      onChange={(e) =>
                        handleQRStatusChange(page._id, e.target.value)
                      }
                      className="p-2 border rounded-md"
                    >
                      <option value="Not Printed">Not Printed</option>
                      <option value="Printed">Printed</option>
                    </select>
                  </td>

                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => navigateToDetails(page._id)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(page._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemorialPages;
