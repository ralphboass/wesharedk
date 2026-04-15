'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

interface GooglePlacesAutocompleteProps {
  addressValue: string
  cityValue: string
  onAddressChange: (address: string) => void
  onCityChange: (city: string) => void
  addressPlaceholder: string
  addressLabel: string
  cityLabel: string
  required?: boolean
}

declare global {
  interface Window {
    google: any
    initGooglePlaces: () => void
  }
}

export default function GooglePlacesAutocomplete({
  addressValue,
  cityValue,
  onAddressChange,
  onCityChange,
  addressPlaceholder,
  addressLabel,
  cityLabel,
  required = false,
}: GooglePlacesAutocompleteProps) {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Google Places API script
    const loadGooglePlaces = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
        return
      }

      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return
      }

      const script = document.createElement('script')
      // Using the free Google Places API - you'll need to add your API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_PLACES_API_KEY&libraries=places&callback=initGooglePlaces`
      script.async = true
      script.defer = true
      
      window.initGooglePlaces = () => {
        setIsLoaded(true)
      }

      document.head.appendChild(script)
    }

    loadGooglePlaces()
  }, [])

  useEffect(() => {
    if (!isLoaded || !addressInputRef.current || autocompleteRef.current) return

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        componentRestrictions: { country: 'dk' }, // Restrict to Denmark
        fields: ['address_components', 'formatted_address', 'name'],
        types: ['address'], // Only show addresses
      }
    )

    // Listen for place selection
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace()
      
      if (!place.address_components) return

      let streetAddress = ''
      let city = ''
      let postalCode = ''

      // Extract address components
      for (const component of place.address_components) {
        const types = component.types

        if (types.includes('street_number')) {
          streetAddress = component.long_name + ' ' + streetAddress
        }
        if (types.includes('route')) {
          streetAddress += component.long_name
        }
        if (types.includes('locality')) {
          city = component.long_name
        }
        if (types.includes('postal_code')) {
          postalCode = component.long_name
        }
      }

      // Update address and city
      const fullAddress = streetAddress || place.formatted_address || place.name
      onAddressChange(fullAddress)
      onCityChange(city)
    })
  }, [isLoaded, onAddressChange, onCityChange])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Address Input with Google Places Autocomplete */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {addressLabel} {required && '*'}
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <input
            ref={addressInputRef}
            type="text"
            value={addressValue}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder={addressPlaceholder}
            required={required}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
          />
        </div>
      </div>

      {/* City Display (Auto-detected from Google Places) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {cityLabel}
        </label>
        <input
          type="text"
          value={cityValue}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="Auto-detekteret"
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm bg-gray-50"
        />
      </div>
    </div>
  )
}
