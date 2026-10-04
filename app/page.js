import HeroSection from '@/components/HeroSection'
import FeaturedEventSection from '@/components/FeaturedEventSection'
import ClubSection from '@/components/ClubSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedEventSection />
      <NewsSection />
      <ActivitiesSection />
      <ClubSection />
    </>
  )
}
