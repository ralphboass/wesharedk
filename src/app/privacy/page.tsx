export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privatlivspolitik</h1>
      
      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Indsamling af data</h2>
          <p className="text-gray-700 mb-4">
            WeShareRide.dk indsamler følgende oplysninger når du opretter en konto:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Navn (fornavn og efternavn)</li>
            <li>E-mailadresse</li>
            <li>Telefonnummer</li>
            <li>Profilbillede (valgfrit)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Brug af data</h2>
          <p className="text-gray-700 mb-4">
            Dine oplysninger bruges til:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>At oprette og administrere din konto</li>
            <li>At vise din profil til andre brugere</li>
            <li>At facilitere kommunikation mellem chauffører og passagerer</li>
            <li>At sende dig vigtige meddelelser om dine ture</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Deling af data</h2>
          <p className="text-gray-700 mb-4">
            Vi deler IKKE dine personlige oplysninger med tredjeparter til markedsføringsformål.
            Dine oplysninger er kun synlige for andre brugere på platformen i forbindelse med køreture.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Datasikkerhed</h2>
          <p className="text-gray-700 mb-4">
            Vi bruger Firebase til sikker opbevaring af dine data. Alle data er krypteret og beskyttet
            i henhold til GDPR-reglerne.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Dine rettigheder</h2>
          <p className="text-gray-700 mb-4">
            Du har ret til:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>At få indsigt i dine data</li>
            <li>At få rettet forkerte oplysninger</li>
            <li>At få slettet din konto og data</li>
            <li>At trække dit samtykke tilbage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
          <p className="text-gray-700 mb-4">
            Vi bruger nødvendige cookies til at holde dig logget ind og til at forbedre brugeroplevelsen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kontakt</h2>
          <p className="text-gray-700 mb-4">
            Har du spørgsmål om vores håndtering af dine data? Kontakt os på privacy@weshareride.dk
          </p>
        </section>
      </div>
    </div>
  )
}
