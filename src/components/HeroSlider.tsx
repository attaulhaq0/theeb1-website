import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    title: 'Fast-Track Your Green Card with EB1A Experts Guidance',
    description: 'We support tech professionals in securing their EB1A Green Card with expert-level insights and customized assistance.',
  },
  {
    title: 'Build Your Future in the U.S. with the O1A Visa',
    description: 'For High-Achieving Professionals in Business, Science, Technology, and Beyond',
  },
  {
    title: 'Secure Your Green Card Through EB2-NIW',
    description: 'No Job Offer or Employer Sponsorship Required — Apply Based on Your Impact and Merit',
  },
];

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative mb-8">
      <div
        className={`text-center transition-all duration-500 ease-out ${
          isAnimating ? 'opacity-0 transform translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
        }`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {currentSlide.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto">
          {currentSlide.description}
        </p>
        <Button asChild size="lg" className="primary-gradient text-white text-lg px-8 py-6 hover:opacity-90 rounded-full">
          <Link to="/contact">
            Evaluate Your Profile <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
      
      <div className="flex justify-center gap-3 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 smooth-transition ${
              index === currentIndex ? 'bg-[#14b8a6] scale-110' : 'bg-[#14b8a6]/40 hover:bg-[#14b8a6]/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
