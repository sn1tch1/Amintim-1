import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Proceed = () => {
  const [selectedOption, setSelectedOption] = useState("new");
  const navigate = useNavigate();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleContinue = () => {
    // Logic to handle the continue action based on the selected option
    navigate("/memorial/profile");
    if (selectedOption === "new") {
      console.log("Creating a new tribute page");
    } else {
      console.log("Linking to an existing tribute page");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">Success!</h1>
      <p className="text-center mb-4">Choose how you'd like to proceed.</p>
      <div className="flex flex-col items-start mb-4">
        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="new"
            checked={selectedOption === "new"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Create a New Tribute Page
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="existing"
            checked={selectedOption === "existing"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Link to an Existing Tribute Page
        </label>
      </div>
      <button
        onClick={handleContinue}
        className="bg-black/90 hover:bg-black text-white py-2 px-6 rounded-md"
      >
        Continue
      </button>
    </div>
  );
};

export default Proceed;
