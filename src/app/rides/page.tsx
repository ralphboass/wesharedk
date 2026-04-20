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
        departure: fra,
        destination: til,
        date: dato,
      })
      setRides(results)
      setLoading(false)
    }
    load()
  }, [fra, til, dato])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Find et lift</h1>
      <div className="mb-8">
        <SearchBar variant="compact" />
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
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
          <div className="w-full px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm">
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
