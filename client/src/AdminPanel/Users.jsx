import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/BaseURL";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";

const Users = () => {
  const [totalUsers, setTotalUsers] = useState([]);
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

      const res = await axios.get(`${BASE_URL}/users`, { headers });

      setTotalUsers(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Call the backend API to change the user role
      const response = await axios.put(
        `${BASE_URL}/users/change-role`, // Assuming this is your backend route
        { userId, newRole }, // The body now includes both userId and newRole
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message || "Role updated successfully.");
        fetchData(); // Refresh the user data after updating the role
      } else {
        toast.error(response.data.message || "Failed to update role.");
      }
    } catch (err) {
      toast.error("An error occurred while updating the role.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Call the backend API to delete the user
      const response = await axios.delete(`${BASE_URL}/users/user/${userId}`, {
        headers,
      });

      if (response.status === 200) {
        toast.success("User deleted successfully");
        fetchData(); // Refresh the user data after deletion
      } else {
        toast.error(response.data.message || "Failed to delete user.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the user.");
    }
  };


  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold text-center">Users</h1>
      <h5 className="text-lg text-center mt-3">All Users</h5>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4">Id</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Purchased</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading.......
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              totalUsers?.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <th scope="row" className="text-center py-2 px-4">
                    {index + 1}
                  </th>
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">
                    {`${user?.firstName || ""} ${user?.lastName || ""}`}
                  </td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    {user.hasPurchased ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4">
                    <select
                      className="form-select border-gray-300 rounded"
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole(user._id, e.target.value)
                      } // Calls the updated function
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="partner">Partner</option>{" "}
                      {/* Added partner role */}
                    </select>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded"
                      type="button"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete size={25} />
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

export default Users;
