import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const GridFAQs = () => {
  return (
    <section className="grid grid-cols-2  mx-auto text-center py-[2%] ">
      <div className="text-start space-y-6">
        <h3 className="text-3xl font-berkshire">
          Frequently asked questions and answers
        </h3>
        <p>
          Here you will find the most frequently asked questions. If you still
          have a question, please feel free to send us an email to
          support@remember-well.com or chat with us via Whatsapp.
        </p>
      </div>

      <Accordion
        allowToggle
        className="bg-[#F7F1D3] py-[5%] px-[8%] space-y-3 font-[600]"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Care sunt dimensiunile?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Fiecare cod QR are o dimensiune de 5cm x 5cm
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Ce costuri mai am?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Singurul cost este cel cu comanda initiala. Pagina va ramane activa
            pentru totdeauna, fara nici un alt cost lunar sau anual.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Pot crea un profil si pentru un animal de companie?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Singurul cost este cel cu comanda initiala. Pagina va ramane activa
            pentru totdeauna, fara nici un alt cost lunar sau anual.Sigur ca da.
            In momentul crearii profilului aveti posibilitatea de a alege intre
            persoana sau animal de companie.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Ce se intampla daca este furat sau se deterioreaza codul QR?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Oferim gratuit o placuta noua in cazurile de mai sus.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Cum se ataseaza codul QR pe o piatra funerara?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Pe spatele fiecarui cod QR este o folie adeziva. Asigurati-va ca
            locul in care se va lipi acesta este curat si uscat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Cat de rezistent este codul QR?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="font-[400] text-start">
            Daca este aplicat corect, codul QR ar trebui sa reziste fara
            probleme la ploaie, zapada, frig sau cald.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default GridFAQs;
