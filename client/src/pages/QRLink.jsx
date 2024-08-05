import React from "react";
import { Link } from "react-router-dom";

const QRLink = () => {
  return (
    <div className="flex flex-col mt-[50px] items-center justify-center min-h-screen bg-white px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Your Soul Star has <br /> not been linked yet.
      </h1>
      <p className="text-center mb-6">
        You can either create a new Soul Star profile or wait to link it once
        the QR Code is available.
      </p>
      <div className="flex gap-4 mb-6">
        <Link to="/tribute">
          <button className="bg-black/90 hover:bg-black text-white py-4 px-6 rounded-md">
            Build Soul Star Profile
          </button>
        </Link>
      </div>
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
