'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createRide } from '@/lib/firebase-helpers'
import { Calendar, Users, FileText, Loader2, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import TimePicker from '@/components/TimePicker'

export default function NewRideStep2Page() {
  const router = useRouter()
  const { user, firebaseUser } = useAuth()

  const [routeData, setRouteData] = useState<any>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [seats, setSeats] = useState('3')
  const [price, setPrice] = useState(50)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('newRide')
    if (!saved) {
      router.push('/rides/new/step1')
      return
    }
    setRouteData(JSON.parse(saved))
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!firebaseUser || !user || !routeData) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const [hours, minutes] = time.split(':')
      const rideDate = new Date(date)
      const rideTime = new Date(date)
      rideTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const rideId = await createRide({
        riderId: firebaseUser.uid,
        riderName: `${user.firstName} ${user.lastName}`,
        departure: routeData.departure,
        departureAddress: routeData.departureAddress,
        destination: routeData.destination,
        destinationAddress: routeData.destinationAddress,
        date: rideDate,
        time: rideTime,
        availableSeats: parseInt(seats),
        totalSeats: parseInt(seats),
        price: price,
        note: note || undefined,
      })

      if (rideId) {
        sessionStorage.removeItem('newRide')
        router.push(`/rides/${rideId}`)
      } else {
        setError('Kunne ikke oprette lift. Prøv igen.')
      }
    } catch (err: any) {
      console.error('Error creating ride:', err)
      setError(err.message || 'Der opstod en fejl. Prøv igen.')
    } finally {
      setLoading(false)
    }
  }

  if (!routeData) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/rides/new/step1" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage til rute
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Opret et lift</h1>
          <p className="text-sm text-gray-500">Trin 2 af 2: Tid, pris og detaljer</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-brand-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-brand-500 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Rute</span>
            <span className="text-xs font-medium text-brand-600">Detaljer</span>
          </div>
        </div>

        {/* Route summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="w-0.5 h-12 bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{routeData.departure}</p>
                <p className="text-xs text-gray-500">{routeData.departureAddress}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{routeData.destination}</p>
                <p className="text-xs text-gray-500">{routeData.destinationAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dato *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
            </div>
            <TimePicker
              value={time}
              onChange={setTime}
              label="Tidspunkt"
              required
            />
          </div>

          {/* Seats & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ledige pladser</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select value={seats} onChange={(e) => setSeats(e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm appearance-none bg-white">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'plads' : 'pladser'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pris pr. person (kr)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
                step="10"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Besked (valgfrit)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea placeholder="Fortæl lidt om turen, f.eks. afhentningssted, bagage, osv." value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none" />
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-2">💳 Betaling</h3>
                <p className="text-sm text-blue-800 leading-relaxed mb-2">
                  Passagerer betaler dig direkte via <strong>MobilePay</strong> eller efter aftale.
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>WeShareRide.dk er gratis!</strong> Vi tager ingen provision - hele beløbet er dit.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Opretter...</> : 'Opret lift'}
          </button>
        </form>
      </div>
    </div>
  )
}
