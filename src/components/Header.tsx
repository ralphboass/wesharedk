'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { signOut } from '@/lib/firebase-helpers'
import { Menu, X, Car, LogOut, User, Plus, MessageCircle, Calendar } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const { user, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="WeShare" width={120} height={40} className="h-10 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/rides"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
            >
              Find et lift
            </Link>
            <Link
              href="/rides/new"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
            >
              Tilbyd lift
            </Link>
            <Link
              href="/how-it-works"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
            >
              Sådan virker det
            </Link>
            <Link
              href="/om-os"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50"
            >
              Om os
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/rides/new"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-brand-50 text-brand-700 hover:bg-brand-100"
                >
                  <Plus className="w-4 h-4" />
                  Opret lift
                </Link>
                <Link
                  href="/bookings"
                  className="p-2 rounded-lg text-gray-500 hover:text-brand-600 hover:bg-brand-50"
                  title="Bookinger"
                >
                  <Calendar className="w-4 h-4" />
                </Link>
                <Link
                  href="/messages"
                  className="p-2 rounded-lg text-gray-500 hover:text-brand-600 hover:bg-brand-50"
                  title="Beskeder"
                >
                  <MessageCircle className="w-4 h-4" />
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-600" />
                  </div>
                  {user.firstName}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  title="Log ud"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Log ind
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg"
                >
                  Opret profil
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            <Link href="/rides" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50" onClick={() => setMenuOpen(false)}>
              Find et lift
            </Link>
            <Link href="/rides/new" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50" onClick={() => setMenuOpen(false)}>
              Tilbyd lift
            </Link>
            <Link href="/how-it-works" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50" onClick={() => setMenuOpen(false)}>
              Sådan virker det
            </Link>
            <div className="pt-3 border-t border-gray-100">
              {user ? (
                <>
                  <Link href="/profile" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                    Min profil
                  </Link>
                  <Link href="/bookings" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                    Mine bookinger
                  </Link>
                  <Link href="/messages" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                    Beskeder
                  </Link>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Log ud
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                    Log ind
                  </Link>
                  <Link href="/signup" className="block px-4 py-3 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50" onClick={() => setMenuOpen(false)}>
                    Opret profil
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
