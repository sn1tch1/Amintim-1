import React, { useEffect } from 'react';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Politica de Cookie-uri</h1>
      <div className="space-y-4">
        <p>
          Această politică de cookie-uri explică ce sunt cookie-urile și cum le folosim pe site-ul Amintim. Vă rugăm să citiți această politică pentru a înțelege ce tipuri de cookie-uri folosim, informațiile pe care le colectăm folosind cookie-urile și cum sunt utilizate aceste informații.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4">Ce sunt cookie-urile?</h2>
        <p>
          Cookie-urile sunt fișiere text mici care sunt plasate pe computerul sau dispozitivul dumneavoastră mobil atunci când vizitați un site web. Acestea sunt folosite pe scară largă pentru a face site-urile web să funcționeze sau să funcționeze mai eficient, precum și pentru a furniza informații proprietarilor site-ului.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Cum folosim cookie-urile?</h2>
        <p>
          Folosim cookie-uri pentru a:
        </p>
        <ul className="list-disc list-inside">
          <li>Înțelege cum utilizați site-ul nostru</li>
          <li>Îmbunătăți experiența dumneavoastră pe site</li>
          <li>Memora preferințele dumneavoastră</li>
          <li>Vă oferi conținut și publicitate relevante</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Tipuri de cookie-uri pe care le folosim</h2>
        <p>
          Folosim următoarele tipuri de cookie-uri:
        </p>
        <ul className="list-disc list-inside">
          <li>Cookie-uri strict necesare: Aceste cookie-uri sunt esențiale pentru funcționarea site-ului nostru.</li>
          <li>Cookie-uri de analiză/performanță: Ne ajută să înțelegem cum utilizați site-ul nostru.</li>
          <li>Cookie-uri de funcționalitate: Acestea vă recunosc atunci când reveniți pe site-ul nostru și ne permit să personalizăm conținutul pentru dumneavoastră.</li>
          <li>Cookie-uri de direcționare: Acestea înregistrează vizita dumneavoastră pe site-ul nostru, paginile pe care le-ați vizitat și link-urile pe care le-ați urmat.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Cum să controlați cookie-urile</h2>
        <p>
          Puteți controla și/sau șterge cookie-urile după cum doriți. Pentru detalii, consultați aboutcookies.org. Puteți șterge toate cookie-urile care sunt deja pe computerul dumneavoastră și puteți seta majoritatea browserelor pentru a împiedica plasarea acestora.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Mai multe informații</h2>
        <p>
          Pentru mai multe informații despre cum utilizăm cookie-urile sau despre drepturile dumneavoastră, vă rugăm să ne contactați la [adresa de email].
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;
