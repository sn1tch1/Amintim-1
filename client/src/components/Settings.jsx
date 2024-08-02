import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BaseURL from "../utils/BaseURL";
axios.defaults.withCredentials = true;

const SettingsTab = () => {
  const [avatar, setAvatar] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    zipcode: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BaseURL}/users/me`, {
          withCredentials: true,
        });
        const { firstName, lastName, city, country, zipcode, profileImage } =
          response.data;
        setFormData({ firstName, lastName, city, country, zipcode });
        console.log(profileImage);
        if (profileImage) {
          setAvatar(profileImage);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [avatar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BaseURL}/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This header is crucial
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.status === 200) {
        const { filename } = response.data;
        const imageUrl = `${BaseURL}/uploads/users/${filename}`;
        setAvatar(imageUrl);
        toast.success("Avatar updated successfully");
      } else {
        toast.error("Error updating avatar. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating avatar. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BaseURL}/users/update`,
        {
          ...formData,
          avatar,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("User details updated successfully");
      } else {
        toast.error("Error updating user details. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating user details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <label htmlFor="avatar-upload">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              {avatar ? (
                <img
                  src={`/users/${avatar}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <img
                  src={`/src/assets/avatar.png`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full"
                />
              )}
            </div>
          </label>
        </div>
      </div>
      <form className="space-y-4 w-full py-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Last Name"
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-gray-700">Zip/Postal Code</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
            placeholder="Zip/Postal Code"
          />
        </div>

        <button className="flex w-full p-3 text-center items-center justify-center bg-black/90 text-white rounded-full hover:bg-black duration-200">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
