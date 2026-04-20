'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, Shield, DollarSign } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Om WeShare</h1>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            WeShare er skabt af to studerende fra Aarhus BSS, der så en mulighed for at skabe en gratis og tilgængelig samkørselsplatform i Danmark, efter GoMore lukkede deres tjenester.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vores mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi ønsker at gøre det nemt og tilgængeligt for danskere at dele biler og reducere transportomkostninger. WeShare er <strong>100% gratis</strong> – vi tager ingen provision af dine ture. Hele beløbet går direkte til chaufføren.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hvorfor WeShare?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-brand-50 rounded-xl p-6">
              <DollarSign className="w-10 h-10 text-brand-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">100% Gratis</h3>
              <p className="text-sm text-gray-600">Ingen skjulte gebyrer eller provision. Alt går til chaufføren.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <Shield className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Sikkert</h3>
              <p className="text-sm text-gray-600">Verificerede brugere og sikker kommunikation.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <Heart className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Fællesskab</h3>
              <p className="text-sm text-gray-600">Byg forbindelser og del rejsen med andre danskere.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vores vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi tror på, at samkørsel kan gøre en forskel – både for din økonomi og for miljøet. Ved at skabe en platform, der er nem at bruge og helt gratis, håber vi at gøre samkørsel til det naturlige valg for danskere.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-3">Kom i gang i dag</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download vores app eller brug websitet til at finde eller tilbyde lift i hele Danmark.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/rides" 
                className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md"
              >
                Find lift
              </Link>
              <Link 
                href="/rides/new" 
                className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-brand-600 bg-white border-2 border-brand-600 hover:bg-brand-50"
              >
                Tilbyd lift
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
