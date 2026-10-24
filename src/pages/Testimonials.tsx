import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "The efficiency and expertise of Raghu's team are truly remarkable. From day one, they demonstrated why they're leaders in EB1A. Their phenomenal customer service and quick turnaround time exceeded all my expectations. They transformed what could have been a stressful process into a smooth journey.",
    author: "Product Manager",
    company: "Meta",
    rating: 5
  },
  {
    quote: "Choosing EB1A Experts was the best decision I made for my immigration journey. Their team's identification and showcasing of my professional achievements to meet the 'original contribution' criteria, especially without relying on patents, is remarkable. The speed and efficiency with which they handled my case was remarkable.",
    author: "Software Developer",
    company: "Sonos Inc",
    rating: 5
  },
  {
    quote: "The commitment to excellence shown by EB1A Experts is amazing. From our first consultation to the final approval, their team demonstrated unparalleled professionalism and expertise. They have mastered the art of presenting professional achievements in the most impactful way. The swift timeline and seamless process exceeded expectations.",
    author: "Senior Software Engineer",
    company: "Cisco",
    rating: 5
  },
  {
    quote: "I was initially hesitant about pursuing an EB1A petition without patents or citations, but Raghu and his team showed me that strong professional experience can be equally compelling. Their expertise in presenting my career achievements was exceptional. Securing approval in just 6 months exceeded my wildest expectations!",
    author: "Sr. Data Engineer",
    company: "Cognizant",
    rating: 5
  },
  {
    quote: "From the very beginning, Raghu's team proved why they are industry leaders in EB1. Their expertise went beyond just content - they transformed what could have been an overwhelming experience into a well-structured journey. Their rapid response times and exceptional attention to client needs consistently exceeded my expectations.",
    author: "Cloud Software Engineer",
    company: "Ericsson Inc",
    rating: 5
  },
  {
    quote: "Working with EB1A Experts was a game-changer for my immigration process. Their deep understanding of the tech industry and how to present technical achievements in a way that resonates with USCIS made all the difference. The team was responsive, professional, and genuinely cared about my success.",
    author: "Principal Engineer",
    company: "Amazon",
    rating: 5
  },
  {
    quote: "The personalized attention and strategic approach from EB1A Experts set them apart. They didn't just fill out forms—they crafted a compelling narrative that highlighted my unique contributions to my field. The approval came faster than I anticipated, and I'm now on my path to permanent residency!",
    author: "Tech Lead",
    company: "Google",
    rating: 5
  },
  {
    quote: "I cannot recommend EB1A Experts enough. Their knowledge of USCIS criteria and ability to position my achievements perfectly was outstanding. The Turing AI tool provided valuable insights, and the human expertise behind it made sure everything was optimized. Worth every penny!",
    author: "Senior Data Scientist",
    company: "Microsoft",
    rating: 5
  },
  {
    quote: "What impressed me most was the transparency and communication throughout the entire process. EB1A Experts kept me informed at every stage and provided clear guidance on what was needed. Their success rate speaks for itself, and I'm thrilled to be part of it!",
    author: "Software Architect",
    company: "Oracle",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-xl">
              Hear from tech professionals who successfully obtained their EB1A Green Cards with our expert guidance
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-sm text-muted-foreground">EB1A Approvals</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">80-85%</div>
              <p className="text-sm text-muted-foreground">EB1A Approval Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">O-1A Approval Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5⭐</div>
              <p className="text-sm text-muted-foreground">Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Quote className="w-8 h-8 text-primary/20" />
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Success Stories</h2>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">From L-1 to EB1A: A Software Engineer's Journey</h3>
                  <p className="text-muted-foreground mb-4">
                    John, a Senior Software Engineer at a major tech company, was on an L-1 visa when he decided to pursue the EB1A Green Card. Despite having no patents or academic citations, our team identified his significant contributions to open-source projects, leadership in critical infrastructure development, and recognition from industry peers.
                  </p>
                  <p className="text-muted-foreground">
                    Result: Approved in 6 months with evidence spanning 7 of the 10 USCIS criteria.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Data Scientist to Green Card Holder</h3>
                  <p className="text-muted-foreground mb-4">
                    Maria, a Data Scientist specializing in machine learning, approached us on an H-1B visa. We highlighted her published research, conference presentations, peer review activities, and her high compensation relative to industry standards.
                  </p>
                  <p className="text-muted-foreground">
                    Result: EB1A approval in 5 months, showcasing 6 criteria with comprehensive evidence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Startup Founder's Fast-Track to Permanent Residency</h3>
                  <p className="text-muted-foreground mb-4">
                    Ahmed, founder of a successful AI startup, needed permanent residency to scale his business. We demonstrated his original contributions to AI technology, media coverage, judging roles at tech competitions, and evidence of his company's commercial success.
                  </p>
                  <p className="text-muted-foreground">
                    Result: Premium processing approval in just 15 days, meeting 8 of 10 criteria.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Video Testimonials</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Watch our clients share their EB1A success stories in their own words
            </p>
            <div className="bg-muted/50 rounded-lg p-12">
              <p className="text-muted-foreground">
                Video testimonials coming soon. Check back for inspiring stories from our successful clients!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-lg mb-8">
              Join hundreds of tech professionals who have successfully obtained their EB1A Green Cards with our expert guidance.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90">
              <Link to="/contact">Begin Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
