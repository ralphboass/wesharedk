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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Del din rejse med WeShare
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-brand-50">
               Gratis samkørsel i Danmark. Kør sammen, spar sammen.
            </p>
            <div className="flex flex-wrap gap-4 relative z-20">
              <Link
                href="/rides"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all"
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
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Hvorfor vælge WeShare?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Gratis samkørsels platform til hele Danmark.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-6 sm:p-8 border border-brand-100">
              <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">100% Gratis</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Ingen skjulte gebyrer eller provision. Alt går direkte til chaufføren. WeShare er helt gratis at bruge.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 sm:p-8 border border-green-100">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Sikkert</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Verificerede brugere, sikker kommunikation og gennemsigtige profiler. Din sikkerhed er vores prioritet.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 sm:p-8 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Fællesskab</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Mød nye mennesker, del rejsen og gør en forskel for miljøet. Sammen kører vi grønnere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-block text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">
                • MOBIL APP
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Tag WeShare med på farten
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Få den bedste oplevelse med vores iOS app. Book lift, chat med chauffører og administrer dine ture - alt sammen fra din telefon.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://apps.apple.com/dk/app/weshare-ride/id6754946645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Hent i App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors opacity-50 cursor-not-allowed"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Hent i Google Play
                </a>
              </div>
            </div>

            {/* App Screenshot with iPhone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-56 md:w-64 lg:w-72">
                {/* iPhone Frame */}
                <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10"></div>
                  {/* Screen */}
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
                    <Image
                      src="/screenshot.PNG"
                      alt="WeShare App Screenshot"
                      width={320}
                      height={640}
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Sådan virker det
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Kom i gang på få minutter
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
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
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/hero-bg.jpg" 
            alt="" 
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
