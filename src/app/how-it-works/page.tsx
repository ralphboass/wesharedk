'use client'

import Link from 'next/link'
import { Search, CreditCard, Car, Shield, Star, Users, ArrowRight, CheckCircle } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Sådan virker WeShare</h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto">
            Find billige lift eller tjen penge ved at dele din tur. Det er nemt, sikkert og godt for miljøet.
          </p>
        </div>
      </section>

      {/* For Passengers */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">For passagerer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Søg</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Indtast din afrejse, destination og rejsedato. Gennemse tilgængelige lift og find den perfekte match.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-green-100 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Book og betal</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Book dit lift med sikker betaling via Stripe. Din betaling holdes sikkert indtil turen er gennemført.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Car className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Rejs!</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mød din chauffør på det aftalte sted og nyd turen. Bedøm hinanden bagefter for at hjælpe fællesskabet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Drivers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">For chauffører</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-100 flex items-center justify-center">
                <Car className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Opret et lift</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Angiv din rute, dato, tid og pris. Det tager kun 2 minutter at oprette et lift.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Acceptér passagerer</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Gennemgå bookinganmodninger og acceptér de passagerer du vil rejse med.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-green-100 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Tjen penge</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Modtag betaling direkte til din konto efter turen er gennemført. Reducer dine kørselsomkostninger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Sikkerhed først</h2>
            <p className="text-gray-500">Vi tager din sikkerhed alvorligt</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Verificerede profiler', desc: 'Alle brugere verificeres med e-mail og telefonnummer.' },
              { icon: Star, title: 'Anmeldelser og ratings', desc: 'Chauffører og passagerer bedømmer hinanden efter hver tur.' },
              { icon: CreditCard, title: 'Sikker betaling', desc: 'Alle betalinger håndteres sikkert via Stripe. Ingen kontanter nødvendigt.' },
              { icon: CheckCircle, title: 'Kundesupport', desc: 'Vores team er klar til at hjælpe dig, hvis der opstår problemer.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Klar til at komme i gang?</h2>
          <p className="text-brand-100 mb-8">Find et lift eller tilbyd din næste tur i dag</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/rides" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white text-brand-700 hover:bg-brand-50 shadow-lg">
              Find et lift <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/rides/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border-2 border-white/30 hover:bg-white/10">
              Tilbyd et lift <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
