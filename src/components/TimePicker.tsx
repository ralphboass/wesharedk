'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  label?: string
  required?: boolean
}

export default function TimePicker({ value, onChange, label, required = false }: TimePickerProps) {
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':')
      setHour(h)
      setMinute(m)
    }
  }, [value])

  useEffect(() => {
    onChange(`${hour}:${minute}`)
  }, [hour, minute, onChange])

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  const minutes = ['00', '15', '30', '45']

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && '*'}
        </label>
      )}
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
        <div className="flex gap-2 pl-10">
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm appearance-none bg-white"
            required={required}
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <span className="flex items-center text-gray-400 font-medium">:</span>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm appearance-none bg-white"
            required={required}
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1.5">Vælg time og minut (24-timers format)</p>
    </div>
  )
}
