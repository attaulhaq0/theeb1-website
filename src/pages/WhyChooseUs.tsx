import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Clock, Target, Award, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Industry-Leading EB1A Success Framework',
    description: 'Our proven methodology has helped 200+ tech professionals achieve their EB1A Green Cards with an 80-85% approval rate.'
  },
  {
    icon: Users,
    title: 'Tailor-Made Strategies for Your Green Card Journey',
    description: 'Every profile is unique. We create customized strategies that highlight your specific achievements and strengths.'
  },
  {
    icon: CheckCircle,
    title: 'Expert-Led, Detail-Oriented Process Management',
    description: 'Our team of immigration experts manages every detail of your petition with meticulous attention to USCIS requirements.'
  },
  {
    icon: Zap,
    title: 'Specialized EB1A Support for High-Tech Professionals',
    description: 'We understand tech industry achievements—from open-source contributions to technical leadership and innovation.'
  },
  {
    icon: Clock,
    title: 'Fast and Efficient Processing',
    description: 'We streamline the petition process and leverage premium processing options to minimize wait times.'
  },
  {
    icon: Award,
    title: 'Comprehensive USCIS Criteria Coverage',
    description: 'We help you meet 6-7 of the 10 USCIS criteria, far exceeding the minimum requirement for a stronger case.'
  }
];

const differentiators = [
  'Deep understanding of tech industry achievements and how they translate to USCIS criteria',
  'AI-powered analysis through Turing AI for optimized petition strategies',
  '100% O-1A approval rate demonstrating our expertise in extraordinary ability cases',
  'Transparent communication and regular updates throughout the process',
  'End-to-end support from initial consultation to Green Card approval',
  'Experience with diverse tech roles: engineers, data scientists, product managers, founders',
  'Strategic guidance on building your profile before and during the application process',
  'Expert RFE (Request for Evidence) response handling'
];

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen pt-20">
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Why Choose EB1A Experts?</h1>
            <p className="text-xl">
              The trusted choice for tech professionals seeking EB1A Green Cards
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((diff, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{diff}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Proven Process</h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Initial Profile Evaluation',
                  description: 'We assess your achievements against USCIS criteria and determine your EB1A eligibility.'
                },
                {
                  step: '2',
                  title: 'Strategic Planning',
                  description: 'Develop a customized strategy to showcase your extraordinary ability across multiple criteria.'
                },
                {
                  step: '3',
                  title: 'Evidence Collection & Documentation',
                  description: 'Guide you through gathering and organizing compelling evidence for each criterion.'
                },
                {
                  step: '4',
                  title: 'Petition Preparation',
                  description: 'Craft a meticulously detailed petition that presents your case in the strongest light.'
                },
                {
                  step: '5',
                  title: 'Submission & Follow-up',
                  description: 'File your petition and manage all USCIS communications until approval.'
                },
                {
                  step: '6',
                  title: 'Post-Approval Support',
                  description: 'Assist with adjustment of status or consular processing to complete your Green Card journey.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experience the EB1A Experts Difference</h2>
            <p className="text-lg mb-8">
              Join hundreds of successful tech professionals who chose us for their EB1A journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/testimonials">Read Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
