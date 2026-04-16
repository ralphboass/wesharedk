'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { fetchUserBookings, fetchDriverBookings, confirmBooking, rejectBooking, cancelBooking, fetchUserRides } from '@/lib/firebase-helpers'
import { Booking, Ride } from '@/lib/types'
import { Loader2, Calendar, MapPin, Check, X, ArrowLeft, Clock, Car } from 'lucide-react'
import { format } from 'date-fns'
import { da } from 'date-fns/locale'
import Link from 'next/link'

type Tab = 'passenger' | 'driver' | 'myrides'

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Afventer', color: 'bg-yellow-50 text-yellow-700' },
  payment_required: { label: 'Betaling kræves', color: 'bg-orange-50 text-orange-700' },
  confirmed: { label: 'Bekræftet', color: 'bg-green-50 text-green-700' },
  cancelled: { label: 'Annulleret', color: 'bg-red-50 text-red-700' },
  completed: { label: 'Fuldført', color: 'bg-blue-50 text-blue-700' },
}

export default function BookingsPage() {
  const { user, firebaseUser, loading: authLoading } = useAuth()
  const [tab, setTab] = useState<Tab>('passenger')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userRides, setUserRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!firebaseUser) return
    loadBookings()
  }, [firebaseUser, tab])

  async function loadBookings() {
    if (!firebaseUser) return
    setLoading(true)
    if (tab === 'myrides') {
      const rides = await fetchUserRides(firebaseUser.uid)
      setUserRides(rides)
    } else {
      const results = tab === 'passenger'
        ? await fetchUserBookings(firebaseUser.uid)
        : await fetchDriverBookings(firebaseUser.uid)
      setBookings(results)
    }
    setLoading(false)
  }

  async function handleConfirm(b: Booking) {
    setActionLoading(b.id)
    try {
      await confirmBooking(b.id, b.rideId, b.seatsBooked)
      await loadBookings()
    } catch (err) {
      console.error('Error confirming booking:', err)
    }
    setActionLoading(null)
  }

  async function handleReject(b: Booking) {
    setActionLoading(b.id)
    try {
      await rejectBooking(b.id)
      await loadBookings()
    } catch (err) {
      console.error('Error rejecting booking:', err)
    }
    setActionLoading(null)
  }

  async function handleCancel(b: Booking) {
    setActionLoading(b.id)
    try {
      await cancelBooking(b.id, b.rideId, b.seatsBooked)
      await loadBookings()
    } catch (err) {
      console.error('Error cancelling booking:', err)
    }
    setActionLoading(null)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Log ind for at se dine bookinger</h2>
        <Link href="/login" className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 shadow-md">
          Log ind
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/profile" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage til profil
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mine bookinger</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setTab('passenger')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'passenger' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Mine bookinger
        </button>
        <button
          onClick={() => setTab('driver')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'driver' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Anmodninger
        </button>
        <button
          onClick={() => setTab('myrides')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'myrides' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Mine rejser
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
        </div>
      ) : tab === 'myrides' ? (
        userRides.length === 0 ? (
          <div className="text-center py-20">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingen ture oprettet endnu</h3>
            <p className="text-sm text-gray-500 mb-4">Opret et lift og find passagerer.</p>
            <Link href="/rides/new" className="inline-flex px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-md">
              Opret lift
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userRides.map((ride) => (
              <Link
                key={ride.id}
                href={`/rides/${ride.id}`}
                className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-300 hover:bg-brand-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900">{ride.departure}</span>
                      <span className="text-gray-400">→</span>
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-sm font-semibold text-gray-900">{ride.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(ride.date), 'd. MMM yyyy', { locale: da })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(ride.time), 'HH:mm')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-brand-600">{ride.price} kr</div>
                    <div className="text-xs text-gray-500">{ride.availableSeats} pladser</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : bookings.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {tab === 'passenger' ? 'Ingen bookinger endnu' : 'Ingen anmodninger endnu'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {tab === 'passenger' ? 'Find et lift og book din naeste rejse.' : 'Naar nogen booker dit lift, vil det vises her.'}
          </p>
          {tab === 'passenger' && (
            <Link href="/rides" className="text-brand-600 text-sm font-medium hover:underline">
              Find lift
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const status = statusLabels[b.status] || { label: b.status, color: 'bg-gray-50 text-gray-700' }
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Route */}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-900">{b.departure}</span>
                      <span className="text-gray-400">→</span>
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-sm font-semibold text-gray-900">{b.destination}</span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{format(new Date(b.rideDate), 'd. MMM yyyy', { locale: da })}</span>
                      <span>{format(new Date(b.rideTime), 'HH:mm')}</span>
                      <span>{b.seatsBooked} {b.seatsBooked === 1 ? 'plads' : 'pladser'}</span>
                      <span className="font-semibold text-gray-700">{b.price * b.seatsBooked} kr</span>
                    </div>

                    {/* Other party */}
                    <p className="text-xs text-gray-500 mt-1">
                      {tab === 'passenger' ? `Chauffør: ${b.driverName}` : `Passager: ${b.passengerName}`}
                    </p>

                    {b.note && (
                      <p className="text-xs text-gray-500 mt-1 italic">&quot;{b.note}&quot;</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>

                    {/* Driver actions for pending bookings */}
                    {tab === 'driver' && b.status === 'pending' && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleConfirm(b)}
                          disabled={actionLoading === b.id}
                          className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50"
                          title="Bekræft"
                        >
                          {actionLoading === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleReject(b)}
                          disabled={actionLoading === b.id}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                          title="Afvis"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Passenger cancel for pending/confirmed */}
                    {tab === 'passenger' && (b.status === 'pending' || b.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancel(b)}
                        disabled={actionLoading === b.id}
                        className="text-xs text-red-500 hover:text-red-600 disabled:opacity-50"
                      >
                        {actionLoading === b.id ? 'Annullerer...' : 'Annuller'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
