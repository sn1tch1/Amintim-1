import React, { useState } from "react";
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
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/memorial`, {
        ...formData,
        isHuman: selectedTab === "Human",
      });
      if (response.status === 201 || 200) {
        toast.success("Tribute Page Created Successfully");
        console.log("iiiii", response);
        navigate(`/memorial/profile/${response.data.memorialPage._id}`);
      } else {
        toast.error("Error Creating Tribute Page. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
          {loading ? <Spinner /> : "Save"}
        </button>
      </form>
    </div>
  );
};

export default TributePageSetup;
