'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyEmailCode, resendVerificationEmail, signOut } from '@/lib/firebase-helpers'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resent, setResent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  function handleDigitChange(index: number, value: string) {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newCode.every((d) => d !== '')) {
      handleVerify(newCode.join(''))
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      const newCode = pasted.split('')
      setCode(newCode)
      inputRefs.current[5]?.focus()
      handleVerify(pasted)
    }
  }

  async function handleVerify(codeStr?: string) {
    const fullCode = codeStr || code.join('')
    if (fullCode.length !== 6) {
      setError('Indtast venligst alle 6 cifre')
      return
    }

    setLoading(true)
    setError('')

    try {
      const isValid = await verifyEmailCode(email, fullCode)
      if (isValid) {
        setSuccess(true)
        setTimeout(() => router.push('/rides'), 2000)
      } else {
        setError('Ugyldig eller udloebet kode. Proev venligst igen.')
        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError('Der opstod en fejl. Proev igen.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    try {
      await resendVerificationEmail(email)
      setResent(true)
      setTimeout(() => setResent(false), 5000)
    } catch (err) {
      setError('Kunne ikke sende koden igen.')
    }
  }

  async function handleBack() {
    try {
      await signOut()
    } catch {}
    router.push('/signup')
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">&#10003;</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">E-mail bekraeftet!</h1>
          <p className="text-gray-500">Din e-mail er blevet bekraeftet. Du viderestilles nu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bekraeft din e-mail</h1>
          <p className="text-sm text-gray-500 mt-2">Vi har sendt en bekraeftelseskode til</p>
          <p className="text-sm font-semibold text-blue-600 mt-1">{email}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Bekraeftelseskode</label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
          )}

          {resent && (
            <p className="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2 mb-4">
              Ny kode sendt! Tjek din indbakke.
            </p>
          )}

          <button
            onClick={() => handleVerify()}
            disabled={loading || code.some((d) => d === '')}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Bekraefter...</> : 'Bekraeft e-mail'}
          </button>

          <button
            onClick={handleResend}
            className="w-full text-sm text-brand-600 font-medium hover:underline mb-4"
          >
            Modtog du ikke koden? Send igen
          </button>

          <button
            onClick={handleBack}
            className="w-full flex items-center justify-center gap-1.5 text-sm text-red-500 hover:text-red-600"
          >
            <ArrowLeft className="w-4 h-4" /> Tilbage til tilmelding
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
