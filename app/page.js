import NavigationBar from '@/components/NavigationBar'
import HeroSection from '@/components/HeroSection'
import FeaturedEventSection from '@/components/FeaturedEventSection'
import ClubSection from '@/components/ClubSection'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main>
        <HeroSection />
        <FeaturedEventSection />
        <ClubSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  )
}
