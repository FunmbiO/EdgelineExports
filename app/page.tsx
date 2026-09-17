import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaBanner from "@/components/home/CtaBanner";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function Home() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaBanner />
    </>
  );
}
