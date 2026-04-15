'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface AddressAutocompleteProps {
  addressValue: string
  cityValue: string
  onAddressChange: (address: string) => void
  onCityChange: (city: string) => void
  addressPlaceholder: string
  addressLabel: string
  cityLabel: string
  required?: boolean
}

// Danish cities mapping - common addresses to cities
const danishCities = [
  'København', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding',
  'Horsens', 'Vejle', 'Roskilde', 'Herning', 'Helsingør', 'Silkeborg', 'Næstved',
  'Fredericia', 'Viborg', 'Køge', 'Holstebro', 'Taastrup', 'Slagelse', 'Hillerød',
  'Holbæk', 'Sønderborg', 'Svendborg', 'Hjørring', 'Frederikshavn', 'Nørresundby',
  'Ringsted', 'Ølstykke', 'Skive', 'Korsør', 'Frederikssund', 'Nykøbing F',
  'Varde', 'Nyborg', 'Kalundborg', 'Grenaa', 'Birkerød', 'Hørsholm', 'Rønne',
  'Thisted', 'Albertslund', 'Glostrup', 'Haderslev', 'Lillerød', 'Ishøj',
  'Tårnby', 'Ballerup', 'Vallensbæk', 'Brøndby', 'Hvidovre', 'Gladsaxe',
  'Gentofte', 'Lyngby-Taarbæk', 'Lyngby', 'Rudersdal', 'Furesø', 'Høje-Taastrup',
  'Herlev', 'Rødovre', 'Dragør',
]

export default function AddressAutocomplete({
  addressValue,
  cityValue,
  onAddressChange,
  onCityChange,
  addressPlaceholder,
  addressLabel,
  cityLabel,
  required = false,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-detect city from address input
  useEffect(() => {
    if (addressValue.length < 3) return

    // Check if any Danish city name is mentioned in the address
    const addressLower = addressValue.toLowerCase()
    for (const city of danishCities) {
      if (addressLower.includes(city.toLowerCase())) {
        onCityChange(city)
        return
      }
    }
  }, [addressValue, onCityChange])

  function handleAddressChange(inputValue: string) {
    onAddressChange(inputValue)
    
    if (inputValue.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Generate address suggestions based on Danish cities
    const filtered = danishCities
      .filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
      .map(city => `${city}`)
      .slice(0, 5)
    
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  function selectSuggestion(suggestion: string) {
    onAddressChange(suggestion)
    onCityChange(suggestion)
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Address Input with Autocomplete */}
      <div ref={wrapperRef} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {addressLabel} {required && '*'}
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={addressValue}
            onChange={(e) => handleAddressChange(e.target.value)}
            onFocus={() => addressValue.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder={addressPlaceholder}
            required={required}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="w-full text-left px-4 py-2.5 hover:bg-brand-50 text-sm text-gray-700 hover:text-brand-700 flex items-center gap-2 border-b border-gray-50 last:border-0"
              >
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* City Display (Auto-detected) */}
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
