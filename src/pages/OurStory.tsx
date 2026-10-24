import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="min-h-screen pt-20">
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl">
              Empowering tech professionals to achieve their American Dream
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">How It All Began</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                EB1A Experts was founded with a singular mission: to make the EB1A Green Card process accessible, transparent, and successful for tech professionals worldwide. Our founder, having personally navigated the complex U.S. immigration system, understood the challenges, uncertainties, and anxieties that come with pursuing permanent residency.
              </p>
              <p>
                What started as helping fellow tech professionals evolved into a comprehensive immigration consultancy specializing in EB1A, O1A, and EB2-NIW visas. We recognized that tech professionals often have extraordinary achievements that don't fit traditional academic molds—open-source contributions, technical leadership, innovative solutions, and industry impact.
              </p>
              <p>
                Our team combines deep immigration expertise with an insider's understanding of the tech industry. We know how to translate GitHub contributions, technical blog posts, conference presentations, and product launches into compelling evidence that meets USCIS criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Client-Centric</h3>
                <p className="text-muted-foreground">
                  Your success is our success. We provide personalized attention and support throughout your journey.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
                <p className="text-muted-foreground">
                  With an 80-85% EB1A approval rate, we focus on strategies that deliver real results.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in petition preparation and client communication.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Leveraging AI technology like Turing AI to optimize and accelerate the petition process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Journey in Numbers</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">200+</div>
                <p className="text-lg">EB1A Approvals</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">5+</div>
                <p className="text-lg">Years of Experience</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">100%</div>
                <p className="text-lg">O-1A Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8">
              Let us help you achieve your American Dream with expert EB1A guidance.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
