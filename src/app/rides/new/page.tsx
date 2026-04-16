'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function NewRidePage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/rides/new/step1')
  }, [router])

  return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
    </div>
  )
}
