'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { signOut, fetchUserRides, updateUserProfile } from '@/lib/firebase-helpers'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Star, Car, LogOut, Loader2, MessageCircle, Calendar, CheckCircle, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { Ride } from '@/lib/types'
import { format } from 'date-fns'
import { da } from 'date-fns/locale'
import ProfileImageUpload from '@/components/ProfileImageUpload'

export default function ProfilePage() {
  const { user, firebaseUser, loading } = useAuth()
  const router = useRouter()
  const [userRides, setUserRides] = useState<Ride[]>([])
  const [ridesLoading, setRidesLoading] = useState(true)

  useEffect(() => {
    if (firebaseUser) {
      loadUserRides()
    }
  }, [firebaseUser])

  async function loadUserRides() {
    if (!firebaseUser) return
    setRidesLoading(true)
    const rides = await fetchUserRides(firebaseUser.uid)
    setUserRides(rides)
    setRidesLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (!firebaseUser || !user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Log ind for at se din profil</h2>
        <p className="text-gray-500 mb-6">Du skal vaere logget ind for at se denne side.</p>
        <Link href="/login" className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 shadow-md">
          Log ind
        </Link>
      </div>
    )
  }

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  async function handleImageUploaded(url: string) {
    if (!firebaseUser) return
    try {
      await updateUserProfile(firebaseUser.uid, { profileImageUrl: url })
      // Refresh page to show new image
      window.location.reload()
    } catch (error) {
      console.error('Error updating profile image:', error)
    }
  }

  const rating = user.driverRating || user.passengerRating

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Min profil</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <ProfileImageUpload
            currentImageUrl={user.profileImageUrl}
            userId={firebaseUser.uid}
            userName={user.firstName}
            onImageUploaded={handleImageUploaded}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-3 mt-1">
              {rating && rating > 0 ? (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">Ingen anmeldelser endnu</span>
              )}
              <span className="text-sm text-gray-500">{user.numberOfTrips} ture</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{user.email}</span>
            {user.emailVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                <CheckCircle className="w-3 h-3" /> Bekraeftet
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{user.phoneNumber || 'Ikke angivet'}</span>
          </div>
          {user.biography && (
            <div className="pt-2">
              <p className="text-sm text-gray-600">{user.biography}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/rides/new"
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium text-brand-700 bg-brand-50 hover:bg-brand-100"
          >
            <Car className="w-5 h-5" />
            <span>Opret lift</span>
          </Link>
          <Link
            href="/bookings"
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
          >
            <Calendar className="w-5 h-5" />
            <span>Bookinger</span>
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Beskeder</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Log ud</span>
          </button>
        </div>
      </div>

      {/* Mine rejser section */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mine rejser</h2>
        
        {ridesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
          </div>
        ) : userRides.length === 0 ? (
          <div className="text-center py-8">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-4">Du har ikke oprettet nogen ture endnu</p>
            <Link
              href="/rides/new"
              className="inline-flex px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-md"
            >
              Opret dit første lift
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userRides.map((ride) => (
              <Link
                key={ride.id}
                href={`/rides/${ride.id}`}
                className="block p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-900 truncate">{ride.departure}</span>
                      <span className="text-gray-400">→</span>
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="text-sm font-medium text-gray-900 truncate">{ride.destination}</span>
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
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-brand-600">{ride.price} kr</div>
                    <div className="text-xs text-gray-500">{ride.availableSeats} pladser</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
