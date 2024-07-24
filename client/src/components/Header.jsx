import React from "react";

const Header = () => {
  return (
    <header className="bg-white p-4 border-black border-b-2 fixed top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl mx-auto font-bold">Amintim✨</h1>
        <button className="text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
