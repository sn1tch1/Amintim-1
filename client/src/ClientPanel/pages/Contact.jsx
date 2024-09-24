import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <section className="md:py-[5%] md:min-h-screen px-[4%] font-[700] grid md:grid-cols-2 items-center gap-12 pt-[100px] pb-[50px]">
        <div>
          <h3 className="text-3xl pb-8 font-berkshire">Aveti o intrebare?</h3>
          <p>
            Suntem aici ca sa va ajutam! Va rugam completati formularul de
            contact de mai jos si incercam sa revenim cu un raspuns cat de
            curand posibil.
          </p>
        </div>
        <div className="bg-[#F7F7F7] p-5 space-y-4">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Nume"
              className="py-4 px-8 font-[300] bg-white border-[2px] border-gray-300 w-full outline-none rounded-md"
            />
            <input
              type="text"
              placeholder="Email"
              className="py-4 px-8 font-[300] bg-white border-[2px] border-gray-300 w-full outline-none rounded-md"
            />
          </div>
          <textarea
            type="text"
            // cols={12}
            rows={3}
            placeholder="Mesaj"
            className="py-4 px-8 bg-white border-[2px] border-gray-300 font-[300] w-full outline-none rounded-md"
          />
          <button className="py-4 px-6 my-4 bg-black/90 text-white hover:bg-black duration-200 rounded-full w-full">
            Trimite
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
