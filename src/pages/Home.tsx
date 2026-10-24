import { ParticleBackground } from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CompanyLogos } from '@/components/CompanyLogos';
import { HeroSlider } from '@/components/HeroSlider';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { DisclaimerModal } from '@/components/DisclaimerModal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { GlobalRecognition } from '@/components/GlobalRecognition';
import { PricingSection } from '@/components/PricingSection';
import teamMeetingImg from '@/assets/team-meeting.jpg';

export default function Home() {
  return (
    <div className="min-h-screen">
      <DisclaimerModal />
      
      {/* Hero Section with Particle Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-32">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <HeroSlider />
          </div>
        </div>
      </section>

      {/* Trusted Companies with Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center">
            Trusted by <span className="text-primary">Top Tech</span> Professionals
          </h2>
        </div>
        <CompanyLogos />
      </section>


      {/* Who Are We */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Who are we?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At theEb1, we empower tech professionals on their EB1A Green Card journey with personalized strategies and end-to-end support, ensuring a seamless process. Our comprehensive approach helps applicants meet 6-7 out of the 10 USCIS criteria — far exceeding the minimum requirement of three. This meticulous strategy strengthens cases, often leading to faster approvals and a smoother path to permanent residency.
            </p>
            <div className="mt-12 bg-muted/40 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Guiding you in every step to EB1A success!</h3>
              <p className="text-muted-foreground mb-6">Expert advice, tailored for you—with transparency and support throughout your journey.</p>
              <Button asChild size="lg" className="primary-gradient text-white">
                <Link to="/contact">Book Your Slot Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Recognition */}
      <GlobalRecognition />

      {/* Testimonials Carousel */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Client Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from professionals who successfully achieved their immigration goals
            </p>
          </div>
          <TestimonialCarousel />
          <div className="text-center mt-8">
            <Button asChild className="primary-gradient text-white hover:opacity-90" size="lg">
              <Link to="/testimonials">View All Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-emerald-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-primary mb-2">
                <AnimatedCounter end={200} suffix="+" />
              </div>
              <p className="text-xl font-semibold text-gray-800">EB1A Approvals</p>
            </div>
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-primary mb-2">
                <AnimatedCounter end={85} suffix="%" />
              </div>
              <p className="text-xl font-semibold text-gray-800">EB1A Approval Rate*</p>
            </div>
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-primary mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-xl font-semibold text-gray-800">O-1A Approval Rate*</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-8">
            * Disclaimer: Our past success rate is based on historical data and reflects the outcomes of prior cases. However, past performance does not guarantee future results. Each case is unique and evaluated on its individual merits by immigration authorities.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="text-gray-900">Why Choose </span>
                  <span className="text-[#14b8a6]">theEb1?</span>
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  The EB1A visa is designed for individuals with extraordinary ability in their field. It offers a direct path to a U.S. Green Card without requiring employer sponsorship or a job offer.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <CheckCircle2 className="text-[#14b8a6] mt-1 mr-3 flex-shrink-0 smooth-transition group-hover:scale-110" />
                    <span className="text-gray-700 font-medium">No employer sponsorship required</span>
                  </li>
                  <li className="flex items-start group">
                    <CheckCircle2 className="text-[#14b8a6] mt-1 mr-3 flex-shrink-0 smooth-transition group-hover:scale-110" />
                    <span className="text-gray-700 font-medium">Fast-track to permanent residency</span>
                  </li>
                  <li className="flex items-start group">
                    <CheckCircle2 className="text-[#14b8a6] mt-1 mr-3 flex-shrink-0 smooth-transition group-hover:scale-110" />
                    <span className="text-gray-700 font-medium">Freedom to work anywhere in the U.S.</span>
                  </li>
                  <li className="flex items-start group">
                    <CheckCircle2 className="text-[#14b8a6] mt-1 mr-3 flex-shrink-0 smooth-transition group-hover:scale-110" />
                    <span className="text-gray-700 font-medium">Path to citizenship for you and your family</span>
                  </li>
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#14b8a6] rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img 
                  src={teamMeetingImg} 
                  alt="Professional team meeting" 
                  className="rounded-lg shadow-2xl relative z-10 smooth-transition group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans & Pricing */}
      <PricingSection />
    </div>
  );
}
