'use client'

import { useEffect, useState } from 'react'

// Affiche son contenu jusqu'au jour `date` inclus (AAAA-MM-JJ), puis `fallback`.
// Le site est statique : la vérification se fait dans le navigateur, sans nouveau build.
export default function UntilDate({ date, fallback = null, children }) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    setPast(today > date)
  }, [date])

  return past ? fallback : children
}
