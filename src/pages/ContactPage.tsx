import React from "react";

function ContactPage() {
  return (
    <div className="text-sm">
      <h1 className="text-2xl font-bold">Kontakt</h1>
      <p className="mt-2 text-gray-500">
        Bei Fragen oder Anregungen kannst du mich gerne kontaktieren. Weitere Informationen unter https://aaron.de.
      </p>

      <h2 className="text-xl font-semibold mt-6">Impressum</h2>
      <p className="mt-1 text-gray-500">
        Aaron Kreis<br />
        Parkstr. 30<br />
        40477 Düsseldorf
      </p>

      <h2 className="text-xl font-semibold mt-6">Datenschutzerklärung</h2>
      <p className="mt-1 text-gray-500">
        Dieses Projekt ist ein nicht-kommerzielles, privates Open-Source-Übungsprojekt zur Vertiefung von React-Kenntnissen.
        Der Quellcode ist öffentlich einsehbar unter:{" "}
        <a
          href="https://github.com/netperformance/shopping"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          github.com/netperformance/shopping
        </a>
        .
      </p>

      <p className="mt-2 text-gray-500">
        Die Anwendung ist über{" "}
        <strong>shopping.aaron.de</strong> erreichbar, kann jedoch jederzeit offline genommen oder eingestellt werden. Es bestehen keine finanziellen Interessen. Es erfolgen keine Werbeschaltungen, Verkäufe oder Nutzeranalysen.
      </p>

      <p className="mt-2 text-gray-500">
        Die Anwendung nutzt{" "}
        <strong>Supabase</strong> als Authentifizierungs- und Datenbankdienstleister. Dort werden folgende personenbezogene Daten gespeichert:
      </p>
      <ul className="list-disc list-inside text-gray-500 mt-1">
        <li>E-Mail-Adresse (zur Anmeldung und Authentifizierung)</li>
        <li>Persönlich erstellte Einkaufslisten</li>
      </ul>

      <p className="mt-2 text-gray-500">
        Die Speicherung erfolgt auf Servern in den Vereinigten Staaten. Nutzer haben jederzeit die Möglichkeit, ihre Daten
        unter dem Menüpunkt <strong>„Profil“</strong> vollständig selbstständig zu löschen. Mit dem Löschen des Kontos werden automatisch auch alle zugehörigen Einkaufslisten entfernt.
      </p>

      <p className="mt-2 text-gray-500">
        Es findet keine Auswertung des Nutzerverhaltens statt. Die Anwendung enthält keine Tracking-Technologien, keine Analyse-Tools und keine externen Werbe-Skripte.
      </p>

      <p className="mt-2 text-gray-500">
        Eine Registrierung ist wahlweise über E-Mail/Passwort oder über Google (OAuth) möglich. Im Fall einer Anmeldung über Google erfolgt eine einmalige Verknüpfung mit deinem Google-Konto zur Authentifizierung.
      </p>

      <p className="mt-2 text-gray-500">
        Supabase kann im Rahmen der Authentifizierung Cookies setzen, um dich während einer Sitzung eingeloggt zu halten. Diese Cookies dienen ausschließlich der technischen Funktion und werden nicht zu Analysezwecken verwendet.
      </p>

      <p className="mt-2 text-gray-500">
        Weitere Informationen findest du in den Datenschutzerklärungen der eingesetzten Dienste:
      </p>
      <ul className="list-disc list-inside text-gray-500 mt-1">
        <li>
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Supabase Datenschutzerklärung
          </a>
        </li>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Google Datenschutzerklärung
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ContactPage;
