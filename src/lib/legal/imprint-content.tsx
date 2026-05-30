// Placeholder Impressum content. Replace the bracketed [...] markers with
// the real legal entity details before going live in any market that
// requires a statutory imprint (Germany / Austria most notably).

import type { Locale } from "@/lib/constants";

function PlaceholderNotice({ text }: { text: string }) {
  return (
    <p className="not-prose rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
      {text}
    </p>
  );
}

function ImprintEn({ notice }: { notice: string }) {
  return (
    <>
      <PlaceholderNotice text={notice} />

      <h2>Information per § 5 TMG (German Telemedia Act)</h2>
      <p>
        <strong>[COMPANY / LEGAL ENTITY NAME]</strong>
        <br />
        [STREET AND NUMBER]
        <br />
        [POSTAL CODE AND CITY]
        <br />
        [COUNTRY]
      </p>

      <h2>Represented by</h2>
      <p>[FIRST AND LAST NAME OF MANAGING DIRECTOR / OWNER]</p>

      <h2>Contact</h2>
      <p>
        Phone: [PHONE NUMBER]
        <br />
        Email: <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>
      </p>

      <h2>Commercial register</h2>
      <p>
        Registered in the commercial register.
        <br />
        Registering court: [REGISTERING COURT]
        <br />
        Registration number: [HRB / REGISTRATION NUMBER]
      </p>

      <h2>VAT identification number</h2>
      <p>
        VAT ID per § 27 a Umsatzsteuergesetz: <strong>[VAT ID]</strong>
      </p>

      <h2>Responsible for editorial content per § 18 MStV</h2>
      <p>
        [FIRST AND LAST NAME]
        <br />
        [ADDRESS, if different from above]
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

function ImprintDe({ notice }: { notice: string }) {
  return (
    <>
      <PlaceholderNotice text={notice} />

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>[FIRMENNAME / RECHTLICHE BEZEICHNUNG]</strong>
        <br />
        [STRASSE UND HAUSNUMMER]
        <br />
        [POSTLEITZAHL UND ORT]
        <br />
        [LAND]
      </p>

      <h2>Vertreten durch</h2>
      <p>[VOR- UND NACHNAME GESCHÄFTSFÜHRER:IN / INHABER:IN]</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [TELEFONNUMMER]
        <br />
        E-Mail: <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>
      </p>

      <h2>Registereintrag</h2>
      <p>
        Eintragung im Handelsregister.
        <br />
        Registergericht: [REGISTERGERICHT]
        <br />
        Registernummer: [HRB / REGISTRIERNUMMER]
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-ID gemäß § 27 a Umsatzsteuergesetz:{" "}
        <strong>[USt-IdNr]</strong>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [VOR- UND NACHNAME]
        <br />
        [ANSCHRIFT, falls abweichend]
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

function ImprintEs({ notice }: { notice: string }) {
  return (
    <>
      <PlaceholderNotice text={notice} />

      <h2>Datos identificativos (LSSI-CE)</h2>
      <p>
        <strong>[NOMBRE DE LA EMPRESA / RAZÓN SOCIAL]</strong>
        <br />
        [CALLE Y NÚMERO]
        <br />
        [CÓDIGO POSTAL Y LOCALIDAD]
        <br />
        [PAÍS]
      </p>

      <h2>Representado por</h2>
      <p>
        [NOMBRE Y APELLIDOS DEL ADMINISTRADOR(A) / TITULAR]
      </p>

      <h2>Contacto</h2>
      <p>
        Teléfono: [TELÉFONO]
        <br />
        Correo electrónico:{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>
      </p>

      <h2>Registro mercantil</h2>
      <p>
        Inscrita en el Registro Mercantil.
        <br />
        Registro: [REGISTRO MERCANTIL]
        <br />
        Número de inscripción: [NÚMERO]
      </p>

      <h2>NIF / CIF</h2>
      <p>
        Número de identificación fiscal: <strong>[NIF / CIF]</strong>
      </p>

      <h2>Responsable del contenido</h2>
      <p>
        [NOMBRE Y APELLIDOS]
        <br />
        [DIRECCIÓN, si difiere de la anterior]
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

export function ImprintContent({
  locale,
  notice,
}: {
  locale: Locale;
  notice: string;
}) {
  if (locale === "de") return <ImprintDe notice={notice} />;
  if (locale === "es") return <ImprintEs notice={notice} />;
  return <ImprintEn notice={notice} />;
}
