import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BaseURL from "../../utils/BaseURL";

const Congratulations = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleProceed = () => {
    navigate("/tribute");
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
            navigate("/failure");
          } else {
            handleCache();
          }
        } else {
          navigate("/failure");
        }
      } else {
        navigate("/failure");
      }   
    }

    const handleGetPurchaseByKey = async (key) => {
      try {        
        console.log("key: ", key);
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
          console.log(data);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkURLSearchParams();
  }, []);

  const handleCache = () => {
    toast.success("Soulstar Purchased");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("discountAmount");
    localStorage.removeItem("isReferralApplied");
    clearCart();

    // navigate("/congratulations");
    console.log("Purchase successful:", data);    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-10 rounded text-center max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 font-berkshire">
          Felicitari!
        </h1>
        <p className="mb-4">Tranzactia a fost cu succes!.</p>
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
          <p className="mb-4">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mb-4">
              <li>
                <strong>Save Your Key:</strong> This unique key is required to
                create a SoulStar profile for your loved one. Please keep this
                key safe and do not share it with others.
              </li>
              <li>
                <strong>Create a SoulStar Profile:</strong> Visit our{" "}
                <Link to="/tribute" className="text-blue-500 hover:underline">
                  profile creation page
                </Link>
                , enter the unique key you received in this email, and follow
                the on-screen instructions to complete the profile setup for
                your loved one.
              </li>
              <li>
                <strong>Important:</strong> The key is usable only once per
                account. Make sure to complete the profile setup as soon as
                possible to ensure the proper creation of your SoulStar.
              </li>
            </ol>
            If you encounter any issues or have any questions, please don't
            hesitate to contact our support team at{" "}
            <a
              href="mailto:support-email@example.com"
              className="text-blue-500 hover:underline"
            >
              support-email@example.com
            </a>
            .
          </p>
        </div>
        <button
          onClick={handleProceed}
          className="hover:bg-black text-white py-4 px-8  bg-black/90 duration-200"
        >
          Acum poti sa creezi profilul memorial
        </button>
      </div>
    </div>
  );
};

export default Congratulations;
