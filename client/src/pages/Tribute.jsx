import React, { useState } from "react";

const TributePageSetup = () => {
  const [selectedTab, setSelectedTab] = useState("Human");

  return (
    <div className="p-4  mx-auto bg-white rounded-lg shadow-md py-[80px]">
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
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="title"
            type="text"
            placeholder="Title"
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
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="lastName">
            Introductory Note
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="note"
            type="text"
            placeholder="Introductory Note"
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="lastName">
            Date of Birth
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="dob"
            type="date"
            // placeholder="Last Name"
          />
        </div>
        <div>
          <label className="block font-medium mb-2" htmlFor="lastName">
            Date of Passing
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            id="dop"
            type="date"
            // placeholder="Last Name"
          />
        </div>
        <button className="flex w-full p-3 text-center items-center justify-center bg-black/90 text-white rounded-full hover:bg-black duration-200">
          Save
        </button>
      </form>
    </div>
  );
};

export default TributePageSetup;
