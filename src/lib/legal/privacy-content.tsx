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

export function PrivacyContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <PrivacyDe />;
  if (locale === "es") return <PrivacyEs />;
  return <PrivacyEn />;
}
