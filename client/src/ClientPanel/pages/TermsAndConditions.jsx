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
          Serviciul nostru permite crearea și gestionarea de pagini memoriale digitale personalizate. Vă asumați responsabilitatea pentru toate activitățile asociate contului dumneavoastră.
        </p>

        <h2 className="text-2xl font-semibold mt-4">3. Conținut</h2>
        <p>
          Generat de Utilizator: Sunteți singurul responsabil pentru conținutul pe care îl postați. Nu este permis conținutul ilegal, ofensator, care încalcă drepturile altora sau care promovează discriminarea.
Drepturi de Autor: Prin publicarea conținutului, acordați Amintim o licență limitată pentru a-l utiliza în cadrul serviciului.
        </p>

        <h2 className="text-2xl font-semibold mt-4">4. Plăți și Rambursări</h2>
        <p>
          Costuri: Prețul standard pentru crearea și gestionarea unei pagini memoriale digitale este de 280 RON. Ofertele promoționale pot modifica prețul. Vă rugăm să verificați site-ul pentru eventuale promoții active.
Modalități de Plată: Plata se realizează prin intermediul procesatorului de plăți Euplatesc.ro. Conform site-ului Euplatesc.ro ([link to euplatesc.ro payment methods]), aceștia acceptă carduri Visa și Mastercard. Vă rugăm să verificați opțiunile disponibile pe Euplatesc.ro pentru confirmare.
Rambursări: Dacă nu sunteți mulțumit de serviciul nostru, aveți dreptul la o rambursare completă a costului în termen de 30 de zile de la achiziție. Pentru a solicita o rambursare, vă rugăm să ne contactați la info@amintim.ro
        </p>

        <h2 className="text-2xl font-semibold mt-4">5. Protecția Datelor</h2>
        <p>
          Politica de Confidențialitate: Vă rugăm să consultați politica noastră de confidențialitate pentru a afla mai multe despre modul în care colectăm, prelucrăm și stocăm datele dumneavoastră personale.
Securitate: Implementăm măsuri de securitate adecvate pentru a proteja datele dumneavoastră personale.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Limitarea Răspunderii</h2>
        <p>
          Amintim nu este responsabil pentru niciun fel de daune directe, indirecte, incidentale sau consecutive care rezultă din utilizarea serviciului nostru, cu excepția cazurilor de neglijență gravă sau intenție.
        </p>
        <h2 className="text-2xl font-semibold mt-4">7. Ștergerea Contului</h2>
        <p>
          Puteți solicita ștergerea contului dumneavoastră și a paginii memoriale asociate printr-un email la adresa info@amintim.ro
          </p>
          <h2 className="text-2xl font-semibold mt-4">8. Modificări ale Termenilor</h2>
        <p>
          Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor intra în vigoare imediat ce sunt postate pe site.
          </p>
           <h2 className="text-2xl font-semibold mt-4">9. Forță Majoră</h2>
        <p>
          Amintim nu va fi răspunzător pentru neexecutarea sau executarea defectuoasă a obligațiilor sale contractuale dacă aceasta este cauzată de evenimente de forță majoră.
        </p>
          <h2 className="text-2xl font-semibold mt-4">10. Legislație Aplicabilă</h2>
        <p>
          Acești termeni și condiții sunt guvernați de legea română.
        </p>
        <h2 className="text-2xl font-semibold mt-4">11. Contact</h2>
        <p>
          Dacă aveți întrebări despre acești termeni, vă rugăm să ne contactați la info@amintim.ro.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
