import HeroSection from '@/components/HeroSection'
import RidesSection from '@/components/RidesSection'
import NextWeekendRides from '@/components/NextWeekendRides'
import AgendaSection from '@/components/AgendaSection'
import JoinBanner from '@/components/JoinBanner'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'TOAC Cyclo : club de vélo route et gravel à Toulouse',
  description: 'Club de cyclotourisme du TOAC à Toulouse : sorties route le vendredi, gravel le jeudi, randonnées interclubs le dimanche. Sans compétition, ouvert à tous.',
  path: '/',
  absoluteTitle: true,
})

export default function Home() {
  return (
    <>
      <HeroSection />
      <RidesSection />
      <NextWeekendRides />
      <AgendaSection />
      <JoinBanner />
    </>
  )
}
