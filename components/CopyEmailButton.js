'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export default function CopyEmailButton({ email = 'toac.cyclo@gmail.com' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      trackEvent('copie_email', { email })
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback silencieux
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-medium text-gray-200 hover:text-white transition-colors cursor-pointer"
      title="Copier l'adresse email"
    >
      <span className="font-mono">{email}</span>
      {copied ? (
        <span className="inline-flex items-center gap-1 text-emerald-300 font-bold">
          <Check className="w-3.5 h-3.5" aria-hidden="true" /> Copié
        </span>
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
      )}
    </button>
  )
}
