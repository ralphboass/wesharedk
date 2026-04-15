'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface DanishAddressAutocompleteProps {
  addressValue: string
  cityValue: string
  onAddressChange: (address: string) => void
  onCityChange: (city: string) => void
  addressPlaceholder: string
  addressLabel: string
  cityLabel: string
  required?: boolean
}

interface DAWAAddress {
  tekst: string
  adresse: {
    vejnavn: string
    husnr: string
    postnr: string
    postnrnavn: string
  }
}

export default function DanishAddressAutocomplete({
  addressValue,
  cityValue,
  onAddressChange,
  onCityChange,
  addressPlaceholder,
  addressLabel,
  cityLabel,
  required = false,
}: DanishAddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<DAWAAddress[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (addressValue.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Debounce API calls
    debounceTimer.current = setTimeout(async () => {
      setLoading(true)
      try {
        // Use DAWA (Danish Address Web API) - free government service
        const response = await fetch(
          `https://api.dataforsyningen.dk/adresser/autocomplete?q=${encodeURIComponent(addressValue)}&per_side=8`
        )
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(data.length > 0)
      } catch (error) {
        console.error('Error fetching addresses:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [addressValue])

  function selectSuggestion(suggestion: DAWAAddress) {
    const address = `${suggestion.adresse.vejnavn} ${suggestion.adresse.husnr}`
    const city = suggestion.adresse.postnrnavn
    
    onAddressChange(address)
    onCityChange(city)
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Address Input with DAWA Autocomplete */}
      <div ref={wrapperRef} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {addressLabel} {required && '*'}
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <input
            type="text"
            value={addressValue}
            onChange={(e) => onAddressChange(e.target.value)}
            onFocus={() => addressValue.length >= 3 && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder={addressPlaceholder}
            required={required}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-brand-50 text-sm border-b border-gray-50 last:border-0 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-gray-900 font-medium">
                      {suggestion.adresse.vejnavn} {suggestion.adresse.husnr}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {suggestion.adresse.postnr} {suggestion.adresse.postnrnavn}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* City Display (Auto-detected from DAWA) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {cityLabel}
        </label>
        <input
          type="text"
          value={cityValue}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="Auto-detekteret fra adresse"
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm bg-gray-50"
        />
      </div>
    </div>
  )
}
