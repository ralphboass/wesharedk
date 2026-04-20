'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MapPin, Calendar, Users, Search } from 'lucide-react'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
}

export default function SearchBar({ variant = 'compact' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [departure, setDeparture] = useState(searchParams.get('fra') || '')
  const [destination, setDestination] = useState(searchParams.get('til') || '')
  const [date, setDate] = useState(searchParams.get('dato') || '')
  const [passengers, setPassengers] = useState(searchParams.get('pladser') || '1')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (departure) params.set('fra', departure)
    if (destination) params.set('til', destination)
    if (date) params.set('dato', date)
    if (passengers && passengers !== '1') params.set('pladser', passengers)
    router.push(`/rides?${params.toString()}`)
  }

  const isHero = variant === 'hero'

  return (
    <form onSubmit={handleSearch}>
      <div className={`
        ${isHero
          ? 'bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-brand-900/10 p-6 md:p-8'
          : 'bg-white rounded-2xl shadow-sm border border-gray-100 p-4'
        }
      `}>
        <div className={`grid gap-3 ${isHero ? 'md:grid-cols-5' : 'md:grid-cols-5'}`}>
          {/* Departure */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            <input
              type="text"
              placeholder="Fra"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className={`w-full pl-10 pr-3 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-gray-900 placeholder-gray-400 ${isHero ? 'py-3.5' : 'py-3'}`}
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            <input
              type="text"
              placeholder="Til"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`w-full pl-10 pr-3 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-gray-900 placeholder-gray-400 ${isHero ? 'py-3.5' : 'py-3'}`}
            />
          </div>

          {/* Date */}
          <div className="relative max-w-full overflow-hidden">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 pointer-events-none z-10" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full max-w-full pl-10 pr-2 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-gray-900 ${isHero ? 'py-3.5' : 'py-3'}`}
              style={{ colorScheme: 'light' }}
            />
          </div>

          {/* Passengers */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className={`w-full pl-10 pr-3 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-gray-900 appearance-none bg-white ${isHero ? 'py-3.5' : 'py-3'}`}
            >
              <option value="1">1 passager</option>
              <option value="2">2 passagerer</option>
              <option value="3">3 passagerer</option>
              <option value="4">4 passagerer</option>
            </select>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg transition-all ${isHero ? 'py-3.5 text-base' : 'py-3 text-sm'}`}
          >
            <Search className="w-4 h-4" />
            Søg lift
          </button>
        </div>
      </div>
    </form>
  )
}
