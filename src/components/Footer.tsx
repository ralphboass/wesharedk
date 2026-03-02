'use client'

import Link from 'next/link'
import { Car, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">WeShare</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Kør sammen, spar sammen. Danmarks samkørselsplatform for studerende og pendlere.
            </p>
          </div>

          {/* Samkørsel */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Samkørsel</h3>
            <ul className="space-y-2.5">
              <li><Link href="/rides" className="text-sm hover:text-white">Find et lift</Link></li>
              <li><Link href="/rides/new" className="text-sm hover:text-white">Tilbyd lift</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-white">Sådan virker det</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li><Link href="/how-it-works" className="text-sm hover:text-white">Hjælp</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-white">Regler</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-white">Privatlivspolitik</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-white">Betingelser</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Kontakt</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-brand-400" />
                support@weshare.dk
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-brand-400" />
                København, Danmark
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} WeShare DK. Alle rettigheder forbeholdes.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Danmark · Dansk</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
