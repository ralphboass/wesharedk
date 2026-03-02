'use client'

import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { Car, Shield, Leaf, Users, ArrowRight, Star, MapPin } from 'lucide-react'
import { Suspense } from 'react'

function HeroSearchBar() {
  return (
    <Suspense fallback={<div className="h-20 bg-white/50 rounded-2xl animate-pulse" />}>
      <SearchBar variant="hero" />
    </Suspense>
  )
}

const popularRoutes = [
  { from: 'København', to: 'Aarhus', price: '120' },
  { from: 'København', to: 'Odense', price: '80' },
  { from: 'Aarhus', to: 'Aalborg', price: '70' },
  { from: 'København', to: 'Aalborg', price: '150' },
  { from: 'Odense', to: 'Aarhus', price: '90' },
  { from: 'København', to: 'Roskilde', price: '40' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 animate-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0aDEyVjBIMjR2MTRIMHYxMmgxNHYxMmgxMlYyNmgxMlYxNEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Kør sammen,<br />spar sammen
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto">
              Find billige lift eller del din tur med andre. WeShare forbinder chauffører og passagerer i hele Danmark.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <HeroSearchBar />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hvorfor vælge WeShare?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Samkørsel der er trygt, billigt og godt for miljøet</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-green-100 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Miljøvenligt</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Reducer dit CO₂-aftryk ved at dele bilen med andre. Hver delt tur gør en forskel.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trygt og sikkert</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Verificerede profiler, anmeldelser og sikker betaling via Stripe. Du er i trygge hænder.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Car className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Spar penge</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Del kørselsomkostningerne og spar op til 75% sammenlignet med offentlig transport.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Populære ruter</h2>
            <p className="text-gray-500">De mest søgte samkørselsruter i Danmark</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route, i) => (
              <Link
                key={i}
                href={`/rides?fra=${route.from}&til=${route.to}`}
                className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {route.from} → {route.to}
                    </p>
                    <p className="text-xs text-gray-500">Fra {route.price} kr</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Sådan virker det</h2>
            <p className="text-gray-500">Tre nemme trin til din næste samkørsel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Søg', desc: 'Indtast din afrejse, destination og dato for at finde tilgængelige lift.' },
              { step: '2', title: 'Book', desc: 'Vælg det lift der passer dig bedst og book med sikker betaling.' },
              { step: '3', title: 'Kør!', desc: 'Mød din chauffør og nyd turen. Bedøm hinanden bagefter.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-brand-600 text-white text-xl font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/rides"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-lg hover:shadow-xl"
            >
              Find et lift nu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kører du alene? Del turen!
          </h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
            Tjen penge ved at tilbyde ledige sæder i din bil. Det tager kun 2 minutter at oprette et lift.
          </p>
          <Link
            href="/rides/new"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-white text-brand-700 hover:bg-brand-50 shadow-lg hover:shadow-xl"
          >
            Tilbyd et lift <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
