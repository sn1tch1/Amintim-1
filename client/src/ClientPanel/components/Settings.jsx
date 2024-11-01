import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BaseURL from "../../utils/BaseURL";
axios.defaults.withCredentials = true;

const SettingsTab = () => {
  const [avatar, setAvatar] = useState();
  const [updatedProfileImage, setUpdatedProfileImage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    zipcode: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { firstName, lastName, city, country, zipcode, profileImage } =
          response.data;
        setFormData({ firstName, lastName, city, country, zipcode });
        if (profileImage) setAvatar(profileImage);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BaseURL}/users/update`,
        { ...formData, profileImage: avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      response.status === 200
        ? toast.success("User details updated successfully")
        : toast.error("Error updating user details. Please try again.");
    } catch (error) {
      toast.error("Error updating user details. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BaseURL}/users/update-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setShowPasswordModal(false);
      } else {
        toast.error("Error updating password. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="space-y-4 w-full py-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Prenume</label>
          <input
            type="text"
            name="firstName"
            value={formData?.firstName || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Prenume"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nume</label>
          <input
            type="text"
            name="lastName"
            value={formData?.lastName || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Nume"
          />
        </div>
        <div>
          <label className="block text-gray-700">Oras</label>
          <input
            type="text"
            name="city"
            value={formData?.city || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-gray-700">Judet</label>
          <input
            type="text"
            name="country"
            value={formData?.country || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-gray-700">Zip/Cod Postal</label>
          <input
            type="text"
            name="zipcode"
            value={formData?.zipcode || ""}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Cod Postal"
          />
        </div>

        <button className="flex w-full p-3 text-center items-center justify-center bg-black/90 text-white rounded-full hover:bg-black duration-200">
          Save
        </button>
      </form>

      {/* Button to open password modal */}
      <button
        onClick={() => setShowPasswordModal(true)}
        className="mt-4 text-blue-500 underline mb-9"
      >
        Change Password
      </button>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
                  required
                />
              </div>
              <button className="w-full bg-black text-white p-3 rounded-full hover:bg-gray-800">
                Update Password
              </button>
            </form>
            
            <button
              onClick={() => setShowPasswordModal(false)}
              className="mx-auto w-full mt-4 text-red-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
