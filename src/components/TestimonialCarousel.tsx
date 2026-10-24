import { Card } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'AI Research Scientist',
    company: 'Google',
    text: 'theEb1 helped me navigate the complex EB1A process with ease. Their expertise and personalized approach made all the difference.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Senior Software Engineer',
    company: 'Meta',
    text: 'The team\'s knowledge of immigration law and tech industry requirements is outstanding. Got my green card approved in record time!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Amazon',
    text: 'Professional, efficient, and always available to answer questions. theEb1 made my EB1A journey smooth and stress-free.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'CTO',
    company: 'Startup Founder',
    text: 'Their AI-powered approach to building my case was revolutionary. Highly recommend theEb1 to any tech professional.',
    rating: 5,
  },
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Slower than company logos
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 transition-all duration-500">
          {getVisibleTestimonials().map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 italic line-clamp-4">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.role}
                </p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary hover:text-white transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary hover:text-white transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
