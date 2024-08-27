import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const QRLink = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col mt-[50px] items-center justify-center min-h-screen bg-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-2">
        Creeaza Pagina Memoriala.
      </h1>
      <p className="text-center mb-6">
        Daca deja ai cumparat o pagina memoriala, poti incepe sa o creezi! 
      </p>
      <div className="flex gap-4 mb-6">
        <Link to="/tribute">
          <button className="bg-black/90 hover:bg-black text-white py-4 px-6 rounded-md">
            Creeaza Pagina
          </button>
        </Link>
      </div>
      <div className="flex items-center mb-6">
        <hr className="w-[200px] border-gray-300" />
        <span className="mx-2 text-gray-500">sau</span>
        <hr className="w-[200px] border-gray-300" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">
        Cumpara Pagina Memoriala.
      </h2>
      <p className="text-center mb-6">
        Comanda acum Pagina Memoriala si poti apoi incepe sa o creezi!
      </p>
      <Link to="/shop">
        <button className="bg-black/90 hover:bg-black text-white py-4 px-12 rounded-md">
          Cumpara
        </button>
      </Link>
    </div>
  );
};

export default QRLink;
