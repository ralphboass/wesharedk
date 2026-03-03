'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createRide } from '@/lib/firebase-helpers'
import { MapPin, Calendar, Clock, Users, FileText, Loader2, ArrowLeft, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

export default function NewRidePage() {
  const router = useRouter()
  const { user, firebaseUser } = useAuth()

  const [departureAddress, setDepartureAddress] = useState('')
  const [departureCity, setDepartureCity] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [destinationCity, setDestinationCity] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [seats, setSeats] = useState('3')
  const [price, setPrice] = useState(50)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!firebaseUser || !user) {
      router.push('/login')
      return
    }

    if (!departureCity || !destinationCity || !date || !time || price <= 0) {
      setError('Udfyld venligst alle påkrævede felter')
      return
    }

    if (price < 5) {
      setError('Prisen skal være mindst 5 kr')
      return
    }

    setLoading(true)
    setError('')

    try {
      const dateTime = new Date(`${date}T${time}`)
      
      if (isNaN(dateTime.getTime())) {
        setError('Ugyldig dato eller tidspunkt')
        setLoading(false)
        return
      }

      const numSeats = parseInt(seats)
      const numPrice = price

      const rideId = await createRide({
        driverId: firebaseUser.uid,
        driverName: `${user.firstName} ${user.lastName}`,
        driverPhotoUrl: user.profileImageUrl,
        driverRating: user.rating,
        driverNumberOfTrips: user.numberOfTrips,
        departureAddress: departureAddress || departureCity,
        departureCity,
        departureLat: 0,
        departureLng: 0,
        destinationAddress: destinationAddress || destinationCity,
        destinationCity,
        destinationLat: 0,
        destinationLng: 0,
        departureDate: dateTime,
        departureTime: time,
        availableSeats: numSeats,
        totalSeats: numSeats,
        pricePerSeat: numPrice,
        status: 'active',
        description: description || undefined,
      })

      if (rideId) {
        router.push(`/rides/${rideId}`)
      } else {
        setError('Kunne ikke oprette lift. Prøv igen.')
      }
    } catch (err: any) {
      console.error('Error creating ride:', err)
      setError(`Der opstod en fejl: ${err.message || 'Prøv igen.'}`)
    } finally {
      setLoading(false)
    }
  }

  if (!firebaseUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Log ind for at tilbyde lift</h2>
        <p className="text-gray-500 mb-6">Du skal være logget ind for at oprette et lift.</p>
        <Link href="/login" className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 shadow-md">
          Log ind
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/rides" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tilbyd et lift</h1>
        <p className="text-sm text-gray-500 mb-8">Udfyld oplysningerne om din tur og find passagerer</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Departure */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Afgang
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="By *" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
              <input type="text" placeholder="Adresse (valgfrit)" value={departureAddress} onChange={(e) => setDepartureAddress(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="By *" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
              <input type="text" placeholder="Adresse (valgfrit)" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dato *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tidspunkt *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit-ampm-field]:hidden"
                  style={{ colorScheme: 'light' }}
                />
              </div>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pris pr. person *</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrice(Math.max(5, price - 5))}
                  className="w-10 h-10 rounded-xl border border-gray-200 hover:border-brand-400 hover:bg-brand-50 flex items-center justify-center text-gray-600 hover:text-brand-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Math.max(5, parseInt(e.target.value) || 5))}
                    required
                    min="5"
                    step="5"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-center font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 font-medium pointer-events-none">kr</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPrice(price + 5)}
                  className="w-10 h-10 rounded-xl border border-gray-200 hover:border-brand-400 hover:bg-brand-50 flex items-center justify-center text-gray-600 hover:text-brand-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Juster prisen i 5 kr intervaller</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beskrivelse (valgfrit)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea placeholder="Fortæl lidt om turen, f.eks. afhentningssted, bagage, osv." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm resize-none" />
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
