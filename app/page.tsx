import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ApiDemoSection } from "@/components/api-demo-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <ApiDemoSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}