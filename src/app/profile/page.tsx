'use client'

import { useAuth } from '@/context/AuthContext'
import { signOut } from '@/lib/firebase-helpers'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Star, Car, LogOut, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, firebaseUser, loading } = useAuth()
  const router = useRouter()

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
        <p className="text-gray-500 mb-6">Du skal være logget ind for at se denne side.</p>
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Min profil</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          {user.profileImageUrl ? (
            <img src={user.profileImageUrl} alt={user.firstName} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-2xl font-bold text-brand-600">
              {user.firstName.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-3 mt-1">
              {user.rating && user.rating > 0 ? (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-600">{user.rating.toFixed(1)}</span>
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
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{user.phoneNumber || 'Ikke angivet'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/rides/new"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md"
          >
            <Car className="w-4 h-4" /> Opret et lift
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
          >
            <LogOut className="w-4 h-4" /> Log ud
          </button>
        </div>
      </div>
    </div>
  )
}
