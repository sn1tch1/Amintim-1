import React from "react";
import FAQs from "../components/FAQs";
import SideBar from "../components/SideDrawer";
import BG from "../assets/home/img-1.webp";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="bg-[#f7f7f7]">
      <section
        className="h-[600px] relative text-center max-h-[800px] text-white w-full font-[500] flex flex-col items-center justify-center gap-7 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <span className="absolute top-0 z-10 w-full h-full bg-black/20"></span>

        <p className="z-20">Memories that last forever</p>
        <h2 className="text-5xl z-20 font-berkshire">Your soul star</h2>
        <button className="py-4 px-6 z-20 bg-white text-black hover:text-white hover:bg-transparent border-white border-2 ">
          To your soul star
        </button>
      </section>

      <section className="py-[6%] mx-auto w-[90%] lg:w-[60%]  flex flex-col items-center gap-12">
        {/* <p>So that your loved ones will always be remembered:</p> */}
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
        <button className="py-4 px-6 bg-black text-white hover:text-black hover:bg-transparent border-black border-2 ">
          To your soul star
        </button>
      </section>

      {/* <Carousel /> */}

      <SideBar />

      <FAQs />
    </div>
  );
};

export default Home;
