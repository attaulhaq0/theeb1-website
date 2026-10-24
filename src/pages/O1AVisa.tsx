import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Globe, Briefcase } from 'lucide-react';

export default function O1AVisa() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">O1A Work Visa</h1>
            <p className="text-xl mb-8">
              For High-Achieving Professionals in Business, Science, Technology, and Beyond
            </p>
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Evaluate Your Profile</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is O1A */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">What is the O1A Visa?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The O-1A visa is a nonimmigrant visa for individuals who possess extraordinary ability in sciences, education, business, or athletics. This visa allows you to work in the United States temporarily to continue work in your area of extraordinary ability.
            </p>
            <p className="text-lg text-muted-foreground">
              Unlike the EB1A, the O-1A requires an employer or agent to petition on your behalf, but it offers a faster pathway to begin working in the United States.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features of O1A Visa</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Flexible Duration</h3>
                <p className="text-muted-foreground">Initial period up to 3 years, with unlimited 1-year extensions</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Travel Freedom</h3>
                <p className="text-muted-foreground">Maintain ties to your home country while working in the US</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Work Authorization</h3>
                <p className="text-muted-foreground">Legal employment for specific employer or project</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">100% Success Rate</h3>
                <p className="text-muted-foreground">Our proven track record with O-1A applications</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Eligibility Criteria</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">
              To qualify for an O-1A visa, you must demonstrate extraordinary ability by sustained national or international acclaim and meet at least three of the following criteria:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Receipt of nationally or internationally recognized prizes or awards',
                'Membership in associations requiring outstanding achievements',
                'Published material about you in professional or major media',
                'Participation as a judge of the work of others',
                'Original contributions of major significance in your field',
                'Authorship of scholarly articles in professional publications',
                'Employment in a critical or essential capacity for distinguished organizations',
                'High salary or other remuneration for services'
              ].map((criterion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p>{criterion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with EB1A */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">O1A vs EB1A: Which is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">O1A Visa</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Temporary work visa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Requires employer sponsorship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Faster processing (15 days with premium)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Can transition to EB1A later</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">EB1A Visa</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Permanent residency (Green Card)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Self-petition (no employer needed)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Longer processing time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Path to citizenship after 5 years</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our O1A Process</h2>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Initial Consultation',
                  description: 'We evaluate your profile and determine your eligibility for the O-1A visa.'
                },
                {
                  step: '2',
                  title: 'Documentation Strategy',
                  description: 'We develop a comprehensive strategy to meet the USCIS criteria with strong evidence.'
                },
                {
                  step: '3',
                  title: 'Petition Preparation',
                  description: 'Our team prepares a meticulously documented petition highlighting your extraordinary ability.'
                },
                {
                  step: '4',
                  title: 'Submission & Follow-up',
                  description: 'We submit your petition and handle all communications with USCIS until approval.'
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

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready for Your O1A Visa?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let our experts guide you through the O-1A visa process with our proven 100% success rate.
            </p>
            <Button asChild size="lg" className="primary-gradient text-white">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
