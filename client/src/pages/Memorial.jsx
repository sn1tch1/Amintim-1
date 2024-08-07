import React, { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../assets/avatar.png";
import { format } from "date-fns";
import coverAvatar from "../assets/cover.png";
import { Link, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { FaBirthdayCake } from "react-icons/fa";
import { GiGraveFlowers } from "react-icons/gi";
import { ModalCloseButton, Spinner, useDisclosure } from "@chakra-ui/react";
import BaseURL, { IMAGES_BASE_URL } from "../utils/BaseURL";
import {
  Modal,
  ModalContent,
  Button,
  ModalOverlay,
  ModalBody,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { useClipboard } from "@chakra-ui/react";

const Memorial = () => {
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(coverAvatar);
  const [activeTab, setActiveTab] = useState("about");
  const [mediaImages, setMediaImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memorialData, setMemorialData] = useState(null);
  const [newTribute, setNewTribute] = useState("");
  const imageUrl = `${IMAGES_BASE_URL}/uploads/QRs/${id}.png`;
  const { hasCopied, onCopy } = useClipboard(imageUrl);
  const formattedDeathDate = memorialData
    ? format(new Date(memorialData?.deathDate), "dd MMMM yyyy")
    : "";
  const formattedBirthDate = memorialData
    ? format(new Date(memorialData?.birthDate), "dd MMMM yyyy")
    : "";
  const [newAbout, setNewAbout] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
  const [isEditingDeathDate, setIsEditingDeathDate] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [QRCode, setQRCode] = useState("");
  const [newMiddleName, setNewMiddleName] = useState("");
  const [tributes, setTributes] = useState([]);
  const [newLastName, setNewLastName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newDeathDate, setNewDeathDate] = useState("");
  const handleFirstNameChange = (e) => setNewFirstName(e.target.value);
  const handleMiddleNameChange = (e) => setNewMiddleName(e.target.value);
  const handleLastNameChange = (e) => setNewLastName(e.target.value);
  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const handleTributeChange = (event) => {
    setNewTribute(event.target.value);
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
        setQRCode(response.data.QRCode);
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
      const response = await axios.post(`${BaseURL}/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const { url } = response.data;
        if (type === "profileImage") {
          console.log(url);
          setProfileImage(url);
          console.log(profileImage);
        } else if (type === "coverImage") {
          setCoverImage(url);
        } else if (type === "mediaImages") {
          setMediaImages((prevImages) => [...prevImages, ...url]);
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
        `${BaseURL}/users/upload/media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const filenames = response.data.urls;

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
        `${BaseURL}/memorial/${id}`,
        {
          profileImage,
          coverImage,
          gallery: mediaImages,
          birthDate: newBirthDate,
          deathDate: newDeathDate,
          about: newAbout,
          firstName: newFirstName,
          middleName: newMiddleName,
          lastName: newLastName,
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

  const handleTributeSubmit = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      await axios.post(
        `${BaseURL}/tributes/create/${id}`,
        {
          message: newTribute,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      setNewTribute("");
      // Optionally refetch tributes or update state
      toast.success("Tribute added successfully!");
    } catch (error) {
      toast.error("Failed to add tribute.");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    saveAs(imageUrl);
  };

  return (
    <>
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
                src={coverImage}
                alt="Cover"
                className="w-full h-[150px] object-cover"
              />
            )}
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
              {!profileImage ? (
                <img
                  src={`/src/assets/avatar.png`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
                />
              ) : (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
                />
              )}
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
            {isEditingName ? (
              <div>
                <input
                  type="text"
                  value={newFirstName}
                  onChange={handleFirstNameChange}
                  className="border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={newMiddleName}
                  onChange={handleMiddleNameChange}
                  className="border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={newLastName}
                  onChange={handleLastNameChange}
                  className="border rounded px-2 py-1"
                />
                <button onClick={toggleEditName} className="ml-2">
                  <CiEdit size={22} />
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-lg font-bold font-berkshire">
                {newFirstName} {newMiddleName} {newLastName}
                <button onClick={toggleEditName} className="ml-2">
                  <CiEdit size={22} />
                </button>
              </p>
            )}
            <div className="flex gap-6 items-center justify-center">
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
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              // to="/manage-account/settings"
              onClick={onOpen}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              QR Code
            </button>
            <Link
              to={`/profile/view/${id}`}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Preview Profile
            </Link>
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
                    <div>
                      <textarea
                        value={newAbout}
                        onChange={(e) => setNewAbout(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                      <button onClick={toggleEditAbout} className="ml-2">
                        <CiEdit size={22} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      {newAbout || "No about information available."}
                      <button onClick={toggleEditAbout} className="ml-2">
                        <CiEdit size={22} />
                      </button>
                    </div>
                  )}
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
                        src={image}
                        alt={`Media ${index}`}
                        className="w-full h-[120px] sm:h-[200px] md:h-[300px] lg:h-[400px] object-cover cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center text-gray-500">
                      No media available. Click the button below to upload
                      photos.
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
                      {tributes?.map((tribute) => (
                        <div
                          key={tribute._id}
                          className="flex items-start border border-black rounded-lg p-4 shadow-lg bg-gray-50"
                        >
                          <div className="flex-shrink-0 mr-4">
                            {tribute.user.profileImage && (
                              <img
                                src={tribute.user.profileImage}
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
                                {new Date(
                                  tribute.createdAt
                                ).toLocaleDateString()}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="4"
          >
            <ModalCloseButton />
            <img src={QRCode} alt="QR Code" />
            <Button onClick={handleDownload} colorScheme="blue" mt="4">
              Download
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Memorial;
