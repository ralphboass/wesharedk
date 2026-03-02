'use client'

import Link from 'next/link'
import { Ride } from '@/lib/types'
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react'
import { format, isToday, isTomorrow } from 'date-fns'
import { da } from 'date-fns/locale'

function formatRideDate(date: Date): string {
  if (isToday(date)) return 'I dag'
  if (isTomorrow(date)) return 'I morgen'
  return format(date, 'd. MMM', { locale: da })
}

function formatTime(date: Date, timeStr?: string): string {
  if (timeStr) return timeStr
  return format(date, 'HH:mm')
}

export default function RideCard({ ride }: { ride: Ride }) {
  const dateLabel = formatRideDate(new Date(ride.departureDate))
  const timeLabel = formatTime(new Date(ride.departureDate), ride.departureTime)

  return (
    <Link href={`/rides/${ride.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-200">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Route info */}
          <div className="flex-1 min-w-0">
            {/* Date & Time */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                <Clock className="w-3 h-3" />
                {dateLabel} kl. {timeLabel}
              </span>
              {ride.availableSeats <= 2 && ride.availableSeats > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                  Kun {ride.availableSeats} {ride.availableSeats === 1 ? 'plads' : 'pladser'} tilbage
                </span>
              )}
            </div>

            {/* Route */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-100" />
                <div className="w-0.5 h-8 bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-100" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{ride.departureCity || ride.departureAddress}</p>
                  <p className="text-xs text-gray-500 truncate">{ride.departureAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{ride.destinationCity || ride.destinationAddress}</p>
                  <p className="text-xs text-gray-500 truncate">{ride.destinationAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Price & Driver */}
          <div className="flex flex-col items-end justify-between self-stretch gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {ride.pricePerSeat} <span className="text-sm font-medium text-gray-500">kr</span>
              </p>
              <p className="text-xs text-gray-500">pr. person</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3.5 h-3.5" />
                {ride.availableSeats} {ride.availableSeats === 1 ? 'plads' : 'pladser'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ride.driverPhotoUrl ? (
                <img src={ride.driverPhotoUrl} alt={ride.driverName} className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-600">
                  {ride.driverName.charAt(0)}
                </div>
              )}
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700">{ride.driverName}</p>
                {ride.driverRating && ride.driverRating > 0 ? (
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">{ride.driverRating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Nyt medlem</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hover arrow */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium text-brand-600 flex items-center gap-1">
            Se detaljer <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}
