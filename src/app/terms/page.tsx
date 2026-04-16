export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Servicevilkår</h1>
      
      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Generelt</h2>
          <p className="text-gray-700 mb-4">
            Velkommen til WeShareRide.dk. Ved at bruge vores platform accepterer du disse servicevilkår.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Brug af tjenesten</h2>
          <p className="text-gray-700 mb-4">
            WeShareRide.dk er en platform, der forbinder chauffører og passagerer for at dele køreture.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Du skal være mindst 18 år for at bruge platformen</li>
            <li>Du er ansvarlig for at give korrekte oplysninger</li>
            <li>Du skal overholde gældende love og regler</li>
          </ul>
        </section>

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
