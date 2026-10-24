import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className="min-h-screen pt-20">
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Blog & Resources</h1>
            <p className="text-xl">Expert insights on EB1A, immigration, and tech careers</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">Blog articles coming soon! Check back for expert guidance on EB1A petitions.</p>
            <Button asChild className="primary-gradient text-white">
              <Link to="/contact">Get Expert Guidance Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
