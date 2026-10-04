import calendrier from '@/data/calendrier.json'
import { SITE_URL } from '@/lib/site'

const compact = (isoDate) => isoDate.replaceAll('-', '')

// Les événements « toute la journée » ont une date de fin exclusive en iCalendar.
function nextDay(isoDate) {
  const d = new Date(`${isoDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

const escapeText = (text) => text.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')

export function GET() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
  const events = calendrier.evenements.map((e) =>
    [
      'BEGIN:VEVENT',
      `UID:${e.id}@toac-cyclo`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(e.start)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(e.end))}`,
      `SUMMARY:${escapeText(e.title)}`,
      `DESCRIPTION:${escapeText(`${e.detail}. Plus d'infos : ${SITE_URL}${e.link}`)}`,
      `LOCATION:${escapeText(e.location)}`,
      `URL:${SITE_URL}${e.link}`,
      'END:VEVENT',
    ].join('\r\n')
  )

  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TOAC Cyclo//Calendrier//FR',
    'CALSCALE:GREGORIAN',
    'X-WR-CALNAME:TOAC Cyclo',
    ...events,
    'END:VCALENDAR',
    '',
  ].join('\r\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="calendrier-toac-cyclo.ics"',
    },
  })
}
