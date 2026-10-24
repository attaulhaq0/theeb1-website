import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

const leaders = [
  {
    name: 'Raghu Raghavan',
    title: 'Founder & CEO',
    bio: 'Former tech professional turned immigration expert with personal EB1A experience. Raghu founded EB1A Experts to help fellow tech professionals navigate the complex Green Card process. With deep understanding of both technology and immigration law, he has helped 200+ professionals achieve their American Dream.',
    expertise: ['EB1A Strategy', 'Tech Industry Immigration', 'USCIS Criteria Analysis']
  },
  {
    name: 'Sarah Chen',
    title: 'Director of Operations',
    bio: 'Immigration specialist with 10+ years of experience in employment-based immigration. Sarah oversees all petition preparations and ensures meticulous attention to USCIS requirements. Her expertise in evidence compilation has contributed to our industry-leading success rates.',
    expertise: ['Petition Preparation', 'Evidence Documentation', 'RFE Responses']
  },
  {
    name: 'Michael Rodriguez',
    title: 'Senior Immigration Consultant',
    bio: 'Former USCIS adjudicator with insider knowledge of the petition review process. Michael brings unique insights into what makes a compelling EB1A case and how to present achievements most effectively.',
    expertise: ['USCIS Procedures', 'Case Strategy', 'Adjudication Insights']
  },
  {
    name: 'Dr. Priya Patel',
    title: 'Technical Achievements Specialist',
    bio: 'PhD in Computer Science with extensive research and industry experience. Dr. Patel specializes in translating technical achievements into compelling evidence for USCIS, particularly for professionals in AI, machine learning, and software engineering.',
    expertise: ['Technical Evidence', 'Research Documentation', 'Academic Achievements']
  }
];

export default function Leadership() {
  return (
    <div className="min-h-screen pt-20">
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Leadership Team</h1>
            <p className="text-xl">
              Meet the experts dedicated to your EB1A success
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our leadership team combines deep immigration expertise with insider knowledge of the tech industry. Each member brings unique skills and experience to ensure your EB1A petition receives the expert attention it deserves.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {leaders.map((leader, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1">{leader.name}</h3>
                      <p className="text-primary font-semibold">{leader.title}</p>
                    </div>
                    <p className="text-muted-foreground mb-6">{leader.bio}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.expertise.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
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
            <h2 className="text-4xl font-bold mb-8 text-center">Our Extended Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="font-semibold">Immigration Consultants</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <p className="font-semibold">Technical Experts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">3+</div>
                  <p className="font-semibold">Legal Advisors</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-muted-foreground mt-8">
              Our extended team of specialists ensures comprehensive support for every aspect of your EB1A petition, from technical documentation to legal compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Work With Our Expert Team</h2>
            <p className="text-lg mb-8">
              Schedule a consultation to discuss your EB1A goals with our leadership team.
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
