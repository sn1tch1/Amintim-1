import React, { useRef } from "react";

const CaptchaInput = () => {
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex px-[20px] flex-col items-center pt-[100px] min-h-screen bg-white">
      <div className=" w-full max-w-lg">
        <h2 className="text-3xl font-[700] mb-2 text-center">Check inbox</h2>
        <p className="text-gray-600 mb-4 text-center">
          We have sent you an email with your access link. Open the link or type
          in the Code.
        </p>
        <div className="flex justify-center mb-4 gap-2">
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-12 h-12 border bg-gray-100 border-gray-300 rounded text-center text-2xl"
              onChange={(e) => handleInputChange(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>
        <button className="w-full font-[700] rounded-full bg-black/90 duration-200 hover:bg-black text-white p-3  mb-4">
          Confirm with captcha
        </button>
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full font-[700] bg-black/90 duration-200 hover:bg-black text-white p-3 rounded-full mb-4">
          Resend email
        </button>
        <button className="w-full font-[700] bg-black/90 duration-200 hover:bg-black  text-white p-3 rounded-full">
          Confirm with a different Email
        </button>
      </div>
    </div>
  );
};

export default CaptchaInput;
