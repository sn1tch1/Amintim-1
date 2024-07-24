import React from "react";
import { FaCamera } from "react-icons/fa6";
import { Link } from "react-router-dom";

const QRLink = () => {
  const handleConnectNowClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();
      const newWindow = window.open("", "Camera", "width=600,height=400");
      newWindow.document.body.appendChild(videoElement);
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  return (
    <div className="flex flex-col mt-[50px] items-center justify-center min-h-screen bg-white px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Your Soul Star has <br /> not been linked yet.
      </h1>
      <p className="text-center mb-6">
        Please scan the QR-Code to link your account to the Soul Star.
      </p>
      <button
        onClick={handleConnectNowClick}
        className="bg-black/90 gap-3 hover:bg-black text-white py-4 px-6 rounded-md flex items-center justify-center mb-6"
      >
        <FaCamera size={20} />
        Connect now
      </button>
      <div className="flex items-center mb-6">
        <hr className="w-[200px] border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="w-[200px] border-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">
        Don't have a <br /> Soul Star yet?
      </h2>
      <p className="text-center mb-6">
        Order now and link it to your account to create a memorial page.
      </p>
      <Link to="/shop">
        <button className="bg-black/90 hover:bg-black text-white py-4 px-12 rounded-md">
          Buy Now
        </button>
      </Link>
    </div>
  );
};

export default QRLink;
