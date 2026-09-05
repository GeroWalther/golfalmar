// GOLF AL MAR privacy policy — three language variants.
//
// Modernised and rewritten from a prior policy. Accurately reflects the
// current stack: Stripe payments, Resend transactional + newsletter email,
// Vercel hosting + Vercel Blob + Vercel Analytics, MongoDB Atlas database.
// No PayPal, no user accounts, no Facebook/Instagram apps, no Google Ads.
//
// This is a strong, GDPR-aligned starting point. We still recommend a
// lawyer review before going live in production.

import type { Locale } from "@/lib/constants";

function PrivacyEn() {
  return (
    <>
      <p>
        When you provide information to us through{" "}
        <a href="https://www.golfalmar.com">www.golfalmar.com</a> we respect
        your privacy and process your personal data in accordance with the EU
        General Data Protection Regulation (GDPR). This Privacy Policy explains
        what we collect, how we use it, who we share it with, and the rights
        you have over your data. Your use of the site is subject to this
        Privacy Policy and our Terms.
      </p>

      <h2>1. Who we are</h2>
      <p>
        GOLF AL MAR (&quot;we&quot;, &quot;us&quot;) operates the website and
        online shop at www.golfalmar.com. For GDPR purposes we are the data
        controller of any personal data collected through the site. For
        questions about this policy or to exercise your rights, contact{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>.
      </p>

      <h2>2. Information you provide to us</h2>
      <p>We collect personal data when you:</p>
      <ul>
        <li>
          <strong>Place an order.</strong> To process and ship an order we
          collect your name, email address, shipping and billing address, phone
          number (where required by the carrier), and the contents of your
          order. Payment card data is collected and processed by Stripe — we
          never see or store your card number.
        </li>
        <li>
          <strong>Subscribe to our newsletter.</strong> To send you new journal
          posts and your one-time welcome discount we collect your email
          address (and your name, if you provide one). You can unsubscribe at
          any time using the link in every email or by emailing us.
        </li>
        <li>
          <strong>Contact us by email.</strong> Anything you send to
          hello@golfalmar.com is stored so we can respond and follow up.
        </li>
      </ul>

      <h2>3. Information collected automatically</h2>
      <p>
        When you visit the site we collect a limited set of technical
        information needed to operate it and to understand aggregate traffic:
      </p>
      <ul>
        <li>
          <strong>Server access logs</strong> — IP address, request timestamp,
          requested URL, and browser user-agent. Kept briefly for security and
          abuse-prevention.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — anonymous, aggregate page-view
          statistics. No advertising cookies are set and individual visitors
          are not tracked across sites.
        </li>
        <li>
          <strong>Strictly necessary storage</strong> — your shopping cart is
          held in your browser&apos;s local storage on your device. Stripe sets
          its own cookies on the checkout page for fraud prevention.
        </li>
      </ul>

      <h2>4. Legal bases for processing (GDPR Art. 6)</h2>
      <ul>
        <li>
          <strong>Performance of a contract (Art. 6(1)(b))</strong> —
          processing your order, sending order confirmations, fulfilling
          delivery.
        </li>
        <li>
          <strong>Consent (Art. 6(1)(a))</strong> — sending you our newsletter
          after you sign up.
        </li>
        <li>
          <strong>Legitimate interests (Art. 6(1)(f))</strong> — operating and
          securing the website, preventing fraud, responding to enquiries.
        </li>
        <li>
          <strong>Legal obligation (Art. 6(1)(c))</strong> — retaining invoice
          records for the period required by tax law.
        </li>
      </ul>

      <h2>5. How long we keep your data</h2>
      <ul>
        <li>
          Order records and invoices — for the period required by applicable
          tax and commercial law (typically 7–10 years in the EU).
        </li>
        <li>
          Newsletter subscriber records — until you unsubscribe, then removed
          from our active list.
        </li>
        <li>
          Contact emails — for as long as needed to handle your enquiry, then
          archived briefly or deleted.
        </li>
        <li>Server logs and analytics — short rolling windows.</li>
      </ul>

      <h2>6. Who we share your data with</h2>
      <p>
        We use a small set of vetted processors that help us run the shop. Each
        is bound by a data-processing agreement and may only use your data on
        our instructions.
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe</strong> — processes card payments and
          stores card details on its own PCI-DSS-compliant systems.{" "}
          <a
            href="https://stripe.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Resend</strong> — sends transactional and newsletter emails
          on our behalf.{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hosts the website, stores uploaded
          journal images (Vercel Blob), and provides Vercel Analytics.{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            vercel.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>MongoDB Atlas</strong> — database storing orders, journal
          posts, and newsletter subscribers.{" "}
          <a
            href="https://www.mongodb.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            mongodb.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        We do not sell or rent your personal data, and we do not share it for
        advertising purposes. Where a legitimate legal request requires it, we
        may disclose data as required by law.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Some of our processors (notably Stripe, Resend, and Vercel) may
        transfer data to the United States. These transfers are protected by
        the EU–US Data Privacy Framework and/or Standard Contractual Clauses
        approved by the European Commission.
      </p>

      <h2>8. Cookies and similar technologies</h2>
      <p>
        We use only what is needed to operate the site. We do not use Google
        Analytics, Google Ads, the Facebook Pixel, or any cross-site
        advertising trackers. The technologies in use are:
      </p>
      <ul>
        <li>
          <strong>Local storage (your cart)</strong> — stores the items in your
          cart on your own device. Not sent to our servers.
        </li>
        <li>
          <strong>Stripe checkout cookies</strong> — set by Stripe on the
          checkout page for fraud prevention.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — privacy-friendly, cookie-less
          analytics.
        </li>
      </ul>

      <h2>9. Your rights under GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Rectification of any inaccurate data.</li>
        <li>Erasure of your data (&quot;right to be forgotten&quot;).</li>
        <li>Restriction of processing in certain circumstances.</li>
        <li>Portability — receive your data in a machine-readable format.</li>
        <li>Object to processing based on our legitimate interests.</li>
        <li>
          Withdraw consent at any time (for example, by unsubscribing from the
          newsletter).
        </li>
        <li>
          Lodge a complaint with your local data-protection supervisory
          authority.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>. We
        respond within 30 days.
      </p>

      <h2>10. Security</h2>
      <p>
        We follow current best practices to protect your data: TLS encryption
        in transit, password-protected admin access, and processors selected
        for their security posture. No system is completely secure; if a
        personal-data breach affecting you occurs, we will notify the
        supervisory authority and (where required) you, in accordance with
        GDPR Art. 33–34.
      </p>

      <h2>11. Children</h2>
      <p>
        The site is not directed at children under 16. We do not knowingly
        collect data from children. If you believe a child has provided us
        with personal data, please contact us and we will delete it.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by updating the &quot;Last updated&quot; date at the
        top of this page. Continued use of the site after a change constitutes
        acceptance of the updated policy.
      </p>
    </>
  );
}

function PrivacyDe() {
  return (
    <>
      <p>
        Wenn Sie uns über{" "}
        <a href="https://www.golfalmar.com">www.golfalmar.com</a> Informationen
        zur Verfügung stellen, respektieren wir Ihre Privatsphäre und
        verarbeiten Ihre personenbezogenen Daten gemäß der
        EU-Datenschutz-Grundverordnung (DSGVO). Diese Datenschutzerklärung
        erläutert, welche Daten wir erheben, wie wir sie verwenden, mit wem wir
        sie teilen und welche Rechte Sie in Bezug auf Ihre Daten haben. Die
        Nutzung dieser Website unterliegt dieser Datenschutzerklärung und
        unseren AGB.
      </p>

      <h2>1. Wer wir sind</h2>
      <p>
        GOLF AL MAR („wir&quot;, „uns&quot;) betreibt die Website und den
        Online-Shop unter www.golfalmar.com. Im Sinne der DSGVO sind wir der
        Verantwortliche für alle über diese Website erhobenen
        personenbezogenen Daten. Für Fragen zu dieser Erklärung oder zur
        Ausübung Ihrer Rechte kontaktieren Sie uns unter{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>.
      </p>

      <h2>2. Daten, die Sie uns zur Verfügung stellen</h2>
      <p>Wir erheben personenbezogene Daten, wenn Sie:</p>
      <ul>
        <li>
          <strong>eine Bestellung aufgeben.</strong> Zur Bearbeitung und zum
          Versand erfassen wir Ihren Namen, Ihre E-Mail-Adresse, die
          Liefer- und Rechnungsadresse, Ihre Telefonnummer (sofern vom
          Zusteller benötigt) und die Bestellinhalte. Kreditkartendaten werden
          von Stripe erhoben und verarbeitet — wir sehen oder speichern Ihre
          Kartendaten nie.
        </li>
        <li>
          <strong>unseren Newsletter abonnieren.</strong> Um Ihnen neue
          Journal-Beiträge und Ihren einmaligen Willkommensrabatt zu senden,
          erheben wir Ihre E-Mail-Adresse (und Ihren Namen, falls angegeben).
          Sie können sich jederzeit über den Link in jeder E-Mail oder per
          Nachricht an uns abmelden.
        </li>
        <li>
          <strong>uns per E-Mail kontaktieren.</strong> Alles, was Sie an
          hello@golfalmar.com senden, wird gespeichert, damit wir antworten
          und nachfassen können.
        </li>
      </ul>

      <h2>3. Automatisch erhobene Informationen</h2>
      <p>
        Beim Besuch der Website erheben wir eine begrenzte Menge technischer
        Informationen, die für den Betrieb und das Verständnis aggregierter
        Zugriffe erforderlich sind:
      </p>
      <ul>
        <li>
          <strong>Server-Zugriffsprotokolle</strong> — IP-Adresse, Zeitstempel,
          angeforderte URL und Browser-User-Agent. Werden zur Sicherheit und
          Missbrauchsvermeidung kurz aufbewahrt.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — anonyme, aggregierte
          Seitenaufrufstatistiken. Es werden keine Werbe-Cookies gesetzt und
          einzelne Besucher:innen werden nicht seitenübergreifend verfolgt.
        </li>
        <li>
          <strong>Unbedingt erforderlicher Speicher</strong> — Ihr Warenkorb
          wird im Local Storage Ihres Browsers auf Ihrem Gerät gespeichert.
          Stripe setzt eigene Cookies auf der Checkout-Seite zur
          Betrugsprävention.
        </li>
      </ul>

      <h2>4. Rechtsgrundlagen (Art. 6 DSGVO)</h2>
      <ul>
        <li>
          <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b)</strong> —
          Bearbeitung Ihrer Bestellung, Versand der Bestellbestätigung,
          Lieferung.
        </li>
        <li>
          <strong>Einwilligung (Art. 6 Abs. 1 lit. a)</strong> — Versand
          unseres Newsletters nach Ihrer Anmeldung.
        </li>
        <li>
          <strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f)</strong> —
          Betrieb und Absicherung der Website, Betrugsprävention, Beantwortung
          von Anfragen.
        </li>
        <li>
          <strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c)</strong> —
          Aufbewahrung von Rechnungen für die gesetzlich vorgeschriebene Dauer.
        </li>
      </ul>

      <h2>5. Speicherdauer</h2>
      <ul>
        <li>
          Bestelldaten und Rechnungen — für den gesetzlich vorgeschriebenen
          Zeitraum (in der EU typischerweise 7–10 Jahre).
        </li>
        <li>
          Newsletter-Daten — bis zur Abmeldung, dann Löschung aus dem aktiven
          Verteiler.
        </li>
        <li>
          Anfragen per E-Mail — so lange wie für die Bearbeitung erforderlich,
          danach kurzzeitig archiviert oder gelöscht.
        </li>
        <li>Server-Logs und Analytics — kurze rollierende Zeiträume.</li>
      </ul>

      <h2>6. An wen wir Daten weitergeben</h2>
      <p>
        Wir nutzen eine kleine Auswahl geprüfter Auftragsverarbeiter für den
        Betrieb des Shops. Jeder ist durch einen Auftragsverarbeitungsvertrag
        gebunden und darf Ihre Daten nur auf unsere Weisung verwenden.
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe</strong> — verarbeitet
          Kartenzahlungen und speichert Kartendaten in eigenen,
          PCI-DSS-konformen Systemen.{" "}
          <a
            href="https://stripe.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Resend</strong> — versendet Transaktions- und
          Newsletter-E-Mails in unserem Auftrag.{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hostet die Website, speichert
          hochgeladene Journal-Bilder (Vercel Blob) und liefert Vercel
          Analytics.{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            vercel.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>MongoDB Atlas</strong> — Datenbank für Bestellungen,
          Journal-Beiträge und Newsletter-Abonnent:innen.{" "}
          <a
            href="https://www.mongodb.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            mongodb.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        Wir verkaufen oder vermieten Ihre personenbezogenen Daten nicht und
        geben sie nicht zu Werbezwecken weiter. Wenn eine berechtigte
        rechtliche Anfrage es erfordert, geben wir Daten gemäß den gesetzlichen
        Vorgaben heraus.
      </p>

      <h2>7. Internationale Übermittlungen</h2>
      <p>
        Einige unserer Auftragsverarbeiter (insbesondere Stripe, Resend und
        Vercel) können Daten in die USA übermitteln. Diese Übermittlungen sind
        durch das EU–US Data Privacy Framework und/oder durch von der
        Europäischen Kommission genehmigte Standardvertragsklauseln
        abgesichert.
      </p>

      <h2>8. Cookies und ähnliche Technologien</h2>
      <p>
        Wir verwenden nur das, was für den Betrieb erforderlich ist. Wir nutzen
        kein Google Analytics, kein Google Ads, kein Facebook-Pixel und keine
        seitenübergreifenden Werbe-Tracker. Eingesetzt werden:
      </p>
      <ul>
        <li>
          <strong>Local Storage (Warenkorb)</strong> — speichert die Artikel
          Ihres Warenkorbs lokal auf Ihrem Gerät. Wird nicht an unsere Server
          gesendet.
        </li>
        <li>
          <strong>Stripe-Checkout-Cookies</strong> — werden von Stripe auf der
          Checkout-Seite zur Betrugsprävention gesetzt.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — datenschutzfreundliche,
          cookie-lose Analyse.
        </li>
      </ul>

      <h2>9. Ihre Rechte nach DSGVO</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten.</li>
        <li>Berichtigung unzutreffender Daten.</li>
        <li>Löschung Ihrer Daten („Recht auf Vergessenwerden&quot;).</li>
        <li>Einschränkung der Verarbeitung unter bestimmten Voraussetzungen.</li>
        <li>
          Datenübertragbarkeit — Erhalt Ihrer Daten in einem maschinenlesbaren
          Format.
        </li>
        <li>
          Widerspruch gegen die Verarbeitung auf Grundlage berechtigter
          Interessen.
        </li>
        <li>
          Widerruf erteilter Einwilligungen jederzeit (z. B. durch Abmeldung
          vom Newsletter).
        </li>
        <li>
          Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde.
        </li>
      </ul>
      <p>
        Zur Ausübung dieser Rechte schreiben Sie an{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>. Wir
        antworten innerhalb von 30 Tagen.
      </p>

      <h2>10. Sicherheit</h2>
      <p>
        Wir setzen aktuelle Best Practices zum Schutz Ihrer Daten ein:
        TLS-Verschlüsselung in der Übertragung, passwortgeschützter
        Admin-Zugang und Dienstleister mit hoher Sicherheitsstellung. Kein
        System ist vollständig sicher; im Falle einer Sie betreffenden
        Datenschutzverletzung benachrichtigen wir die Aufsichtsbehörde und —
        sofern erforderlich — Sie selbst, gemäß Art. 33–34 DSGVO.
      </p>

      <h2>11. Kinder</h2>
      <p>
        Die Website richtet sich nicht an Kinder unter 16 Jahren. Wir erheben
        wissentlich keine Daten von Kindern. Wenn Sie der Meinung sind, dass
        ein Kind uns Daten übermittelt hat, kontaktieren Sie uns bitte; wir
        löschen sie umgehend.
      </p>

      <h2>12. Änderungen dieser Erklärung</h2>
      <p>
        Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren.
        Wesentliche Änderungen werden durch eine Aktualisierung des Datums
        „Zuletzt aktualisiert&quot; am Anfang dieser Seite kenntlich gemacht.
        Die fortgesetzte Nutzung der Website nach einer Änderung gilt als
        Zustimmung zur aktualisierten Erklärung.
      </p>
    </>
  );
}

function PrivacyEs() {
  return (
    <>
      <p>
        Cuando nos facilita información a través de{" "}
        <a href="https://www.golfalmar.com">www.golfalmar.com</a> respetamos
        su privacidad y tratamos sus datos personales de conformidad con el
        Reglamento General de Protección de Datos de la UE (RGPD). Esta
        política explica qué datos recopilamos, cómo los usamos, con quién los
        compartimos y los derechos que tiene sobre ellos. El uso del sitio
        está sujeto a esta política y a nuestros Términos.
      </p>

      <h2>1. Quiénes somos</h2>
      <p>
        GOLF AL MAR («nosotros») gestiona el sitio web y la tienda online en
        www.golfalmar.com. A efectos del RGPD, somos el responsable del
        tratamiento de los datos personales recopilados a través del sitio.
        Para cualquier consulta sobre esta política o para ejercer sus
        derechos, contáctenos en{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>.
      </p>

      <h2>2. Información que usted nos facilita</h2>
      <p>Recopilamos datos personales cuando usted:</p>
      <ul>
        <li>
          <strong>Realiza un pedido.</strong> Para procesar y enviar su pedido
          recopilamos su nombre, correo electrónico, dirección de envío y
          facturación, teléfono (cuando lo requiere el transportista) y el
          contenido del pedido. Los datos de tarjeta los recopila y procesa
          Stripe — nosotros nunca vemos ni almacenamos su número de tarjeta.
        </li>
        <li>
          <strong>Se suscribe a nuestro boletín.</strong> Para enviarle las
          nuevas entradas del journal y su descuento de bienvenida de un solo
          uso, recopilamos su correo electrónico (y su nombre, si lo facilita).
          Puede darse de baja en cualquier momento desde el enlace de cada
          correo o escribiéndonos.
        </li>
        <li>
          <strong>Nos contacta por correo electrónico.</strong> Todo lo que
          envíe a hello@golfalmar.com se conserva para poder responderle y
          dar seguimiento.
        </li>
      </ul>

      <h2>3. Información recogida automáticamente</h2>
      <p>
        Al visitar el sitio recopilamos un conjunto limitado de información
        técnica necesaria para operarlo y entender el tráfico agregado:
      </p>
      <ul>
        <li>
          <strong>Registros de acceso del servidor</strong> — dirección IP,
          marca de tiempo, URL solicitada y user-agent del navegador.
          Conservados brevemente por seguridad y prevención de abuso.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — estadísticas anónimas y
          agregadas de páginas vistas. No se instalan cookies publicitarias y
          no se rastrea a los visitantes entre sitios.
        </li>
        <li>
          <strong>Almacenamiento estrictamente necesario</strong> — su
          carrito se guarda en el local storage de su navegador, en su
          dispositivo. Stripe instala sus propias cookies en la página de pago
          para prevenir fraude.
        </li>
      </ul>

      <h2>4. Bases jurídicas del tratamiento (art. 6 RGPD)</h2>
      <ul>
        <li>
          <strong>Ejecución de un contrato (art. 6.1.b)</strong> —
          procesamiento de su pedido, envío de confirmaciones y entrega.
        </li>
        <li>
          <strong>Consentimiento (art. 6.1.a)</strong> — envío de nuestro
          boletín tras su suscripción.
        </li>
        <li>
          <strong>Intereses legítimos (art. 6.1.f)</strong> — operar y
          asegurar el sitio, prevenir fraude, responder a consultas.
        </li>
        <li>
          <strong>Obligación legal (art. 6.1.c)</strong> — conservación de
          facturas durante el plazo exigido por la normativa fiscal.
        </li>
      </ul>

      <h2>5. Plazos de conservación</h2>
      <ul>
        <li>
          Pedidos y facturas — durante el plazo legalmente exigido
          (habitualmente 7–10 años en la UE).
        </li>
        <li>
          Suscriptores del boletín — hasta que se den de baja; luego se
          eliminan de la lista activa.
        </li>
        <li>
          Consultas por correo — el tiempo necesario para gestionarlas; luego
          se archivan brevemente o se eliminan.
        </li>
        <li>Registros y analítica — ventanas rodantes breves.</li>
      </ul>

      <h2>6. Con quién compartimos sus datos</h2>
      <p>
        Utilizamos un pequeño grupo de encargados de tratamiento verificados
        que nos ayudan a operar la tienda. Cada uno está vinculado por un
        contrato de encargado y solo puede usar sus datos siguiendo nuestras
        instrucciones.
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe</strong> — procesa los pagos con
          tarjeta y almacena los datos de tarjeta en sus propios sistemas
          conformes con PCI-DSS.{" "}
          <a
            href="https://stripe.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Resend</strong> — envía correos transaccionales y de
          newsletter en nuestro nombre.{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> — aloja el sitio, almacena las imágenes
          del journal (Vercel Blob) y proporciona Vercel Analytics.{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            vercel.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>MongoDB Atlas</strong> — base de datos para pedidos,
          entradas del journal y suscriptores.{" "}
          <a
            href="https://www.mongodb.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            mongodb.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        No vendemos ni alquilamos sus datos personales, y no los compartimos
        con fines publicitarios. Cuando una solicitud legal legítima así lo
        exige, podemos divulgarlos conforme a la ley.
      </p>

      <h2>7. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros encargados (en particular Stripe, Resend y Vercel)
        pueden transferir datos a Estados Unidos. Estas transferencias se
        amparan en el EU–US Data Privacy Framework y/o en las cláusulas
        contractuales tipo aprobadas por la Comisión Europea.
      </p>

      <h2>8. Cookies y tecnologías similares</h2>
      <p>
        Solo utilizamos lo necesario para operar el sitio. No usamos Google
        Analytics, Google Ads, el píxel de Facebook ni rastreadores
        publicitarios entre sitios. Lo que utilizamos es:
      </p>
      <ul>
        <li>
          <strong>Local storage (carrito)</strong> — guarda el contenido del
          carrito en su dispositivo. No se envía a nuestros servidores.
        </li>
        <li>
          <strong>Cookies de Stripe</strong> — instaladas por Stripe en la
          página de pago para prevenir fraude.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — analítica respetuosa con la
          privacidad, sin cookies.
        </li>
      </ul>

      <h2>9. Sus derechos según el RGPD</h2>
      <p>Usted tiene derecho a:</p>
      <ul>
        <li>Acceder a los datos personales que mantenemos sobre usted.</li>
        <li>Rectificar cualquier dato inexacto.</li>
        <li>Suprimir sus datos («derecho al olvido»).</li>
        <li>Limitar el tratamiento en determinadas circunstancias.</li>
        <li>
          Portabilidad — recibir sus datos en un formato legible por máquina.
        </li>
        <li>
          Oponerse al tratamiento basado en nuestros intereses legítimos.
        </li>
        <li>
          Retirar el consentimiento en cualquier momento (por ejemplo, dándose
          de baja del boletín).
        </li>
        <li>
          Presentar una reclamación ante la autoridad de control en materia de
          protección de datos.
        </li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escriba a{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>.
        Respondemos en un plazo de 30 días.
      </p>

      <h2>10. Seguridad</h2>
      <p>
        Aplicamos las mejores prácticas actuales para proteger sus datos:
        cifrado TLS en tránsito, acceso de administración protegido con
        contraseña y encargados seleccionados por su nivel de seguridad. Ningún
        sistema es completamente seguro; en caso de una brecha de datos
        personales que le afecte, notificaremos a la autoridad de control y
        —cuando proceda— a usted, conforme a los arts. 33–34 del RGPD.
      </p>

      <h2>11. Menores</h2>
      <p>
        El sitio no está dirigido a menores de 16 años. No recopilamos
        intencionadamente datos de menores. Si cree que un menor nos ha
        facilitado datos personales, póngase en contacto con nosotros y los
        eliminaremos.
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política de vez en cuando. Los cambios
        relevantes se reflejarán actualizando la fecha de «Última
        actualización» al principio de esta página. El uso continuado del
        sitio tras un cambio implica la aceptación de la versión actualizada.
      </p>
    </>
  );
}

function PrivacyZh() {
  return (
    <>
      <p>
        当您通过{" "}
        <a href="https://www.golfalmar.com">www.golfalmar.com</a>{" "}
        向我们提供信息时，我们尊重您的隐私，并依照欧盟《通用数据保护条例》（GDPR）处理您的个人数据。本隐私政策说明我们收集哪些数据、如何使用这些数据、与谁共享，以及您对自身数据享有的权利。您对本网站的使用受本隐私政策及我们的条款约束。
      </p>

      <h2>1. 我们是谁</h2>
      <p>
        GOLF AL MAR（下称“我们”）运营 www.golfalmar.com
        网站及在线商店。就 GDPR 而言，我们是通过本网站收集的所有个人数据的数据控制者。如对本政策有疑问或希望行使您的权利，请联系{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>。
      </p>

      <h2>2. 您向我们提供的数据</h2>
      <p>在以下情形中，我们会收集个人数据：</p>
      <ul>
        <li>
          <strong>您下单购买时。</strong>{" "}
          为处理订单并完成配送，我们会收集您的姓名、电子邮箱地址、收货和账单地址、电话号码（在承运商要求时）以及订单内容。银行卡数据由 Stripe 收集和处理 —
          我们绝不会看到或存储您的卡号。
        </li>
        <li>
          <strong>您订阅我们的通讯时。</strong>{" "}
          为向您发送新的 Journal 文章以及一次性的欢迎折扣码，我们会收集您的电子邮箱地址（如您提供，还包括您的姓名）。您可随时通过每封邮件中的链接或来信取消订阅。
        </li>
        <li>
          <strong>您通过电子邮件联系我们时。</strong>{" "}
          您发送至 hello@golfalmar.com 的所有内容都会被存储，以便我们回复并跟进。
        </li>
      </ul>

      <h2>3. 自动收集的信息</h2>
      <p>
        当您访问本网站时，我们会收集运营网站及了解总体访问情况所必需的有限技术信息：
      </p>
      <ul>
        <li>
          <strong>服务器访问日志</strong> — IP
          地址、请求时间戳、所请求的网址以及浏览器 User-Agent。出于安全和防滥用目的短期保存。
        </li>
        <li>
          <strong>Vercel Analytics</strong> —
          匿名的汇总页面浏览统计。不设置广告 Cookie，也不会跨站点追踪个别访客。
        </li>
        <li>
          <strong>严格必要的存储</strong> —
          您的购物车保存在您设备浏览器的本地存储中。Stripe 会在结账页面设置自有 Cookie 以防范欺诈。
        </li>
      </ul>

      <h2>4. 处理的法律依据（GDPR 第 6 条）</h2>
      <ul>
        <li>
          <strong>履行合同（第 6 条第 1 款 b 项）</strong> —
          处理您的订单、发送订单确认、完成配送。
        </li>
        <li>
          <strong>同意（第 6 条第 1 款 a 项）</strong> —
          在您注册后向您发送我们的通讯。
        </li>
        <li>
          <strong>正当利益（第 6 条第 1 款 f 项）</strong> —
          运营和保护网站、防范欺诈、回复咨询。
        </li>
        <li>
          <strong>法律义务（第 6 条第 1 款 c 项）</strong> —
          按税法要求的期限保存发票记录。
        </li>
      </ul>

      <h2>5. 数据保存期限</h2>
      <ul>
        <li>
          订单记录与发票 — 保存至适用税法和商法要求的期限（在欧盟通常为 7–10 年）。
        </li>
        <li>通讯订阅记录 — 直至您取消订阅，随后从活跃名单中移除。</li>
        <li>
          咨询邮件 — 保存至处理您的咨询所需的时间，之后短期归档或删除。
        </li>
        <li>服务器日志与分析数据 — 短期滚动保存。</li>
      </ul>

      <h2>6. 我们与谁共享您的数据</h2>
      <p>
        我们仅使用少数经过审核的数据处理方来运营商店。每一方均受数据处理协议约束，只能按照我们的指示使用您的数据。
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe</strong> —
          处理银行卡付款，并在其自有的符合 PCI-DSS 标准的系统中存储卡数据。{" "}
          <a
            href="https://stripe.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Resend</strong> — 代表我们发送交易邮件和通讯邮件。{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> — 托管网站、存储上传的 Journal
          图片（Vercel Blob）并提供 Vercel Analytics。{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            vercel.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>MongoDB Atlas</strong> — 用于订单、Journal
          文章和通讯订阅者的数据库。{" "}
          <a
            href="https://www.mongodb.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            mongodb.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        我们不会出售或出租您的个人数据，也不会将其用于广告目的的转让。若合法的法律请求要求我们提供数据，我们将依照法律规定披露。
      </p>

      <h2>7. 国际数据传输</h2>
      <p>
        我们的部分数据处理方（尤其是 Stripe、Resend 和 Vercel）可能将数据传输至美国。此类传输受欧盟–美国数据隐私框架及/或欧盟委员会批准的标准合同条款保障。
      </p>

      <h2>8. Cookie 及类似技术</h2>
      <p>
        我们仅使用运营所必需的技术。我们不使用 Google Analytics、Google
        Ads、Facebook 像素，也不使用跨站广告追踪器。我们使用的是：
      </p>
      <ul>
        <li>
          <strong>本地存储（购物车）</strong> —
          将购物车中的商品保存在您的设备本地，不会发送至我们的服务器。
        </li>
        <li>
          <strong>Stripe 结账 Cookie</strong> — 由 Stripe
          在结账页面设置，用于防范欺诈。
        </li>
        <li>
          <strong>Vercel Analytics</strong> — 注重隐私、无 Cookie 的分析服务。
        </li>
      </ul>

      <h2>9. 您在 GDPR 下的权利</h2>
      <p>您有权：</p>
      <ul>
        <li>查询我们所存储的与您有关的数据。</li>
        <li>更正不准确的数据。</li>
        <li>删除您的数据（“被遗忘权”）。</li>
        <li>在特定条件下限制处理。</li>
        <li>数据可携 — 以机器可读的格式获取您的数据。</li>
        <li>对基于正当利益进行的处理提出反对。</li>
        <li>随时撤回已给予的同意（例如取消订阅通讯）。</li>
        <li>向主管数据保护监管机构投诉。</li>
      </ul>
      <p>
        如需行使这些权利，请来信至{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>
        。我们将在 30 天内回复。
      </p>

      <h2>10. 安全</h2>
      <p>
        我们采用当前的最佳实践保护您的数据：传输过程中的 TLS
        加密、受密码保护的管理后台访问，以及安全水平较高的服务提供商。没有任何系统是绝对安全的；若发生涉及您的数据泄露事件，我们将依照 GDPR 第 33–34
        条通知监管机构，并在必要时通知您本人。
      </p>

      <h2>11. 儿童</h2>
      <p>
        本网站不面向 16
        岁以下的儿童。我们不会在知情的情况下收集儿童的数据。若您认为有儿童向我们提交了数据，请与我们联系，我们将立即删除。
      </p>

      <h2>12. 本政策的变更</h2>
      <p>
        我们可能会不时更新本隐私政策。重大变更将通过更新本页顶部的“最后更新”日期予以说明。变更后继续使用本网站，即视为您同意更新后的政策。
      </p>
    </>
  );
}

function PrivacyJa() {
  return (
    <>
      <p>
        <a href="https://www.golfalmar.com">www.golfalmar.com</a>{" "}
        を通じてお客様が当社に情報をご提供いただく際、当社はお客様のプライバシーを尊重し、EU 一般データ保護規則（GDPR）に従って個人データを処理します。本プライバシーポリシーでは、当社が取得するデータ、その利用方法、共有先、およびお客様がご自身のデータについて有する権利を説明します。本サイトのご利用は、本プライバシーポリシーおよび当社の利用規約に従うものとします。
      </p>

      <h2>1. 当社について</h2>
      <p>
        GOLF AL MAR（以下「当社」）は、www.golfalmar.com
        のウェブサイトおよびオンラインショップを運営しています。GDPR
        上、当社は本サイトを通じて取得されるすべての個人データの管理者にあたります。本ポリシーに関するご質問、またはお客様の権利の行使については{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>{" "}
        までご連絡ください。
      </p>

      <h2>2. お客様からご提供いただくデータ</h2>
      <p>当社は、次の場合に個人データを取得します。</p>
      <ul>
        <li>
          <strong>ご注文いただく場合。</strong>{" "}
          ご注文の処理と配送のため、お名前、メールアドレス、配送先および請求先住所、電話番号（配送業者が必要とする場合）、ご注文内容を取得します。クレジットカード情報は
          Stripe が取得・処理し、当社がカード番号を閲覧または保存することは一切ありません。
        </li>
        <li>
          <strong>ニュースレターにご登録いただく場合。</strong>{" "}
          新しいジャーナル記事および 1
          回限りのウェルカム割引をお届けするため、メールアドレス（ご記入いただいた場合はお名前も）を取得します。配信停止は、各メール内のリンクまたは当社へのご連絡によりいつでも可能です。
        </li>
        <li>
          <strong>メールでお問い合わせいただく場合。</strong>{" "}
          hello@golfalmar.com
          宛にお送りいただいた内容は、返信および対応のために保存されます。
        </li>
      </ul>

      <h2>3. 自動的に取得される情報</h2>
      <p>
        本サイトへのアクセス時、運営および全体的なアクセス状況の把握に必要な範囲で、限られた技術情報を取得します。
      </p>
      <ul>
        <li>
          <strong>サーバーアクセスログ</strong> — IP
          アドレス、リクエストのタイムスタンプ、リクエストされた
          URL、ブラウザのユーザーエージェント。セキュリティおよび不正利用防止のため短期間保存します。
        </li>
        <li>
          <strong>Vercel Analytics</strong> —
          匿名かつ集計されたページビュー統計。広告 Cookie
          は設定せず、個々の訪問者をサイト横断で追跡することもありません。
        </li>
        <li>
          <strong>必要不可欠なストレージ</strong> —
          カートの内容はお客様の端末のブラウザのローカルストレージに保存されます。Stripe
          は不正防止のため、決済ページで独自の Cookie を設定します。
        </li>
      </ul>

      <h2>4. 処理の法的根拠（GDPR 第 6 条）</h2>
      <ul>
        <li>
          <strong>契約の履行（第 6 条 1 項 b）</strong> —
          ご注文の処理、注文確認の送信、配送の履行。
        </li>
        <li>
          <strong>同意（第 6 条 1 項 a）</strong> —
          ご登録後のニュースレター配信。
        </li>
        <li>
          <strong>正当な利益（第 6 条 1 項 f）</strong> —
          ウェブサイトの運営と保護、不正防止、お問い合わせへの対応。
        </li>
        <li>
          <strong>法的義務（第 6 条 1 項 c）</strong> —
          税法で定められた期間の請求書記録の保存。
        </li>
      </ul>

      <h2>5. データの保存期間</h2>
      <ul>
        <li>
          注文記録および請求書 — 適用される税法・商法で定められた期間（EU
          では通常 7〜10 年）。
        </li>
        <li>
          ニュースレター登録情報 —
          配信停止まで。その後は配信リストから削除します。
        </li>
        <li>
          お問い合わせメール —
          対応に必要な期間。その後は短期間アーカイブするか削除します。
        </li>
        <li>サーバーログおよび分析データ — 短期のローリング期間。</li>
      </ul>

      <h2>6. データの共有先</h2>
      <p>
        当社はショップの運営のため、審査を経た少数の処理者のみを利用しています。いずれもデータ処理契約により拘束され、当社の指示に基づいてのみお客様のデータを利用できます。
      </p>
      <ul>
        <li>
          <strong>Stripe Payments Europe</strong> —
          カード決済を処理し、カード情報を自社の PCI-DSS
          準拠システムに保存します。{" "}
          <a
            href="https://stripe.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            stripe.com/privacy
          </a>
        </li>
        <li>
          <strong>Resend</strong> —
          当社に代わってトランザクションメールおよびニュースレターを送信します。{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            resend.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> —
          ウェブサイトのホスティング、アップロードされたジャーナル画像の保存（Vercel
          Blob）、および Vercel Analytics の提供。{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            vercel.com/legal/privacy-policy
          </a>
        </li>
        <li>
          <strong>MongoDB Atlas</strong> —
          注文、ジャーナル記事、ニュースレター購読者のデータベース。{" "}
          <a
            href="https://www.mongodb.com/legal/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
          >
            mongodb.com/legal/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        当社はお客様の個人データを販売・貸与せず、広告目的で提供することもありません。正当な法的要請がある場合には、法令に従ってデータを開示します。
      </p>

      <h2>7. 国際的なデータ移転</h2>
      <p>
        当社の処理者の一部（特に Stripe、Resend、Vercel）は、データを米国に移転する場合があります。これらの移転は EU–US
        データプライバシーフレームワーク、および／または欧州委員会が承認した標準契約条項によって保護されています。
      </p>

      <h2>8. Cookie および類似技術</h2>
      <p>
        当社は運営に必要なものだけを使用します。Google Analytics、Google
        Ads、Facebook ピクセル、サイト横断の広告トラッカーは使用していません。使用しているのは次のとおりです。
      </p>
      <ul>
        <li>
          <strong>ローカルストレージ（カート）</strong> —
          カート内の商品をお客様の端末にローカル保存します。当社のサーバーには送信されません。
        </li>
        <li>
          <strong>Stripe の決済 Cookie</strong> — 不正防止のため Stripe
          が決済ページで設定します。
        </li>
        <li>
          <strong>Vercel Analytics</strong> —
          プライバシーに配慮した、Cookie を使用しない分析。
        </li>
      </ul>

      <h2>9. GDPR に基づくお客様の権利</h2>
      <p>お客様には次の権利があります。</p>
      <ul>
        <li>お客様に関して保存されているデータの開示を求める権利。</li>
        <li>不正確なデータの訂正を求める権利。</li>
        <li>データの削除を求める権利（「忘れられる権利」）。</li>
        <li>一定の条件下で処理の制限を求める権利。</li>
        <li>
          データポータビリティ —
          機械可読な形式でご自身のデータを受け取る権利。
        </li>
        <li>正当な利益に基づく処理に異議を申し立てる権利。</li>
        <li>
          与えた同意をいつでも撤回する権利（例：ニュースレターの配信停止）。
        </li>
        <li>所管のデータ保護監督機関に苦情を申し立てる権利。</li>
      </ul>
      <p>
        これらの権利の行使は{" "}
        <a href="mailto:hello@golfalmar.com">hello@golfalmar.com</a>{" "}
        までご連絡ください。30 日以内に回答いたします。
      </p>

      <h2>10. セキュリティ</h2>
      <p>
        当社はお客様のデータを保護するため、最新のベストプラクティスを採用しています。通信時の TLS
        暗号化、パスワードで保護された管理画面へのアクセス、そして高いセキュリティ水準を備えたサービス提供者の利用です。完全に安全なシステムは存在しません。お客様に関わるデータ侵害が発生した場合には、GDPR
        第 33〜34 条に従い監督機関に通知し、必要な場合にはお客様ご本人にもお知らせします。
      </p>

      <h2>11. 子どもについて</h2>
      <p>
        本サイトは 16
        歳未満の子どもを対象としていません。当社が意図的に子どものデータを取得することはありません。子どもが当社にデータを送信したと思われる場合は、ご連絡ください。速やかに削除いたします。
      </p>

      <h2>12. 本ポリシーの変更</h2>
      <p>
        当社は本プライバシーポリシーを随時更新することがあります。重要な変更は、本ページ冒頭の「最終更新日」を更新することでお知らせします。変更後も本サイトのご利用を継続された場合、更新後のポリシーに同意されたものとみなします。
      </p>
    </>
  );
}

export function PrivacyContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <PrivacyDe />;
  if (locale === "es") return <PrivacyEs />;
  if (locale === "zh") return <PrivacyZh />;
  if (locale === "ja") return <PrivacyJa />;
  return <PrivacyEn />;
}
