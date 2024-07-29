import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
        const response = await axios.get(`http://localhost:5000/api/users/me`, {
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
      const response = await axios.post(
        "http://localhost:5000/api/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This header is crucial
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (response.status === 200) {
        const { filename } = response.data;
        const imageUrl = `http://localhost:5000/uploads/users/${filename}`;
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
        "http://localhost:5000/api/users/update",
        {
          ...formData,
          avatar,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
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

  console.log("aaa", avatar);

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
                  src={`/public/users/${avatar}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-500">H</span>
              )}
            </div>
          </label>
          {/* <button className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536M14.828 8.828l3.536-3.536m-5.364 9.9a9 9 0 11-12.728-12.728l2.586 2.586a1 1 0 001.414 0l2.828-2.828a1 1 0 010 1.414L2.828 6.343a9 9 0 0112.728 12.728z"
              />
            </svg>
          </button> */}
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
