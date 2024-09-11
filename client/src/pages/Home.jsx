import React, { useEffect, useState } from "react";
import FAQs from "../components/FAQs";
import SideBar from "../components/SideDrawer";
import BG from "../assets/home/bkg2.webp";
import Carousel from "../components/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#f7f7f7]">
      <section
        className="h-[600px] relative text-center max-h-[800px] text-white w-full font-[500] flex flex-col items-center justify-center gap-7 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <span className="absolute top-0 z-10 w-full h-full bg-black/20"></span>
        <h2 className="text-3xl lg:text-5xl z-20 font-berkshire">Un singur loc pentru toate amintirile frumoase</h2>
        <button
          onClick={handleClick}
          className="py-4 px-6 z-20 bg-white text-black hover:text-white hover:bg-transparent border-white border-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Creeaza o pagina memoriala
        </button>
      </section>

      <section className="py-[6%] mx-auto w-[90%] lg:w-[60%]  flex flex-col items-center gap-12">
        <h1 className="text-3xl lg:text-5xl text-center lg:text-start font-berkshire ">
          O pagina memoriala, personalizata
        </h1>
        <div className="font-[300] text-center">
          <p>
            Amintim iti da posibilitatea de a crea o pagina memoriala pentru cei
            dragi, care nu mai sunt printre noi. Adauga tot ce consideri ca i-a
            reprezentat cel mai bine, o biografie sau poze si filmulete.
            Impartaseste amintirea acestora cu altii printr-un cod QR care se
            genereaza in momentul in care profilul este creat.
          </p>
          <p>Create your memory.</p>
        </div>
        <Link to="/shop" className="block">
          <button className="w-full h-full py-4 px-6 bg-black text-white hover:text-black hover:bg-transparent border-black border-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            Salveaza amintirile frumoase
          </button>
        </Link>
      </section>

      <Carousel />
      <SideBar />
      <FAQs />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
