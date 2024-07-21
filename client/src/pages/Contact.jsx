import React from "react";

const Contact = () => {
  return (
    <div>
      <section className="py-[5%] min-h-screen px-[4%] font-[700] grid grid-cols-2 items-center gap-12">
        <div>
          <h3 className="text-3xl pb-8 font-berkshire">Aveti o intrebare?</h3>
          <p>
            Suntem aici ca sa va ajutam! Va rugam completati formularul de
            contact de mai jos si incercam sa revenim cu un raspuns cat de
            curand posibil.
          </p>
        </div>
        <div className="bg-[#D1D1D1] p-5 space-y-4">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Nume"
              className="py-4 px-8 font-mono font-[300] bg-transparent border-[2px] border-gray-400 w-full outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              className="py-4 px-8 font-mono font-[300] bg-transparent border-[2px] border-gray-400 w-full outline-none"
            />
          </div>
          <textarea
            type="text"
            // cols={12}
            rows={3}
            placeholder="Mesaj"
            className="py-4 px-8 font-mono bg-transparent border-[2px] border-gray-400 font-[300] w-full outline-none"
          />
          <button className="py-4 px-6 my-4 bg-black text-white hover:text-black hover:bg-transparent border-black border-2 ">
            Trimite
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
