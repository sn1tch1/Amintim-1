import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../utils/BaseURL";

const TributePageSetup = () => {
  const [selectedTab, setSelectedTab] = useState("Human");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    note: "",
    birthDate: "",
    deathDate: "",
    profileImage: "",
    coverImage: "",
    key: "", // Key included in formData
  });
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true); // Open the modal
  };

  const handleKeyChange = (e) => {
    setFormData((prevData) => ({ ...prevData, key: e.target.value }));
  };

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseURL}/memorial`,
        {
          ...formData,
          isHuman: selectedTab === "Human",
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Tribute Page Created Successfully");
        navigate(`/memorial/profile/${response.data.memorialPage._id}`);
      } else {
        toast.error(
          response.data.message ||
            "Error Creating Tribute Page. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Error Creating Tribute Page. Please try again."
      );
    } finally {
      setLoading(false);
      setModalOpen(false); // Close the modal
    }
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md py-[80px]">
      <h2 className="text-2xl font-bold text-center mb-4">
        Tribute Page Setup
      </h2>
      <p className="text-center mb-6">
        Start by setting up information about your loved one. Choose carefully
        as you can only select between Human or Animal once.
      </p>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`flex-1 py-2 px-4 rounded-full ${
            selectedTab === "Human"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSelectedTab("Human")}
        >
          Human
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-full ${
            selectedTab === "Animal"
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSelectedTab("Animal")}
        >
          Animal
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="middleName">
            Middle Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="middleName"
            type="text"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="note">
            Introductory Note
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="note"
            type="text"
            placeholder="Introductory Note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="birthDate">
            Date of Birth
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="deathDate">
            Date of Passing
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="deathDate"
            type="date"
            value={formData.deathDate}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className="flex w-full p-3 text-center items-center justify-center bg-black/90 text-white rounded-full hover:bg-black duration-200"
          type="submit"
        >
          {loading ? <Spinner /> : "Create"}
        </button>
      </form>

      {/* Modal for key input */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Enter Key</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Enter your key"
              value={formData.key}
              onChange={handleKeyChange}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-full"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-full"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TributePageSetup;
