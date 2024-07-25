import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import coverAvatar from "../assets/cover.png";
import { CiEdit } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Memorial = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [mediaImages, setMediaImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleMediaImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setMediaImages((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).forEach((file) => URL.revokeObjectURL(file));
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

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-white">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={coverImage || coverAvatar}
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
              src={profileImage || avatar}
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
        <div className="text-center mt-2">
          <h2 className="text-xl">In memory of</h2>
          <p className="text-gray-600 text-lg font-bold font-berkshire">
            John Yeaaah
          </p>
          <p className="text-gray-600 font-bold">* 27.02.2002</p>
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
      <div className="bg-white mt-4">
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
          {activeTab === "about" && <div>About me content...</div>}
          {activeTab === "media" && (
            <div>
              <div className="grid grid-cols-3 gap-2">
                {mediaImages.length > 0 ? (
                  mediaImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
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
              src={mediaImages[selectedImageIndex]}
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
