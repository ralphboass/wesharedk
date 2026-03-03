'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchRideById, createBooking } from '@/lib/firebase-helpers'
import { useAuth } from '@/context/AuthContext'
import { Ride } from '@/lib/types'
import { Clock, Users, ArrowLeft, MessageCircle, Shield, Loader2 } from 'lucide-react'
import { format, isToday, isTomorrow } from 'date-fns'
import { da } from 'date-fns/locale'
import Link from 'next/link'

function formatRideDate(date: Date): string {
  if (isToday(date)) return 'I dag'
  if (isTomorrow(date)) return 'I morgen'
  return format(date, 'EEEE d. MMMM yyyy', { locale: da })
}

export default function RideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, firebaseUser } = useAuth()
  const [ride, setRide] = useState<Ride | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingInProgress, setBookingInProgress] = useState(false)
  const [seats, setSeats] = useState(1)
  const [booked, setBooked] = useState(false)
  const [bookingNote, setBookingNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      if (params.id) {
        const r = await fetchRideById(params.id as string)
        setRide(r)
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  async function handleBook() {
    if (!firebaseUser || !user || !ride) {
      router.push('/login')
      return
    }
    if (firebaseUser.uid === ride.riderId) {
      setError('Du kan ikke booke dit eget lift')
      return
    }

    setBookingInProgress(true)
    setError('')

    try {
      const bookingId = await createBooking({
        rideId: ride.id,
        passengerId: firebaseUser.uid,
        passengerName: `${user.firstName} ${user.lastName}`,
        driverId: ride.riderId,
        driverName: ride.riderName,
        seatsBooked: seats,
        departure: ride.departure,
        destination: ride.destination,
        rideDate: new Date(ride.date),
        rideTime: new Date(ride.time),
        price: ride.price,
        note: bookingNote || undefined,
      })

      if (bookingId) {
        setBooked(true)
      } else {
        setError('Kunne ikke oprette booking. Proev igen.')
      }
    } catch (err) {
      setError('Der opstod en fejl. Proev igen.')
    } finally {
      setBookingInProgress(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (!ride) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Lift ikke fundet</h2>
        <p className="text-gray-500 mb-6">Dette lift findes ikke eller er blevet slettet.</p>
        <Link href="/rides" className="text-brand-600 font-medium hover:underline">
          Tilbage til soegning
        </Link>
      </div>
    )
  }

  const dateLabel = formatRideDate(new Date(ride.date))
  const timeLabel = format(new Date(ride.time), 'HH:mm')
  const totalPrice = seats * ride.price

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/rides" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage til soegning
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold bg-brand-50 text-brand-700">
                <Clock className="w-3.5 h-3.5" />
                {dateLabel} kl. {timeLabel}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-100" />
                <div className="w-0.5 h-16 bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{ride.departure}</p>
                  <p className="text-sm text-gray-500">{ride.departureAddress}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{ride.destination}</p>
                  <p className="text-sm text-gray-500">{ride.destinationAddress}</p>
                </div>
              </div>
            </div>

            {ride.note && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">{ride.note}</p>
              </div>
            )}
          </div>

          {/* Driver card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Chauffør</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-xl font-bold text-brand-600">
                {ride.riderName.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{ride.riderName}</p>
                <span className="text-sm text-gray-400">WeShare medlem</span>
              </div>
            </div>
            {firebaseUser && firebaseUser.uid !== ride.riderId && (
              <Link
                href={`/messages?to=${ride.riderId}&ride=${ride.id}`}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg px-3 py-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send besked til chauffør
              </Link>
            )}
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-6">
            {booked ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Booking sendt!</h3>
                <p className="text-sm text-gray-500 mb-4">Din anmodning er sendt til chauffoeren. Du vil modtage besked naar den er bekraeftet.</p>
                <div className="flex flex-col gap-2">
                  <Link href="/bookings" className="text-brand-600 text-sm font-medium hover:underline">
                    Se mine bookinger
                  </Link>
                  <Link href="/rides" className="text-gray-500 text-sm hover:underline">
                    Find flere lift
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <p className="text-3xl font-bold text-gray-900">
                    {ride.price} <span className="text-base font-medium text-gray-500">kr</span>
                  </p>
                  <p className="text-sm text-gray-500">pr. person</p>
                </div>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Antal pladser</label>
                    <select
                      value={seats}
                      onChange={(e) => setSeats(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
                    >
                      {Array.from({ length: ride.availableSeats }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'plads' : 'pladser'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Besked (valgfrit)</label>
                    <textarea
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      placeholder="Besked til chauffør..."
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="text-lg font-bold text-gray-900">{totalPrice} kr</span>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
                )}

                <button
                  onClick={handleBook}
                  disabled={bookingInProgress || ride.availableSeats === 0}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {bookingInProgress ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sender anmodning...</>
                  ) : ride.availableSeats === 0 ? (
                    'Udsolgt'
                  ) : !firebaseUser ? (
                    'Log ind for at booke'
                  ) : (
                    'Send bookinganmodning'
                  )}
                </button>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  {ride.availableSeats} {ride.availableSeats === 1 ? 'plads' : 'pladser'} tilbage{ride.totalSeats ? ` af ${ride.totalSeats}` : ''}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
