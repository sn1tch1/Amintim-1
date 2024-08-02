import React, { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../assets/avatar.png";
import { format } from "date-fns";
import coverAvatar from "../assets/cover.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { FaBirthdayCake } from "react-icons/fa";
import { GiGraveFlowers } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import BaseURL from "../utils/BaseURL";

const View = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState(coverAvatar);
  const [activeTab, setActiveTab] = useState("about");
  const [mediaImages, setMediaImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memorialData, setMemorialData] = useState(null);
  const [newTribute, setNewTribute] = useState("");
  const formattedDeathDate = memorialData
    ? format(new Date(memorialData?.deathDate), "dd MMMM yyyy")
    : "";
  const formattedBirthDate = memorialData
    ? format(new Date(memorialData?.birthDate), "dd MMMM yyyy")
    : "";
  const [newAbout, setNewAbout] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newMiddleName, setNewMiddleName] = useState("");
  const [tributes, setTributes] = useState([]);
  const [newLastName, setNewLastName] = useState("");

  const [newBirthDate, setNewBirthDate] = useState("");
  const [newDeathDate, setNewDeathDate] = useState("");

  const handleTributeChange = (event) => {
    setNewTribute(event.target.value);
  };

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/tributes/memorialPage/${id}`
        ); // Replace with your actual API endpoint
        setTributes(response.data);
      } catch (error) {
        console.error("Error fetching tributes:", error);
      }
    };

    fetchTributes();
  }, [tributes]);

  useEffect(() => {
    if (memorialData) {
      setNewFirstName(memorialData.firstName || "");
      setNewMiddleName(memorialData.middleName || "");
      setNewLastName(memorialData.lastName || "");
      setNewAbout(memorialData.about || "");
      setNewBirthDate(memorialData.birthDate || "");
      setNewDeathDate(memorialData.deathDate || "");
    }
  }, [memorialData]);

  useEffect(() => {
    const fetchMemorialData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/memorial/${id}`);
        setMemorialData(response.data);
        setProfileImage(response.data.profileImage);
        setCoverImage(response.data.coverImage);
        setMediaImages(response.data.gallery);
      } catch (error) {
        console.error("Error fetching memorial data:", error);
      }
    };

    fetchMemorialData();
  }, [id]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % mediaImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + mediaImages.length) % mediaImages.length
    );
  };

  const handleTributeSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    } else {
      setLoading(true);
      try {
        await axios.post(`${BaseURL}/tributes/create/${id}`, {
          message: newTribute,
        });
        setNewTribute("");
        // Optionally refetch tributes or update state
        toast.success("Tribute added successfully!");
      } catch (error) {
        toast.error("Failed to add tribute.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-white">
        {/* Cover Image */}
        <div className="relative">
          {!coverImage ? (
            <img
              src={`/src/assets/cover.png`}
              alt="Profile"
              className="w-full h-[150px] object-cover"
            />
          ) : (
            <img
              src={`/public/users/${coverImage}`}
              alt="Cover"
              className="w-full h-[150px] object-cover"
            />
          )}
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center -mt-16">
          <div className="relative">
            {!profileImage ? (
              <img
                src={`/src/assets/avatar.png`}
                alt="Profile"
                className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
              />
            ) : (
              <img
                src={`/public/users/${profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
              />
            )}
          </div>
        </div>
        <div className="text-center mt-2 space-y-2">
          <h2 className="text-xl">In memory of</h2>

          <p className="text-gray-600 text-lg font-bold font-berkshire">
            {newFirstName} {newMiddleName} {newLastName}
          </p>

          <div className="flex gap-6 items-center justify-center">
            <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
              <FaBirthdayCake size={20} />
              {formattedBirthDate}
            </p>

            <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
              <GiGraveFlowers size={20} />
              {formattedDeathDate}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4 mb-10">
        <div className="flex justify-around border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "about"
                ? "border-b-2 border-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About me
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "media"
                ? "border-b-2 border-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "tributes"
                ? "border-b-2 border-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("tributes")}
          >
            Tributes
          </button>
        </div>
        <div className="p-4">
          <div className="p-4">
            {activeTab === "about" && (
              <div>
                <div>{newAbout || "No about information available."}</div>
              </div>
            )}
          </div>

          {activeTab === "media" && (
            <div>
              <div className="grid grid-cols-3 gap-2">
                {mediaImages?.length > 0 ? (
                  mediaImages?.map((image, index) => (
                    <img
                      key={index}
                      src={`/public/users/mediaImages/${image}`}
                      alt={`Media ${index}`}
                      className="w-full h-[120px] sm:h-[200px]  md:h-[300px] lg:h-[400px] object-cover cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500">
                    No media available.
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "tributes" && (
            <div className="px-[3%] md:px-[7%] mb-[50px] lg:px-[10%] py-[12px]">
              {tributes.length === 0 ? (
                <>
                  <p>No tributes available.</p>
                  <div className="w-full border h-[100px] border-black rounded-lg my-6">
                    <textarea
                      value={newTribute}
                      onChange={handleTributeChange}
                      placeholder="Add a tribute..."
                      className="h-full w-full p-3 rounded-lg"
                    />
                    <button
                      disabled={loading}
                      className={`bg-[#F9CA4F] ${
                        !loading && "hover:bg-[#f8c238]"
                      } cursor-pointer py-3 w-full my-3`}
                      onClick={handleTributeSubmit}
                    >
                      {loading ? <Spinner /> : "Submit Tribute"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-center p-6">
                    Tributes
                  </h1>

                  <div className="space-y-5">
                    {tributes.map((tribute) => (
                      <div
                        key={tribute._id}
                        className="flex items-start border border-black rounded-lg p-4 shadow-lg bg-gray-50"
                      >
                        <div className="flex-shrink-0 mr-4">
                          {tribute.user.profileImage && (
                            <img
                              src={`/public/users/${tribute.user.profileImage}`}
                              alt={`${tribute.user.name}'s profile`}
                              className="h-16 w-16 object-cover rounded-full"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">
                              {tribute.user.firstName}
                            </div>
                            <div className="text-sm text-gray-700">
                              {new Date(tribute.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p>{tribute.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full border h-[100px] border-black rounded-lg my-6">
                    <textarea
                      value={newTribute}
                      onChange={handleTributeChange}
                      placeholder="Add a tribute..."
                      className="h-full w-full p-3 rounded-lg"
                    />
                    <button
                      disabled={loading}
                      className={`bg-[#F9CA4F] ${
                        !loading && "hover:bg-[#f8c238]"
                      } cursor-pointer py-3 w-full my-3`}
                      onClick={handleTributeSubmit}
                    >
                      {loading ? <Spinner /> : "Submit Tribute"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for full-size image view */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative p-4 rounded w-[80%] h-[80%] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/public/users/mediaImages/${mediaImages[selectedImageIndex]}`}
              alt="Full size"
              className="h-[400px] object-contain"
            />
            <button
              className="absolute -top-2 right-2 text-white bg-black/40 backdrop-blur-lg  p-2 rounded-full cursor-pointer"
              onClick={handleCloseModal}
            >
              <RxCross2 size={30} />
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/40 backdrop-blur-lg p-2 rounded-full cursor-pointer"
              onClick={handlePrevImage}
            >
              <FaChevronLeft size={30} />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/40 backdrop-blur-lg p-2 rounded-full cursor-pointer"
              onClick={handleNextImage}
            >
              <FaChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
