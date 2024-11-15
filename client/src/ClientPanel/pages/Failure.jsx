import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BaseURL from "../../utils/BaseURL";

const Failure = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleProceed = () => {
    navigate("/");
  };

  useEffect(() => {
    // Scroll to the top of the page
    const checkURLSearchParams = async () => {
      const searchParams = new URLSearchParams(search);
      if (searchParams) {
        const key = searchParams.get("key");
        if (key) {
          const res =  await handleGetPurchaseByKey(key);
          console.log(res);
          if (!res) {
            // navigate("/checkout");
          }
        }
      }   
    }

    const handleGetPurchaseByKey = async (key) => {
      try {        
        // console.log("key: ", key);
        const response = await fetch(`${BaseURL}/purchase/get-purchase/${key}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to get purchase by key");
        }

        const data = await response.json();

        if (data) {
          // Process the data
          // console.log(data);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkURLSearchParams();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-10 rounded text-center max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 font-berkshire">
          Eroare!
        </h1>
        <p className="mb-4">Tranzactia a esuat!.</p>
        <p className="mb-4">
          Please check your email for further instructions.
        </p>
        <div className="mb-6 text-left">
          <p className="mb-2">
            <strong>Important Instructions:</strong>
          </p>
          <p className="mb-4">
            <strong>Key for Your Purchase:</strong> Your unique key will be sent
            to your email.
          </p>

        </div>
        <button
          onClick={handleProceed}
          className="hover:bg-black text-white py-4 px-8  bg-black/90 duration-200"
        >
          Acasa
        </button>
      </div>
    </div>
  );
};

export default Failure;
