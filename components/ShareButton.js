'use client'
import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export default function ShareButton({ title, className = '' }) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // partage annulé ou non disponible : rien à faire
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold rounded-sm transition-colors text-sm ${className}`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Lien copié' : 'Partager'}
    </button>
  )
}
