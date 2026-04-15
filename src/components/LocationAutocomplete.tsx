'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string, city: string) => void
  placeholder: string
  label: string
  required?: boolean
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  label,
  required = false,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Danish cities for autocomplete
  const danishCities = [
    'København', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding',
    'Horsens', 'Vejle', 'Roskilde', 'Herning', 'Helsingør', 'Silkeborg', 'Næstved',
    'Fredericia', 'Viborg', 'Køge', 'Holstebro', 'Taastrup', 'Slagelse', 'Hillerød',
    'Holbæk', 'Sønderborg', 'Svendborg', 'Hjørring', 'Frederikshavn', 'Nørresundby',
    'Ringsted', 'Ølstykke', 'Skive', 'Korsør', 'Frederikssund', 'Nykøbing F',
    'Varde', 'Nyborg', 'Kalundborg', 'Grenaa', 'Birkerød', 'Hørsholm', 'Rønne',
    'Thisted', 'Albertslund', 'Glostrup', 'Haderslev', 'Lillerød', 'Ishøj',
    'Tårnby', 'Ballerup', 'Vallensbæk', 'Brøndby', 'Hvidovre', 'Gladsaxe',
    'Gentofte', 'Lyngby-Taarbæk', 'Rudersdal', 'Furesø', 'Høje-Taastrup',
    'Albertslund', 'Herlev', 'Rødovre', 'Ishøj', 'Vallensbæk', 'Dragør',
    'Tårnby', 'Brøndby', 'Hvidovre', 'Gladsaxe', 'Gentofte', 'Lyngby',
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleInputChange(inputValue: string) {
    onChange(inputValue, '')
    
    if (inputValue.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Filter Danish cities
    const filtered = danishCities
      .filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 5)
    
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  function selectSuggestion(suggestion: string) {
    onChange(suggestion, suggestion)
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label} {required && '*'}</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
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
  )
}
