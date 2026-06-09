import AppCTASection from "./components/AppCTASection";
import BlogSection from "./components/BlogSection";
import HeroSection from "./components/Homesection";
import HowItWorksSection from "./components/HowItWorksSection";
import NewsletterSection from "./components/NewsletterSection";
import ServicesSection from "./components/ServicesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TopDoctorsSection from "./components/TopDoctorsSection";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TopDoctorsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BlogSection />
      <AppCTASection />
      <NewsletterSection />
    </main>
  );
}