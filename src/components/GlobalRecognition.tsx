import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import worldMap from '@/assets/world-map.png';

export const GlobalRecognition = () => {
  return (
    <section className="py-10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Global Recognition Starts Here
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            We've helped professionals in 50+ countries use PR to stand out—and strengthen their cases.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img 
              src={worldMap} 
              alt="World map showing global reach across 50+ countries" 
              className="w-full h-auto opacity-90"
            />
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-base rounded-full shadow-md hover:shadow-lg transition-all">
            <Link to="/contact">Start Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
