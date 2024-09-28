import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import BaseURL from "../../utils/BaseURL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSignIn = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setLoading(true);

      try {
        const response = await axios.post(`${BaseURL}/users/register`, {
          email,
        });
        if (response.status === 201) {
          toast.success("Verificati adresa de email");
          let token = response?.data?.token;
          navigate("/verify", { state: { email, token } });
        } else if (response.status === 200) {
          toast.success("Logged In Successfully");
          localStorage.setItem("token", response?.data?.token);
          // localStorage.setItem("user", response?.data?.user);

          // localStorage.setItem("role", "admin");
          navigate("/manage-account/settings");
          login();
        } else {
          console.log("responseeee", response);
          toast.error("Eroare de logare. Va rugam sa incercati din nou.");
        }
      } catch (error) {
        toast.error("Eroare de logare. Va rugam sa incercati din nou.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Va rugam sa introduceti o adresa de email valida");
    }
  };

  return (
    <div className="flex px-[20px] flex-col items-center pt-[100px] min-h-screen bg-white">
      <Header />
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-[700] mb-2 text-center">Login</h2>
        <p className="text-gray-600 mb-4 text-center">
          Pentru autentificare nu este necesara inregistrarea.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border bg-gray-100 border-gray-300 rounded mb-4"
        />
        <button
          disabled={loading}
          onClick={handleSignIn}
          className={`w-full font-[700] rounded-full ${
            loading ? "bg-black/60" : "bg-black/90 hover:bg-black"
          } duration-200  text-white p-3 mb-4`}
        >
          {loading ? <Spinner /> : "Sign in"}
        </button>
        {/* <button className="w-full font-[700] bg-white border border-gray-300 hover:border-gray-600 duration-200 text-gray-700 p-3 rounded-full flex items-center justify-center">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Conectare cu Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
