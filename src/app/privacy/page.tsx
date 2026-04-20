'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privatlivspolitik</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-600">Sidst opdateret: {new Date().toLocaleDateString('da-DK')}</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduktion</h2>
            <p className="text-gray-700 leading-relaxed">
              Denne privatlivspolitik beskriver, hvordan WeShare ("vi", "os", "vores") indsamler, bruger og beskytter dine personoplysninger, når du bruger vores samkørselsplatform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Indsamling af personoplysninger</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Vi indsamler følgende oplysninger, når du bruger WeShare:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Profiloplysninger:</strong> Navn, e-mailadresse, telefonnummer og profilbillede</li>
              <li><strong>Rejseinformation:</strong> Afgangs- og destinationsadresser, dato og tidspunkt</li>
              <li><strong>Kommunikation:</strong> Beskeder mellem brugere gennem platformen</li>
              <li><strong>Betalingsoplysninger:</strong> Vi gemmer ikke betalingsoplysninger, da betaling sker direkte mellem brugere</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Brug af personoplysninger</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Dine oplysninger bruges til at:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Facilitere samkørsel mellem brugere</li>
              <li>Kommunikere om dine bookinger og anmodninger</li>
              <li>Forbedre og udvikle vores tjeneste</li>
              <li>Sikre platformens sikkerhed og forebygge misbrug</li>
              <li>Sende vigtige meddelelser om din konto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Deling af oplysninger</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi deler kun dine oplysninger med andre brugere i forbindelse med samkørsel (navn, profilbillede, kontaktoplysninger). Vi sælger aldrig dine personoplysninger til tredjeparter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Datasikkerhed</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi tager datasikkerhed alvorligt og bruger Firebase's sikre infrastruktur til at beskytte dine oplysninger. Al kommunikation er krypteret, og vi følger bedste praksis for datasikkerhed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Dine rettigheder (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              I henhold til GDPR har du følgende rettigheder:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Ret til indsigt:</strong> Du kan anmode om en kopi af dine personoplysninger</li>
              <li><strong>Ret til berigtigelse:</strong> Du kan opdatere eller rette dine oplysninger</li>
              <li><strong>Ret til sletning:</strong> Du kan anmode om at få slettet dine oplysninger</li>
              <li><strong>Ret til dataportabilitet:</strong> Du kan få dine data i et struktureret format</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              For at udøve dine rettigheder, kontakt os på <a href="mailto:hello@weshare-ride.dk" className="text-brand-600 hover:underline">hello@weshare-ride.dk</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi bruger kun nødvendige cookies til at sikre, at platformen fungerer korrekt (f.eks. session-cookies for login). Vi bruger ikke tracking- eller marketing-cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Ændringer til privatlivspolitikken</h2>
            <p className="text-gray-700 leading-relaxed">
              Vi kan opdatere denne privatlivspolitik fra tid til anden. Væsentlige ændringer vil blive kommunikeret via e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Kontakt</h2>
            <p className="text-gray-700 leading-relaxed">
              Har du spørgsmål til vores privatlivspolitik? Kontakt os på:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>E-mail:</strong> <a href="mailto:hello@weshare-ride.dk" className="text-brand-600 hover:underline">hello@weshare-ride.dk</a><br />
              <strong>Adresse:</strong> Aarhus, Danmark
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
