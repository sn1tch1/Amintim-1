import React, { useEffect } from "react";
import Image1 from "../../assets/about/img-1.webp";
import Image2 from "../../assets/about/img-2.webp";
import Image3 from "../../assets/about/img-3.webp";
import HappyCustomersCarousel from "../components/Testimonials";

const About = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <section className="py-[90px] lg:py-[8%] px-[20px] lg:px-[10%] font-[700]">
        <div className="text-center">
          <h1 className="text-5xl  font-berkshire">
            Pastram Amintirile vii cu Ajutorul Tehnologiei
          </h1>
          <p className="py-8 leading-[32px] text-justify">
            Stim cat de dureroasa este pierderea unei persoane dragi. Credem ca
            memoria lor merita sa fie pastrata vie, iar povestea lor si impactul
            pe care l-au avut asupra celor din jur sa fie impartasite. Asta ne-a
            motivat sa cream aceasta platforma - un spatiu dedicat familiilor si
            prietenilor care doresc sa creeze online memoriale frumoase si
            emotionante. Instrumentele noastre intuitive va ajuta sa: <br />
            <span className="italic">Creati un profil plin de suflet</span> -
            Spuneti povestea vietii persoanei dragi cu ajutorul fotografiilor,
            videoclipurilor si amintirilor pretioase.
            <br />
            <span className="italic">Ramaneti conectati cu cei dragi</span> -
            Invitati familia si prietenii sa contribuie cu propriile povesti si
            amintiri, creand o comunitate online durabila unde sa impartasiti
            durerea si dragostea.
            <br />
            <span className="italic">Unim lumea fizica cu cea digitala</span> -
            Generati un cod QR pe care sa-l asezati pe piatra funerara sau pe
            locul de veci. Scanand codul cu telefonul mobil, vizitatorii vor fi
            directionati automat catre memorialul online, unde pot afla mai
            multe despre persoana draga si pot lasa mesaje de condoleante.
          </p>
        </div>

        <div className="space-y-16 py-12">
          <div className="grid lg:grid-cols-2 gap-12 h-[500px] items-center">
            <div className="space-y-8 text-center">
              <h3 className="text-3xl font-berkshire">Viziunea noastra</h3>
              <p>
                Suntem dedicati crearii unui spatiu pentru vindecare si
                rememorare. Echipa noastra se asigura ca oferim o platforma de
                incredere si respect care onoreaza vietile celor care nu mai
                sunt printre noi.
              </p>
            </div>
            <div className="h-full w-full overflow-hidden">
              <img src={Image1} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 h-[500px] items-center">
            <div className="order-2 lg:order-1 h-full w-full overflow-hidden">
              <img src={Image2} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="order-1 lg:order-2 space-y-8 text-center">
              <h3 className="text-3xl font-berkshire">De ce facem asta</h3>
              <p>
                Credem cu tarie ca tehnologia ne poate conecta chiar si in
                momentele grele. Amintim va ajuta sa pastrati vie memoria
                persoanei dragi si sa o impartasiti cu generatiile viitoare.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 h-[500px] items-center">
            <div className="space-y-8 text-center">
              <h3 className="text-3xl font-berkshire">Sa Amintim…</h3>
              <p>
                Ati pierdut pe cineva? Va invitam sa creati un memorial pentru
                persoana iubita si sa impartasiti povestea ei cu lumea.
              </p>
            </div>
            <div className="h-full w-full overflow-hidden">
              <img
                src={Image3}
                alt=""
                className="h-full w-auto mx-auto object-contain"
              />
            </div>
          </div>
        </div>

        <HappyCustomersCarousel />
      </section>
    </div>
  );
};

export default About;
