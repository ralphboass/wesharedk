'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import DanishAddressAutocomplete from '@/components/DanishAddressAutocomplete'

export default function NewRideStep1Page() {
  const router = useRouter()
  const [departure, setDeparture] = useState('')
  const [departureAddress, setDepartureAddress] = useState('')
  const [destination, setDestination] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')

  function handleNext(e: React.FormEvent) {
    e.preventDefault()
    
    // Save to sessionStorage
    sessionStorage.setItem('newRide', JSON.stringify({
      departure,
      departureAddress,
      destination,
      destinationAddress,
    }))
    
    router.push('/rides/new/step2')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/rides" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Opret et lift</h1>
          <p className="text-sm text-gray-500">Trin 1 af 2: Vælg din rute</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-brand-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium text-brand-600">Rute</span>
            <span className="text-xs text-gray-400">Detaljer</span>
          </div>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {/* Departure */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Afgang
            </h3>
            <DanishAddressAutocomplete
              addressValue={departureAddress}
              cityValue={departure}
              onAddressChange={setDepartureAddress}
              onCityChange={setDeparture}
              addressPlaceholder="Skriv adresse, f.eks. Nørrebrogade 20"
              addressLabel="Adresse"
              cityLabel="By"
              required
            />
          </div>

          {/* Destination */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Destination
            </h3>
            <DanishAddressAutocomplete
              addressValue={destinationAddress}
              cityValue={destination}
              onAddressChange={setDestinationAddress}
              onCityChange={setDestination}
              addressPlaceholder="Skriv adresse, f.eks. Banegårdspladsen 5"
              addressLabel="Adresse"
              cityLabel="By"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Næste: Tid og pris <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
