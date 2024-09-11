import React, { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Termeni si Conditii</h1>
      <div className="space-y-4">
        <p>
          Bine ați venit pe site-ul Amintim. Vă rugăm să citiți cu atenție următorii termeni și condiții înainte de a utiliza serviciile noastre.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4">1. Acceptarea Termenilor</h2>
        <p>
          Prin utilizarea site-ului nostru, acceptați să respectați acești termeni și condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul nostru.
        </p>

        <h2 className="text-2xl font-semibold mt-4">2. Utilizarea Serviciului</h2>
        <p>
          Serviciul nostru permite crearea și gestionarea de pagini memoriale digitale. Vă asumați responsabilitatea pentru toate activitățile asociate contului dumneavoastră.
        </p>

        <h2 className="text-2xl font-semibold mt-4">3. Conținut</h2>
        <p>
          Sunteți responsabil pentru conținutul pe care îl postați. Nu este permis conținutul ilegal, ofensator sau care încalcă drepturile altora.
        </p>

        <h2 className="text-2xl font-semibold mt-4">4. Proprietate Intelectuală</h2>
        <p>
          Conținutul și designul site-ului sunt proprietatea Amintim. Nu aveți permisiunea să copiați sau să distribuiți acest conținut fără acordul nostru.
        </p>

        <h2 className="text-2xl font-semibold mt-4">5. Limitarea Răspunderii</h2>
        <p>
          Amintim nu este responsabil pentru niciun fel de daune directe, indirecte, incidentale sau consecvente care rezultă din utilizarea serviciului nostru.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Modificări ale Termenilor</h2>
        <p>
          Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor intra în vigoare imediat ce sunt postate pe site.
        </p>

        <h2 className="text-2xl font-semibold mt-4">7. Contact</h2>
        <p>
          Dacă aveți întrebări despre acești termeni, vă rugăm să ne contactați la [adresa de email].
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
