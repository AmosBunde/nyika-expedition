import { LegalPage } from "~/components/legal-page"

export function meta() {
  const url = "https://amosbunde.github.io/nyika-expedition/privacy"
  return [
    { title: "Privacy Policy · Nyika Expeditions" },
    {
      name: "description",
      content:
        "How Nyika Expeditions collects, uses, and protects the personal information you share when enquiring about a safari.",
    },
    { name: "robots", content: "index, follow" },
    { tagName: "link", rel: "canonical", href: url },
  ]
}

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="4 June 2026">
      <p>
        Nyika Expeditions Ltd. (“Nyika,” “we,” “us”) respects your privacy. This
        policy explains what personal information we collect when you use this
        website or enquire about an expedition, how we use it, and the choices
        you have.
      </p>

      <h2>Who we are</h2>
      <p>
        Nyika Expeditions Ltd., Riverside Drive, Westlands, Nairobi 00100,
        Kenya. For any privacy question, contact{" "}
        <a href="mailto:dossier@nyika.co.ke">dossier@nyika.co.ke</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        When you complete the booking flow you may provide: your name, email
        address, mobile number, nationality, intended departure date, party
        size, accommodation preference, flight details, and any dietary,
        medical, or interest notes you choose to share.
      </p>
      <p>
        This website does not use advertising cookies or third-party analytics,
        and we do not track you across other sites.
      </p>

      <h2>How the booking flow works today</h2>
      <p>
        The on-page booking flow currently runs entirely in your browser to
        assemble an itinerary and price estimate — it does not transmit your
        details to our servers on its own. We process the information you give
        us only when you complete an enquiry with us by email or telephone, or
        when this flow is connected to a booking provider (which will be
        disclosed here at that time).
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To prepare your itinerary, quote, and pre-departure dossier.</li>
        <li>
          To arrange transfers, park access, accommodation, and logistics.
        </li>
        <li>To communicate with you about your expedition.</li>
        <li>To meet legal, accounting, and safety obligations.</li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        This site loads typefaces from Google Fonts and photography from
        Unsplash. When your browser requests those assets, your IP address is
        necessarily visible to those providers. We do not share your booking
        details with them. Review the{" "}
        <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
          Google Privacy Policy
        </a>{" "}
        and the{" "}
        <a href="https://unsplash.com/privacy" rel="noopener noreferrer">
          Unsplash Privacy Policy
        </a>{" "}
        for their practices.
      </p>

      <h2>Local storage</h2>
      <p>
        If your browser supports it, a service worker caches site assets locally
        so the site loads quickly and works offline. This cache contains only
        public site files — never your personal information — and you can clear
        it at any time from your browser settings.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep enquiry and booking information only as long as needed to
        deliver your expedition and to satisfy legal and accounting
        requirements, after which it is securely deleted or anonymised.
      </p>

      <h2>Your rights</h2>
      <p>
        Subject to applicable law, you may request access to, correction of, or
        deletion of your personal information, and you may object to or restrict
        certain processing. To exercise any right, email{" "}
        <a href="mailto:dossier@nyika.co.ke">dossier@nyika.co.ke</a>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The “last updated” date
        above reflects the current version.
      </p>
    </LegalPage>
  )
}
