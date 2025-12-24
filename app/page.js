import NavigationBar from '@/components/NavigationBar'
import HeroSection from '@/components/HeroSection'
import FeaturedEventSection from '@/components/FeaturedEventSection'
import ClubSection from '@/components/ClubSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main>
        <HeroSection />
        <FeaturedEventSection />
        <ActivitiesSection />
        <ClubSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  )
}
