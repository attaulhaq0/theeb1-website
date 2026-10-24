import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, TrendingUp, Users2 } from 'lucide-react';

export default function EB2NIW() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">EB2-NIW (Green Card)</h1>
            <p className="text-xl mb-8">
              No Job Offer or Employer Sponsorship Required — Apply Based on Your Impact and Merit
            </p>
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Evaluate Your Profile</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is EB2-NIW */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">What is the EB2-NIW Visa?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The EB-2 National Interest Waiver (NIW) is a second-preference employment-based immigrant visa category that allows qualified professionals to self-petition for a Green Card. The "National Interest Waiver" component waives the requirement for a job offer and labor certification.
            </p>
            <p className="text-lg text-muted-foreground">
              This visa is ideal for professionals whose work benefits the United States to such an extent that it's in the national interest to waive the standard job offer requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Three-Prong Test */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">The Matter of Dhanasar Test</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            To qualify for EB2-NIW, you must satisfy all three prongs of the Matter of Dhanasar framework:
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Substantial Merit & National Importance</h3>
                <p className="text-muted-foreground">
                  Your proposed endeavor has substantial merit and national importance to the United States
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Well Positioned to Advance</h3>
                <p className="text-muted-foreground">
                  You are well positioned to advance the proposed endeavor based on your qualifications and track record
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Benefit to Waive Requirements</h3>
                <p className="text-muted-foreground">
                  It would be beneficial to the United States to waive the job offer and labor certification requirements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Basic Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Basic EB2 Requirements</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Before applying for the National Interest Waiver, you must first meet the basic EB-2 requirements by demonstrating one of the following:
            </p>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Advanced Degree</h3>
                  <p className="text-muted-foreground">
                    A U.S. master's degree or higher (or foreign equivalent), OR a U.S. bachelor's degree (or foreign equivalent) plus five years of progressive post-degree experience in your field
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Exceptional Ability</h3>
                  <p className="text-muted-foreground mb-4">
                    A degree of expertise significantly above that ordinarily encountered. You must meet at least three of the following:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Academic records showing degrees, diplomas, or certificates',
                      'Letters documenting at least 10 years of full-time experience',
                      'License to practice your profession',
                      'Evidence of salary commanding high compensation',
                      'Membership in professional associations',
                      'Recognition for achievements and contributions by peers, government, or professional organizations'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <h2 className="text-4xl font-bold mb-8">Benefits of EB2-NIW</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Self-petition - no employer sponsorship required',
                'No labor certification process',
                'Flexibility to change jobs or employers',
                'Include spouse and unmarried children under 21',
                'Permanent residency for entire family',
                'Path to U.S. citizenship after 5 years',
                'Live and work anywhere in the United States',
                'Freedom to pursue entrepreneurial endeavors'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Ideal Candidates for EB2-NIW</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Researchers & Scientists</h3>
                  <p className="text-muted-foreground">
                    Working on projects with significant impact on health, environment, or technology
                  </p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Tech Entrepreneurs</h3>
                  <p className="text-muted-foreground">
                    Building innovative solutions that benefit the U.S. economy or society
                  </p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Senior Engineers</h3>
                  <p className="text-muted-foreground">
                    Developing critical technologies in AI, cybersecurity, or other strategic fields
                  </p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Healthcare Professionals</h3>
                  <p className="text-muted-foreground">
                    Addressing healthcare challenges in underserved areas or advancing medical research
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* EB1A vs EB2-NIW */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">EB1A vs EB2-NIW: Which is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">EB1A</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>First preference (faster processing)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Higher burden of proof</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Must demonstrate extraordinary ability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Meet 3 of 10 USCIS criteria</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">EB2-NIW</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Second preference</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>More flexible requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Focus on national interest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Meet Dhanasar three-prong test</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Is EB2-NIW Right for You?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a consultation to evaluate your eligibility and develop a winning EB2-NIW strategy.
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
