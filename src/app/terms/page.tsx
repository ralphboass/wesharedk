'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Servicevilkår</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Generelt</h2>
            <p className="text-gray-700 mb-4">
              Velkommen til WeShareRide.dk. Ved at bruge vores platform accepterer du disse servicevilkår.
            </p>
          </section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Brug af tjenesten</h2>
          <p className="text-gray-700 mb-4">
            WeShareRide.dk er en platform, der forbinder chauffører og passagerer for at dele køreture.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Du skal være mindst 18 år for at bruge platformen</li>
            <li>Du er ansvarlig for at give korrekte oplysninger</li>
            <li>Du skal overholde gældende love og regler</li>
          </ul>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Ansvar og forpligtelser</h2>
            <p className="text-gray-700 mb-4">
              <strong>Som chauffør:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Du er ansvarlig for at have gyldigt kørekort og forsikring</li>
              <li>Du skal overholde trafikreglerne</li>
              <li>Du er ansvarlig for passagerernes sikkerhed under turen</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>Som passager:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Du skal møde op til aftalt tid og sted</li>
              <li>Du skal respektere chaufførens bil og regler</li>
              <li>Du skal betale den aftalte pris</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Betaling</h2>
            <p className="text-gray-700 mb-4">
              Betaling sker direkte mellem chauffør og passager via MobilePay eller efter aftale. WeShare tager ingen provision og er ikke involveret i betalingstransaktioner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Annullering</h2>
            <p className="text-gray-700 mb-4">
              Både chauffører og passagerer kan annullere bookinger. Vi opfordrer til at give besked så tidligt som muligt ved annullering.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Ansvarsfraskrivelse</h2>
            <p className="text-gray-700 mb-4">
              WeShare er en formidlingsplatform og er ikke ansvarlig for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Ulykker eller skader under turen</li>
              <li>Tvister mellem brugere</li>
              <li>Tab eller skade på ejendele</li>
              <li>Manglende betaling mellem brugere</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Misbrug</h2>
            <p className="text-gray-700 mb-4">
              Vi forbeholder os retten til at suspendere eller slette konti ved misbrug af platformen, herunder:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Falske oplysninger</li>
              <li>Chikane eller upassende adfærd</li>
              <li>Kommerciel brug uden tilladelse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Ændringer</h2>
            <p className="text-gray-700 mb-4">
              Vi kan opdatere disse vilkår fra tid til anden. Væsentlige ændringer vil blive kommunikeret via e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Kontakt</h2>
            <p className="text-gray-700 mb-4">
              Har du spørgsmål til vores servicevilkår? Kontakt os på:
            </p>
            <p className="text-gray-700">
              <strong>E-mail:</strong> <a href="mailto:hello@weshare-ride.dk" className="text-brand-600 hover:underline">hello@weshare-ride.dk</a><br />
              <strong>Adresse:</strong> Aarhus, Danmark
            </p>
          </section>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Betaling</h2>
          <p className="text-gray-700 mb-4">
            Betaling sker direkte mellem chauffør og passager via MobilePay eller efter aftale.
            WeShareRide.dk er gratis at bruge - vi tager ingen provision.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Ansvar</h2>
          <p className="text-gray-700 mb-4">
            WeShareRide.dk er en formidlingsplatform. Vi er ikke ansvarlige for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Køretøjers sikkerhed eller tilstand</li>
            <li>Chaufførers kørefærdigheder</li>
            <li>Betalingstvister mellem brugere</li>
            <li>Tab eller skader under turen</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ændringer</h2>
          <p className="text-gray-700 mb-4">
            Vi forbeholder os retten til at ændre disse vilkår. Ændringer træder i kraft ved offentliggørelse på platformen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Kontakt</h2>
          <p className="text-gray-700 mb-4">
            Har du spørgsmål til servicevilkårene? Kontakt os på support@weshareride.dk
          </p>
        </section>
      </div>
    </div>
  )
}
