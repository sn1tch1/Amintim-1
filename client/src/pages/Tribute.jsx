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
    firstName: "",
    middleName: "",
    lastName: "",
    note: "",
    birthDate: "",
    deathDate: "",
    profileImage: "",
    coverImage: "",
    animal: "", // New field for animal name
    breed: "", // New field for breed
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const token = localStorage.getItem("token");
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
            Authorization: `Bearer ${token}`,
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
    }
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md py-[80px]">
      <h2 className="text-2xl font-bold text-center mb-4">
        Configureaza pagina memoriala
      </h2>
      <p className="text-center mb-6">
        Începeți prin a configura informațiile despre persoana dragă. Alegeți cu atenție, deoarece puteți selecta doar o dată între Persoana și Animal.
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
          Persoana
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
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        {selectedTab === "Human" ? (
          <>
            <div>
              <label className="block font-medium mb-2" htmlFor="firstName">
                Prenume
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="firstName"
                type="text"
                placeholder="Prenume"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="middleName">
                Al doilea prenume
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="middleName"
                type="text"
                placeholder="(optional)"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="lastName">
                Nume
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="lastName"
                type="text"
                placeholder="Nume"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block font-medium mb-2" htmlFor="animal">
                Animal
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="animal"
                type="text"
                placeholder="Câine"
                value={formData.animal}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="firstName">
                Nume
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="firstName"
                type="text"
                placeholder="Nume"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="breed">
                Rasă
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="breed"
                type="text"
                placeholder="Rasă"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div>
          <label className="block font-medium mb-2" htmlFor="note">
            Notă introductivă
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="note"
            type="text"
            placeholder="in memoria"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="birthDate">
            Data Nașterii
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
            Data Decesului
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
          {loading ? <Spinner /> : "Creează"}
        </button>
      </form>
    </div>
  );
};

export default TributePageSetup;
