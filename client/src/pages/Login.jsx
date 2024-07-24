import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <div className="flex  flex-col items-center pt-[100px] min-h-screen bg-white">
      <div className=" w-full max-w-lg">
        <h2 className="text-2xl font-[700] mb-2 text-center">Login</h2>
        <p className="text-gray-600 mb-4 text-center">
          For login, no registration is necessary.
        </p>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border bg-gray-100 border-gray-300 rounded mb-4"
        />
        <button className="w-full font-[700] rounded-full bg-black/90 duration-200 hover:bg-black text-white p-3  mb-4">
          Sign in
        </button>
        <button className="w-full font-[700] bg-white border border-gray-300 hover:border-gray-600 duration-200 text-gray-700 p-3 rounded-full flex items-center justify-center">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
