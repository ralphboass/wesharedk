'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Car, Users, Shield, DollarSign, ArrowRight, Download, MapPin, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/hero-bg.jpg" 
            alt="" 
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Del din rejse med WeShare
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-brand-50">
              100% gratis samkørsel i Danmark. Ingen provision, ingen skjulte gebyrer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rides"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold text-lg hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all"
              >
                Find et lift
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rides/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-brand-700/70 border-2 border-white/20 transition-all"
              >
                Tilbyd lift
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hvorfor vælge WeShare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Danmarks eneste helt gratis samkørselsplatform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-8 border border-brand-100">
              <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Gratis</h3>
              <p className="text-gray-600 leading-relaxed">
                Ingen skjulte gebyrer eller provision. Alt går direkte til chaufføren. WeShare er helt gratis at bruge.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sikkert</h3>
              <p className="text-gray-600 leading-relaxed">
                Verificerede brugere, sikker kommunikation og gennemsigtige profiler. Din sikkerhed er vores prioritet.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fællesskab</h3>
              <p className="text-gray-600 leading-relaxed">
                Mød nye mennesker, del rejsen og gør en forskel for miljøet. Sammen kører vi grønnere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Text Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Download className="w-4 h-4" />
                  Download appen
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tag WeShare med på farten
                </h2>
                <p className="text-xl text-brand-50 mb-8 leading-relaxed">
                  Få den bedste oplevelse med vores iOS app. Book lift, chat med chauffører og administrer dine ture - alt sammen fra din telefon.
                </p>
                <a
                  href="https://apps.apple.com/dk/app/weshare-ride/id6754946645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-105 transition-transform"
                >
                  <Image
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/da-dk?size=250x83&releaseDate=1234567890"
                    alt="Download on App Store"
                    width={200}
                    height={67}
                    className="h-14 w-auto"
                  />
                </a>
              </div>

              {/* App Screenshot */}
              <div className="relative">
                <div className="relative mx-auto w-64 md:w-80">
                  <Image
                    src="/screenshot.PNG"
                    alt="WeShare App Screenshot"
                    width={320}
                    height={640}
                    className="rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sådan virker det
            </h2>
            <p className="text-xl text-gray-600">
              Kom i gang på få minutter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Opret profil</h3>
              <p className="text-gray-600">
                Tilmeld dig gratis og opret din profil på få minutter
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find eller tilbyd lift</h3>
              <p className="text-gray-600">
                Søg efter lift eller tilbyd dine egne ture
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kør sammen</h3>
              <p className="text-gray-600">
                Chat, mød op og del rejsen. Betal direkte med MobilePay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klar til at komme i gang?
          </h2>
          <p className="text-xl text-brand-50 mb-8">
            Tilmeld dig i dag og find din næste rejse
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold text-lg hover:bg-gray-50 shadow-xl transition-all"
            >
              Opret profil gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/om-os"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-brand-700/70 border-2 border-white/20 transition-all"
            >
              Læs mere om os
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
