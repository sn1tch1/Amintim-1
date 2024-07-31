import React, { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../assets/avatar.png";
import { format } from "date-fns";
import coverAvatar from "../assets/cover.png";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { FaBirthdayCake } from "react-icons/fa";
import { GiGraveFlowers } from "react-icons/gi";

const Memorial = () => {
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState(coverAvatar);
  const [activeTab, setActiveTab] = useState("about");
  const [mediaImages, setMediaImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memorialData, setMemorialData] = useState(null);
  const formattedDeathDate = memorialData
    ? format(new Date(memorialData?.deathDate), "dd MMMM yyyy")
    : "";
  const formattedBirthDate = memorialData
    ? format(new Date(memorialData?.birthDate), "dd MMMM yyyy")
    : "";
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [newAbout, setNewAbout] = useState(memorialData?.about || "");

  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
  const [isEditingDeathDate, setIsEditingDeathDate] = useState(false);
  const [newBirthDate, setNewBirthDate] = useState(
    memorialData?.birthDate || ""
  );
  const [newDeathDate, setNewDeathDate] = useState(
    memorialData?.deathDate || ""
  );

  const handleAboutChange = (e) => {
    setNewAbout(e.target.value);
  };

  const toggleEditAbout = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  const handleDeathDateChange = (e) => {
    setNewDeathDate(e.target.value);
  };

  const toggleEditDeathDate = () => {
    setIsEditingDeathDate(!isEditingDeathDate);
  };

  const handleBirthDateChange = (e) => {
    setNewBirthDate(e.target.value);
  };

  const toggleEditBirthDate = () => {
    setIsEditingBirthDate(!isEditingBirthDate);
  };

  useEffect(() => {
    const fetchMemorialData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/memorial/${id}`
        );
        console.log("obbbbbbject", response);
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

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { filename } = response.data;
        console.log("nameeeeee", response);
        const imageUrl = `http://localhost:5000/uploads/users/${filename}`;
        if (type === "profileImage") {
          setProfileImage(filename);
          console.log("profileeee", profileImage);
        } else if (type === "coverImage") {
          setCoverImage(filename);
          console.log("coverrrr", coverImage);
        } else if (type === "mediaImages") {
          setMediaImages((prevImages) => [...prevImages, ...filenames]);
        }
        toast.success(
          `${type.replace(/([A-Z])/g, " $1")} updated successfully`
        );
      } else {
        toast.error(`Error updating ${type}. Please try again.`);
      }
    } catch (error) {
      toast.error(`Error updating ${type}. Please try again.`);
    }
  };

  const handleProfileImageChange = (e) => handleImageChange(e, "profileImage");

  const handleCoverImageChange = (e) => handleImageChange(e, "coverImage");

  const handleMediaImageChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/upload/mediaImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const filenames = response.data.filenames;
        console.log("namesss", filenames);
        setMediaImages((prevImages) => [...prevImages, ...filenames]);
        toast.success("Media images updated successfully");
      } else {
        toast.error("Error updating media images. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating media images. Please try again.");
    }
  };

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

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/memorial/${id}`,
        {
          profileImage,
          coverImage,
          gallery: mediaImages,
          birthDate: newBirthDate,
          deathDate: newDeathDate,
          about: newAbout,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Memorial page updated successfully");
      } else {
        toast.error("Error updating memorial page. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating memorial page. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-white">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={`/public/users/${coverImage}`}
            alt="Cover"
            className="w-full h-[150px] object-cover"
          />
          <label
            htmlFor="coverImageInput"
            className="absolute bottom-2 right-2 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
            style={{ zIndex: 10 }} // Ensure the label is on top of other elements
          >
            <CiEdit size={22} />
          </label>
          <input
            type="file"
            id="coverImageInput"
            className="hidden"
            onChange={handleCoverImageChange}
          />
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center -mt-16">
          <div className="relative">
            <img
              src={`/public/users/${profileImage}`}
              alt="Profile"
              className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
            />
            <label
              htmlFor="profileImageInput"
              className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
            >
              <CiEdit size={22} />
            </label>
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
        <div className="text-center mt-2 space-y-2">
          <h2 className="text-xl">In memory of</h2>
          <p className="text-gray-600 text-lg font-bold font-berkshire">
            {memorialData?.firstName} {memorialData?.middleName}{" "}
            {memorialData?.lastName}
          </p>
          <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
            <FaBirthdayCake size={20} />
            {isEditingBirthDate ? (
              <input
                type="date"
                value={newBirthDate}
                onChange={handleBirthDateChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              formattedBirthDate
            )}
            <button onClick={toggleEditBirthDate} className="ml-2">
              <CiEdit size={22} />
            </button>
          </p>

          <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
            <GiGraveFlowers size={20} />
            {isEditingDeathDate ? (
              <input
                type="date"
                value={newDeathDate}
                onChange={handleDeathDateChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              formattedDeathDate
            )}
            <button onClick={toggleEditDeathDate} className="ml-2">
              <CiEdit size={22} />
            </button>
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Page Settings
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Preview Profile
          </button>
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
                {isEditingAbout ? (
                  <textarea
                    value={newAbout}
                    onChange={handleAboutChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <div>
                    {memorialData?.about || "No about information available."}
                  </div>
                )}
                <button onClick={toggleEditAbout} className="ml-2">
                  <CiEdit size={22} />
                </button>
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
                      className="w-full h-[100px] md:h-[300px] lg:h-[400px] object-cover cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500">
                    No media available. Click the button below to upload photos.
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <label
                  htmlFor="mediaImageInput"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer"
                >
                  Upload Photos
                </label>
                <input
                  type="file"
                  id="mediaImageInput"
                  className="hidden"
                  onChange={handleMediaImageChange}
                  multiple
                />
              </div>
            </div>
          )}
          {activeTab === "tributes" && <div>Tributes content...</div>}
        </div>

        <button
          onClick={handleUpdate}
          className="fixed bottom-0 w-1/2 left-1/2 rounded-t-lg -translate-x-1/2 py-2 px-9 bg-black/90 hover:bg-black duration-200 cursor-pointer text-white"
        >
          Update
        </button>
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

export default Memorial;
