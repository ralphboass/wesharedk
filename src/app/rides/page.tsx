'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchRides } from '@/lib/firebase-helpers'
import { Ride } from '@/lib/types'
import RideCard from '@/components/RideCard'
import SearchBar from '@/components/SearchBar'
import { Loader2, SearchX } from 'lucide-react'

function RidesContent() {
  const searchParams = useSearchParams()
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  const fra = searchParams.get('fra') || ''
  const til = searchParams.get('til') || ''
  const dato = searchParams.get('dato') || ''

  useEffect(() => {
    async function load() {
      setLoading(true)
      const results = await fetchRides({
        departureCity: fra,
        destinationCity: til,
        date: dato,
      })
      setRides(results)
      setLoading(false)
    }
    load()
  }, [fra, til, dato])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search */}
      <div className="mb-8">
        <SearchBar variant="compact" />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {fra && til ? `${fra} → ${til}` : 'Alle tilgængelige lift'}
          </h1>
          {!loading && (
            <p className="text-sm text-gray-500 mt-1">
              {rides.length} {rides.length === 1 ? 'lift fundet' : 'lift fundet'}
              {dato && ` for ${new Date(dato).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })}`}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-3" />
          <p className="text-sm text-gray-500">Søger efter lift...</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <SearchX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingen lift fundet</h3>
          <p className="text-sm text-gray-500 max-w-md mb-6">
            {fra || til
              ? `Vi fandt ingen lift fra ${fra || '...'} til ${til || '...'}.  Prøv at søge med andre kriterier eller opret en liftagent.`
              : 'Der er ingen tilgængelige lift lige nu. Prøv igen senere eller opret dit eget lift.'}
          </p>
          <a
            href="/rides/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md"
          >
            Tilbyd et lift
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function RidesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    }>
      <RidesContent />
    </Suspense>
  )
}
