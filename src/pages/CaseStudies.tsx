import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  return (
    <div className="min-h-screen pt-20">
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl">Real success stories from our EB1A clients</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">Detailed case studies coming soon!</p>
            <Button asChild className="primary-gradient text-white">
              <Link to="/testimonials">Read Client Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
