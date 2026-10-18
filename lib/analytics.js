// Suivi d'événements léger et sans cookie (compatible Umami / Plausible / Matomo sur OVH).
export function trackEvent(eventName, eventData = {}) {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.umami?.track === 'function') {
      window.umami.track(eventName, eventData)
    }
  } catch {
    // Ignorer silencieusement si un bloqueur de contenu est actif
  }
}
