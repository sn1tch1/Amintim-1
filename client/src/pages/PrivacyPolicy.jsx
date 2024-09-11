import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Politica de Confidențialitate</h1>
      <div className="space-y-4">
        <p>
          La Amintim, respectăm confidențialitatea vizitatorilor noștri și suntem dedicați protejării informațiilor personale. Această politică de confidențialitate explică cum colectăm, folosim și protejăm datele dumneavoastră personale.
        </p>
        
        <h2 className="text-2xl font-semibold mt-4">Informațiile pe care le colectăm</h2>
        <p>
          Putem colecta următoarele tipuri de informații:
        </p>
        <ul className="list-disc list-inside">
          <li>Informații de identificare personală (nume, adresă de e-mail, număr de telefon etc.)</li>
          <li>Informații demografice</li>
          <li>Informații despre utilizarea site-ului nostru</li>
          <li>Alte informații pe care alegeți să ni le furnizați</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Cum folosim informațiile dumneavoastră</h2>
        <p>
          Folosim informațiile colectate pentru a:
        </p>
        <ul className="list-disc list-inside">
          <li>Furniza, opera și menține site-ul nostru</li>
          <li>Îmbunătăți experiența utilizatorilor noștri</li>
          <li>Înțelege cum utilizatorii noștri folosesc site-ul</li>
          <li>Dezvolta noi produse, servicii, caracteristici și funcționalități</li>
          <li>Comunica cu dumneavoastră, direct sau prin partenerii noștri</li>
          <li>Detecta, preveni și aborda probleme tehnice</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Protecția informațiilor</h2>
        <p>
          Luăm măsuri de securitate pentru a proteja informațiile dumneavoastră împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii. Acestea includ criptarea, firewall-uri, și alte măsuri de securitate.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Împărtășirea informațiilor</h2>
        <p>
          Nu vindem, nu comercializăm și nu transferăm în alt mod terților informațiile dumneavoastră de identificare personală. Acest lucru nu include terții de încredere care ne asistă în operarea site-ului nostru web, desfășurarea afacerii noastre sau deservirea dumneavoastră, atât timp cât aceste părți sunt de acord să păstreze aceste informații confidențiale.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Drepturile dumneavoastră</h2>
        <p>
          Aveți dreptul să accesați, să corectați sau să ștergeți informațiile personale pe care le deținem despre dumneavoastră. De asemenea, aveți dreptul de a restricționa sau de a vă opune prelucrării datelor dumneavoastră personale în anumite circumstanțe.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Modificări ale acestei politici</h2>
        <p>
          Putem actualiza această politică de confidențialitate din când în când. Vă vom notifica despre orice modificări prin postarea noii politici de confidențialitate pe această pagină.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Contact</h2>
        <p>
          Dacă aveți întrebări despre această politică de confidențialitate, vă rugăm să ne contactați la [adresa de email].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
