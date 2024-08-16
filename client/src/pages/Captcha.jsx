import React, { useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import BaseURL from "../utils/BaseURL";
import { useAuth } from "../context/AuthContext";

const CaptchaInput = () => {
  const [code, setCode] = useState(Array(5).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const token = location.state.token;

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });
  };

  const handleVerification = async () => {
    try {
      const verificationCode = code.join("");
      const response = await axios.post(`${BaseURL}/users/verify`, {
        email,
        verificationCode,
      });

      if (response.status === 200) {
        toast.success(`Welcome ${email}`);
        localStorage.setItem("token", token);
        login();
        navigate("/");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying code. Please try again.");
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/users/resend`, { email });

      if (response.status === 200) {
        toast.success("Verification email resent successfully");
      } else {
        toast.error("Error resending verification email. Please try again.");
      }
    } catch (error) {
      toast.error("Error resending verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex px-[20px] flex-col items-center pt-[100px] min-h-screen bg-white">
      <div className="w-full max-w-lg">
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
              value={code[i]}
            />
          ))}
        </div>
        <button
          onClick={handleVerification}
          className="w-full font-[700] rounded-full bg-black/90 duration-200 hover:bg-black text-white p-3 mb-4"
        >
          Confirm with captcha
        </button>
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          disabled={loading}
          onClick={handleResendEmail}
          className={`w-full font-[700] rounded-full ${
            loading ? "bg-black/60" : "bg-black/90 hover:bg-black"
          } duration-200  text-white p-3 mb-4`}
        >
          {loading ? <Spinner /> : "Resend email"}
        </button>
        <Link to="/login">
          <button className="w-full font-[700] bg-black/90 duration-200 hover:bg-black text-white p-3 rounded-full">
            Confirm with a different Email
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CaptchaInput;
