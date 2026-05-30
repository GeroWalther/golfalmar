// Statutory imprint / aviso legal for GOLF AL MAR.
// Spanish business based in Palma de Mallorca; covers LSSI-CE (Spain),
// with a German Impressum-style variant for DE visitors and an English
// version for the international audience.

import type { Locale } from "@/lib/constants";

const COMPANY = "GOLF AL MAR";
const ADDRESS_LINES = ["Vicari Joaquin Fuster 269", "07007 Palma de Mallorca", "España"];
const VAT_ID = "ESX5155070B";
const EMAIL = "info@golfalmar.com";

function AddressBlock() {
  return (
    <p>
      <strong>{COMPANY}</strong>
      <br />
      {ADDRESS_LINES.map((line, i) => (
        <span key={line}>
          {line}
          {i < ADDRESS_LINES.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function ImprintEn() {
  return (
    <>
      <h2>Provider</h2>
      <AddressBlock />

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>VAT identification number</h2>
      <p>
        EU VAT / NIF: <strong>{VAT_ID}</strong>
      </p>

      <h2>EU online dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute
        resolution (ODR):{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Our email address is shown above.
      </p>

      <h2>Consumer dispute resolution</h2>
      <p>
        We are neither willing nor obligated to participate in dispute
        resolution proceedings before a consumer arbitration board.
      </p>
    </>
  );
}

function ImprintDe() {
  return (
    <>
      <h2>Anbieter</h2>
      <AddressBlock />

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        EU-USt-IdNr / NIF: <strong>{VAT_ID}</strong>
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </>
  );
}

function ImprintEs() {
  return (
    <>
      <h2>Titular del sitio</h2>
      <AddressBlock />

      <h2>Contacto</h2>
      <p>
        Correo electrónico: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h2>NIF / NIE</h2>
      <p>
        NIF (IVA-UE): <strong>{VAT_ID}</strong>
      </p>

      <h2>Resolución de litigios en línea (UE)</h2>
      <p>
        La Comisión Europea proporciona una plataforma de resolución de litigios
        en línea (ODR):{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Nuestra dirección de correo electrónico aparece arriba.
      </p>

      <h2>Resolución de conflictos con consumidores</h2>
      <p>
        No estamos obligados ni dispuestos a participar en procedimientos de
        resolución de conflictos ante una junta de arbitraje de consumo.
      </p>
    </>
  );
}

export function ImprintContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <ImprintDe />;
  if (locale === "es") return <ImprintEs />;
  return <ImprintEn />;
}
