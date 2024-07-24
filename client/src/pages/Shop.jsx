import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import FAQs from "../components/FAQs";
import GridFAQs from "../components/GridFAQs";

const Shop = () => {
  // Array of images
  const images = [
    "/src/assets/shop/img-1.webp",
    "/src/assets/shop/img-2.webp",
    "/src/assets/shop/img-3.webp",
    "/src/assets/shop/img-4.webp",
    "/src/assets/shop/img-5.webp",
  ];

  // State to keep track of the currently selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedOption, setSelectedOption] = useState("buy1");

  return (
    <div className="bg-white mt-[50px] py-[4%] px-[20px] lg:px-[60px]">
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col lg:flex-row gap-5 w-full h-[500px]">
          <div className=" flex lg:flex-col flex-row justify-between">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`cursor-pointer h-[50px] w-auto md:w-[100px] md:h-auto object-cover ${
                  selectedImage === image ? "border-2 border-black" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="w-full h-full overflow-hidden">
            <img
              src={selectedImage}
              alt="Selected"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-[700]">Pachet Pagina Memoriala</h3>
          <p>
            Save the most precious memories for eternity and share them with
            your loved ones
          </p>
          <div className="flex justify-between items-end">
            <div className="flex flex-col items-center mt-4">
              <div className="bg-green-700 text-white px-2 py-1 rounded">
                One time payment
              </div>
              <div className="ml-auto flex items-center">
                <span className=" text-xl">8.100 kr</span>
                <span className="ml-3 lg:ml-0 line-through text-gray-500">
                  DKK 13,500
                </span>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927C9.29 2.356 9.935 2 10.62 2s1.33.356 1.571.927l1.517 3.53 3.905.342c.653.057.912.842.435 1.27l-2.934 2.5.876 3.851c.14.616-.506 1.11-1.04.755L10 13.202l-3.35 2.474c-.535.354-1.18-.139-1.04-.755l.876-3.85-2.934-2.501c-.478-.428-.218-1.213.435-1.27l3.905-.342 1.517-3.53z" />
                  </svg>
                ))}
                <svg
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927C9.29 2.356 9.935 2 10.62 2s1.33.356 1.571.927l1.517 3.53 3.905.342c.653.057.912.842.435 1.27l-2.934 2.5.876 3.851c.14.616-.506 1.11-1.04.755L10 13.202l-3.35 2.474c-.535.354-1.18-.139-1.04-.755l.876-3.85-2.934-2.501c-.478-.428-.218-1.213.435-1.27l3.905-.342 1.517-3.53z" />
                </svg>
              </div>
              <span className="ml-2">(71)</span>
            </div>
          </div>
          <div className="text-green-700 mt-2">
            Includes FREE premium shipping
          </div>
          <div className="mt-4 space-y-5">
            <button
              className={`w-full flex justify-between items-center rounded-[20px] border-2 p-4 ${
                selectedOption === "buy1" ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedOption("buy1")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="buyOption"
                  className="custom-radio"
                  checked={selectedOption === "buy1"}
                  onChange={() => setSelectedOption("buy1")}
                />
                Buy 1
              </div>
              <div>
                <div className="text-black text-lg">DKK 8,100</div>
                <div className="line-through text-gray-500">DKK 13,500</div>
              </div>
            </button>
            <button
              className={`relative w-full flex justify-between items-center rounded-[20px] border-2 p-4 mt-2 ${
                selectedOption === "buy2" ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedOption("buy2")}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="buyOption"
                  className="custom-radio"
                  checked={selectedOption === "buy2"}
                  onChange={() => setSelectedOption("buy2")}
                />
                <div className="text-start">
                  <div>Buy 2</div>
                  <div className="text-sm text-gray-500">20% Discount</div>
                </div>
              </div>
              <div>
                <div className="text-black text-lg">DKK 12,960</div>
                <div className="line-through text-gray-500">DKK 16,200</div>
              </div>
              <div className="absolute -top-2 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded ml-2">
                Most Popular
              </div>
            </button>
          </div>

          <button className="bg-[#F9CA4F] my-6 font-[700] py-5 w-full">
            Add to Cart
          </button>

          <div className="py-12">
            <h3 className="text-2xl font-[700] font-berkshire">
              Ce este inclus
            </h3>
            <Accordion allowToggle className="py-[5%]   font-[700]">
              <AccordionItem>
                <h2>
                  <AccordionButton height={20}>
                    <Box as="span" flex="1" textAlign="left">
                      Toate amintirile frumoase la un loc
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="font-[400] text-start">
                  Creaza pagina memoriala asa cum doresti, cu posibilitatea de a
                  o modifica oricand. Orice vizitator al profilului are
                  posibilitatea de a impartasi condoleante, experiente sau
                  amintiri proprii cu beneficiarul paginii
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={20}>
                    <Box as="span" flex="1" textAlign="left">
                      Spatiu de stocare nelimitat?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="font-[400] text-start">
                  Poti adauga oricate amintiri doresti. Acestea pot include
                  text, poze sau linkuri cu filmulete.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={20}>
                    <Box as="span" flex="1" textAlign="left">
                      Mod privat sau public?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="font-[400] text-start">
                  Alege tu daca profilul poate fi vazut de catre oricine, sau
                  doar de catre apropiatii carora le trimiti tu linkul.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={20}>
                    <Box as="span" flex="1" textAlign="left">
                      Asigurare in caz de furt, pierdere sau deteriorare?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="font-[400] text-start">
                  Iti trimitem gratuit la schimb un cod QR in cazul in care cel
                  initial este furat, pierdut sau deteriorat.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton height={20}>
                    <Box as="span" flex="1" textAlign="left">
                      Stocare pe perioada nelimitata?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="font-[400] text-start">
                  Poti fi linistit de faptul ca amintirile incarcate pe profil
                  nu se vor pierde niciodata. Fara nici un cost lunar
                  suplimentar, iti oferit stocarea nelimitata a amintirilor.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <GridFAQs />
    </div>
  );
};

export default Shop;
