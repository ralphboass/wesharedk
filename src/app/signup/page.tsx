'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/firebase-helpers'
import { Car, Mail, Lock, User, Phone, Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [notUniversityStudent, setNotUniversityStudent] = useState(false)

  const isUniversityEmail = email.toLowerCase().includes('ku.dk') ||
    email.toLowerCase().includes('dtu.dk') ||
    email.toLowerCase().includes('au.dk') ||
    email.toLowerCase().includes('sdu.dk') ||
    email.toLowerCase().includes('aau.dk') ||
    email.toLowerCase().includes('ruc.dk') ||
    email.toLowerCase().includes('cbs.dk') ||
    email.toLowerCase().includes('itu.dk')

  const universityName = email.toLowerCase().includes('ku.dk') ? 'KU' :
    email.toLowerCase().includes('dtu.dk') ? 'DTU' :
    email.toLowerCase().includes('au.dk') ? 'AU' :
    email.toLowerCase().includes('sdu.dk') ? 'SDU' :
    email.toLowerCase().includes('aau.dk') ? 'AAU' :
    email.toLowerCase().includes('ruc.dk') ? 'RUC' :
    email.toLowerCase().includes('cbs.dk') ? 'CBS' :
    email.toLowerCase().includes('itu.dk') ? 'ITU' : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (!notUniversityStudent && !isUniversityEmail) {
      setError('Brug venligst en universitets-e-mail (KU, DTU, AU, SDU, AAU, RUC, CBS eller ITU) eller markér "Ikke universitetsstuderende"')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Adgangskoden skal være mindst 6 tegn')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Adgangskoderne matcher ikke')
      setLoading(false)
      return
    }

    if (!agreedToTerms) {
      setError('Du skal acceptere servicevilkår og privatlivspolitik')
      setLoading(false)
      return
    }

    try {
      const uclaVerified = isUniversityEmail && !notUniversityStudent
      await signUp(email, password, firstName, lastName, phone)
      setSuccess(true)
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('E-mail er allerede i brug')
      } else if (err.code === 'auth/weak-password') {
        setError('Adgangskoden skal være mindst 8 tegn og indeholde både bogstaver og tal')
      } else if (err.code === 'auth/invalid-email') {
        setError('Ugyldig e-mailadresse')
      } else {
        setError('Der opstod en fejl. Prøv igen.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
            <Car className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Opret profil</h1>
          <p className="text-sm text-gray-500 mt-1">Bliv en del af WeShare fællesskabet</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Fornavn</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Fornavn" required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Efternavn</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Efternavn" required className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="din@email.dk" required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefonnummer</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+45 12345678" required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
            </div>

            {email && universityName && (
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                <span className="text-lg">✓</span>
                <span>{universityName} e-mail registreret</span>
              </div>
            )}

            {email && !isUniversityEmail && !notUniversityStudent && (
              <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
                <span className="text-lg">⚠</span>
                <span>Brug venligst en universitets-e-mail eller markér boksen nedenfor</span>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notUniversityStudent}
                onChange={(e) => setNotUniversityStudent(e.target.checked)}
                className="mt-1 w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
              />
              <div className="text-sm">
                <div className="font-medium text-gray-700">Ikke universitetsstuderende?</div>
                <div className="text-gray-500">Markér dette hvis du ikke har en universitets-e-mail</div>
              </div>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adgangskode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mindst 6 tegn" required minLength={6} className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bekræft adgangskode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Gentag adgangskode" required className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm" />
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-1.5 ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                  {password === confirmPassword ? '✓ Adgangskoderne matcher' : '✗ Adgangskoderne matcher ikke'}
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
              />
              <div className="text-sm text-gray-600">
                Jeg accepterer <span className="text-brand-600 font-medium">Servicevilkår</span> og <span className="text-brand-600 font-medium">Privatlivspolitik</span>
              </div>
            </label>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            {success && (
              <div className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2.5 space-y-1">
                <p className="font-semibold">✓ Konto oprettet!</p>
                <p>Vi har sendt en bekræftelsesmail til {email}. Tjek din indbakke og bekræft din e-mail.</p>
              </div>
            )}

            {!success ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Opretter konto...</> : 'Opret profil'}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Gå til login
              </Link>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Har du allerede en konto?{' '}
              <Link href="/login" className="text-brand-600 font-medium hover:underline">
                Log ind
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
