import { LegalPage } from "~/components/legal-page"

export function meta() {
  const url = "https://amosbunde.github.io/nyika-expedition/terms"
  return [
    { title: "Booking Terms · Nyika Expeditions" },
    {
      name: "description",
      content:
        "Booking, deposit, payment, and cancellation terms for expeditions arranged by Nyika Expeditions.",
    },
    { name: "robots", content: "index, follow" },
    { tagName: "link", rel: "canonical", href: url },
  ]
}

export default function Terms() {
  return (
    <LegalPage title="Booking Terms" updated="4 June 2026">
      <p>
        These terms govern expeditions arranged by Nyika Expeditions Ltd.
        (“Nyika”). By confirming a booking you accept them. They are a
        plain-language summary; the full agreement is provided with your booking
        confirmation.
      </p>

      <h2>Booking &amp; deposit</h2>
      <p>
        A booking is confirmed on receipt of a 50% deposit. The balance is due
        no later than 30 days before departure. Bookings made within 30 days of
        departure require payment in full.
      </p>

      <h2>Pricing</h2>
      <p>
        All prices are quoted in US Dollars (USD) per traveller unless stated
        otherwise, and include the inclusions listed for each expedition. Prices
        may change before a booking is confirmed; once your deposit is received,
        your price is fixed except for unavoidable third-party increases (for
        example government park fees or fuel surcharges), which will be
        communicated to you.
      </p>

      <h2>Cancellation &amp; refunds</h2>
      <ul>
        <li>
          Cancellation more than 30 days before departure: full refund of
          amounts paid, less any non-recoverable third-party costs.
        </li>
        <li>Cancellation 15–30 days before departure: deposit forfeited.</li>
        <li>Cancellation within 14 days of departure: no refund.</li>
      </ul>
      <p>
        We strongly recommend comprehensive travel insurance covering
        cancellation, medical evacuation, and repatriation.
      </p>

      <h2>What is included</h2>
      <p>
        Inclusions and exclusions are listed on each expedition. In summary,
        expeditions include a private game viewer and resident guide, park and
        conservancy fees, full board, and the conservation levy. International
        flights, visas, travel insurance, and personal expenses are not
        included.
      </p>

      <h2>Changes to your expedition</h2>
      <p>
        Itineraries are frameworks. Your guide may adapt routes and timings in
        response to wildlife movement, weather, road, or safety conditions.
        Where a material change is necessary before departure, we will offer you
        a comparable alternative or a refund of the affected portion.
      </p>

      <h2>Health, safety &amp; conduct</h2>
      <p>
        You are responsible for ensuring you hold valid travel documents,
        required vaccinations, and are medically fit for safari travel. You
        agree to follow the lawful instructions of your guide and camp staff for
        your safety and that of wildlife.
      </p>

      <h2>Liability</h2>
      <p>
        Nyika arranges services with carefully selected partners and accepts
        liability as required by applicable law. To the extent permitted by law,
        we are not liable for loss arising from events beyond our reasonable
        control. Nothing in these terms limits liability that cannot be limited
        by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of Kenya, and the
        courts of Kenya have jurisdiction over any dispute.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about a booking? Email{" "}
        <a href="mailto:dossier@nyika.co.ke">dossier@nyika.co.ke</a> or call
        +254 20 440 1211.
      </p>
    </LegalPage>
  )
}
