import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Users, Trophy } from 'lucide-react';

export default function EB1AVisa() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">EB1A Visa (Green Card)</h1>
            <p className="text-xl mb-8">
              The premier path to permanent residency for individuals with extraordinary ability in sciences, arts, education, business, or athletics.
            </p>
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Start Your Application</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is EB1A */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">What is the EB1A Visa?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The EB-1A visa is a first-preference employment-based immigration category for individuals who have extraordinary ability in their field. This self-petition option allows you to obtain a Green Card without employer sponsorship or a job offer.
            </p>
            <p className="text-lg text-muted-foreground">
              To qualify, you must demonstrate sustained national or international acclaim and provide evidence that you meet at least three of the ten USCIS criteria.
            </p>
          </div>
        </div>
      </section>

      {/* USCIS Criteria */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">USCIS EB1A Criteria</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              'Receipt of major internationally-recognized awards or prizes',
              'Membership in associations requiring outstanding achievements',
              'Published material about you in professional publications',
              'Participation as a judge of the work of others in your field',
              'Original scientific, scholarly, or business-related contributions',
              'Authorship of scholarly articles in professional publications',
              'Display of your work at artistic exhibitions or showcases',
              'Performance in a leading or critical role for organizations',
              'High salary or remuneration compared to others in the field',
              'Commercial successes in the performing arts'
            ].map((criterion, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p>{criterion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Comprehensive Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Profile Analysis</h3>
                  <p className="text-muted-foreground">
                    In-depth evaluation of your achievements and qualifications
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Strategy Development</h3>
                  <p className="text-muted-foreground">
                    Custom strategies to meet 6-7 USCIS criteria
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">End-to-End Support</h3>
                  <p className="text-muted-foreground">
                    Complete guidance from initial consultation to approval
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Benefits of EB1A Visa</h2>
            <div className="space-y-4">
              {[
                'No employer sponsorship required - self-petition',
                'No labor certification needed',
                'Priority processing available',
                'Faster path to permanent residency',
                'Include spouse and unmarried children under 21',
                'Live and work anywhere in the United States',
                'Path to U.S. citizenship after 5 years'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your EB1A Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a consultation with our experts to evaluate your profile and develop a winning strategy.
            </p>
            <Button asChild size="lg" className="primary-gradient text-white">
              <Link to="/contact">Book Your Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
