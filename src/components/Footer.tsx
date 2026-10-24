import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { api } from '@/lib/api';

const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
});

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      newsletterSchema.parse({ email });
      setIsSubmitting(true);
      
      // Call PHP API endpoint
      const { data, error } = await api.subscribeNewsletter(email);

      if (error) {
        throw new Error(error);
      }

      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white"
              />
              <Button type="submit" disabled={isSubmitting} className="primary-gradient text-white shrink-0 smooth-transition">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">
                Let's Get Social
                <div className="h-0.5 w-24 bg-primary mt-1"></div>
              </h4>
              <div className="flex gap-3">
                <a href="#" className="smooth-transition hover:scale-110" aria-label="Facebook">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#1877F2"/>
                    <path d="M27.5 20C27.5 15.857 24.143 12.5 20 12.5C15.857 12.5 12.5 15.857 12.5 20C12.5 23.714 15.205 26.834 18.75 27.419V22.5H16.875V20H18.75V18.125C18.75 16.399 19.899 15.5 21.375 15.5H23.125V17.5H21.875C21.53 17.5 21.25 17.78 21.25 18.125V20H23.125L22.5 22.5H21.25V27.419C24.795 26.834 27.5 23.714 27.5 20Z" fill="white"/>
                  </svg>
                </a>
                <a href="#" className="smooth-transition hover:scale-110" aria-label="Twitter">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#1DA1F2"/>
                    <path d="M28.075 15.187c-.012.212-.012.437-.012.65 0 6.65-5.062 14.312-14.312 14.312-2.85 0-5.487-.825-7.712-2.262.4.05.787.062 1.2.062 2.337 0 4.487-.8 6.2-2.137-2.187-.037-4.037-1.487-4.675-3.475.312.05.612.087.937.087.45 0 .887-.062 1.3-.175-2.287-.462-4.012-2.487-4.012-4.912v-.062c.675.375 1.45.6 2.262.625-1.337-.9-2.225-2.425-2.225-4.162 0-.912.25-1.775.675-2.512 2.462 3.025 6.15 5.012 10.3 5.225-.087-.375-.125-.762-.125-1.162 0-2.762 2.237-5 5-5 1.437 0 2.737.612 3.65 1.587 1.137-.225 2.212-.637 3.175-1.212-.375 1.162-1.162 2.137-2.2 2.75 1.012-.125 1.975-.387 2.875-.787-.675 1.012-1.525 1.887-2.5 2.6z" fill="white"/>
                  </svg>
                </a>
                <a href="#" className="smooth-transition hover:scale-110" aria-label="LinkedIn">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#0A66C2"/>
                    <path d="M15.625 13.75C15.625 15.035 14.598 16.25 13.125 16.25C11.652 16.25 10.625 15.035 10.625 13.75C10.625 12.465 11.652 11.25 13.125 11.25C14.598 11.25 15.625 12.465 15.625 13.75ZM15.625 17.5H10.625V28.75H15.625V17.5ZM21.875 17.5H18.125V28.75H21.875V22.5C21.875 19.375 25.625 19.062 25.625 22.5V28.75H29.375V20.937C29.375 15.625 23.75 15.937 21.875 18.437V17.5Z" fill="white"/>
                  </svg>
                </a>
                <a href="#" className="smooth-transition hover:scale-110" aria-label="Instagram">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="instagramGradient" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" style={{ stopColor: '#FFD521' }} />
                        <stop offset="20%" style={{ stopColor: '#F7A125' }} />
                        <stop offset="40%" style={{ stopColor: '#E95950' }} />
                        <stop offset="60%" style={{ stopColor: '#C32AA3' }} />
                        <stop offset="100%" style={{ stopColor: '#7232BD' }} />
                      </radialGradient>
                    </defs>
                    <circle cx="20" cy="20" r="20" fill="url(#instagramGradient)"/>
                    <path d="M20 13.125C22.656 13.125 22.984 13.137 23.984 13.187C24.922 13.234 25.422 13.406 25.75 13.547C26.187 13.734 26.5 13.953 26.828 14.281C27.156 14.609 27.375 14.922 27.562 15.359C27.703 15.687 27.875 16.187 27.922 17.125C27.972 18.125 27.984 18.453 27.984 21.109C27.984 23.766 27.972 24.094 27.922 25.094C27.875 26.031 27.703 26.531 27.562 26.859C27.375 27.297 27.156 27.609 26.828 27.937C26.5 28.266 26.187 28.484 25.75 28.672C25.422 28.812 24.922 28.984 23.984 29.031C22.984 29.081 22.656 29.094 20 29.094C17.344 29.094 17.016 29.081 16.016 29.031C15.078 28.984 14.578 28.812 14.25 28.672C13.813 28.484 13.5 28.266 13.172 27.937C12.844 27.609 12.625 27.297 12.438 26.859C12.297 26.531 12.125 26.031 12.078 25.094C12.028 24.094 12.016 23.766 12.016 21.109C12.016 18.453 12.028 18.125 12.078 17.125C12.125 16.187 12.297 15.687 12.438 15.359C12.625 14.922 12.844 14.609 13.172 14.281C13.5 13.953 13.813 13.734 14.25 13.547C14.578 13.406 15.078 13.234 16.016 13.187C17.016 13.137 17.344 13.125 20 13.125ZM20 11.25C17.297 11.25 16.938 11.262 15.922 11.312C14.906 11.362 14.219 11.544 13.625 11.806C13.016 12.081 12.484 12.438 11.969 12.969C11.453 13.5 11.094 14.016 10.809 14.625C10.547 15.219 10.375 15.906 10.309 16.922C10.259 17.938 10.25 18.297 10.25 21C10.25 23.703 10.259 24.062 10.309 25.078C10.375 26.094 10.547 26.781 10.809 27.375C11.094 27.984 11.453 28.5 11.969 29.031C12.484 29.547 13.016 29.906 13.625 30.191C14.219 30.453 14.906 30.625 15.922 30.691C16.938 30.741 17.297 30.75 20 30.75C22.703 30.75 23.062 30.741 24.078 30.691C25.094 30.625 25.781 30.453 26.375 30.191C26.984 29.906 27.516 29.547 28.031 29.031C28.547 28.5 28.906 27.984 29.191 27.375C29.453 26.781 29.625 26.094 29.691 25.078C29.741 24.062 29.75 23.703 29.75 21C29.75 18.297 29.741 17.938 29.691 16.922C29.625 15.906 29.453 15.219 29.191 14.625C28.906 14.016 28.547 13.5 28.031 12.969C27.516 12.438 26.984 12.081 26.375 11.806C25.781 11.544 25.094 11.372 24.078 11.312C23.062 11.262 22.703 11.25 20 11.25Z" fill="white"/>
                    <path d="M20 15.484C17.172 15.484 14.875 17.781 14.875 20.609C14.875 23.437 17.172 25.734 20 25.734C22.828 25.734 25.125 23.437 25.125 20.609C25.125 17.781 22.828 15.484 20 15.484ZM20 23.859C18.219 23.859 16.75 22.391 16.75 20.609C16.75 18.828 18.219 17.359 20 17.359C21.781 17.359 23.25 18.828 23.25 20.609C23.25 22.391 21.781 23.859 20 23.859Z" fill="white"/>
                    <circle cx="25.344" cy="15.266" r="1.094" fill="white"/>
                  </svg>
                </a>
                <a href="#" className="smooth-transition hover:scale-110" aria-label="YouTube">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#FF0000"/>
                    <path d="M29.375 16.5C29.375 16.5 29.125 14.75 28.375 14C27.375 12.95 26.25 12.95 25.75 12.9C21.875 12.65 20 12.65 20 12.65C20 12.65 18.125 12.65 14.25 12.9C13.75 12.95 12.625 12.95 11.625 14C10.875 14.75 10.625 16.5 10.625 16.5C10.625 16.5 10.375 18.625 10.375 20.75V22.625C10.375 24.75 10.625 26.875 10.625 26.875C10.625 26.875 10.875 28.625 11.625 29.375C12.625 30.425 13.875 30.4 14.5 30.5C16.625 30.7 20 30.75 20 30.75C20 30.75 21.875 30.725 25.75 30.475C26.25 30.425 27.375 30.425 28.375 29.375C29.125 28.625 29.375 26.875 29.375 26.875C29.375 26.875 29.625 24.75 29.625 22.625V20.75C29.625 18.625 29.375 16.5 29.375 16.5ZM17.75 24.375V17.125L24.375 20.75L17.75 24.375Z" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 pb-2 border-b-2 border-primary inline-block">Quick Links</h4>
            <ul className="space-y-2 mt-4">
              <li>
                <Link to="/eb1a-visa" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> EB1A Visa
                </Link>
              </li>
              <li>
                <Link to="/o1a-visa" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> O-1A Visa
                </Link>
              </li>
              <li>
                <Link to="/eb2-niw" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> EB2-NIW
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> Who are we
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 pb-2 border-b-2 border-primary inline-block">Resources</h4>
            <ul className="space-y-2 mt-4">
              <li>
                <Link to="/testimonials" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> Testimonials
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm hover:text-primary smooth-transition flex items-center gap-2">
                  <span className="text-primary">»</span> FAQ's
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-primary shrink-0" />
                <div className="space-y-1">
                  <a href="mailto:contact@theeb1.com" className="text-sm hover:text-primary smooth-transition block">
                    contact@theeb1.com
                  </a>
                  <a href="mailto:hr@theeb1.com" className="text-sm hover:text-primary smooth-transition block">
                    hr@theeb1.com
                  </a>
                  <a href="mailto:payments@theeb1.com" className="text-sm hover:text-primary smooth-transition block">
                    payments@theeb1.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
                <span className="text-sm">
                  5701 Truxtun Ave.<br />
                  Bakersfield, CA 93309
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="py-8 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#14b8a6] border-t border-purple-200">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white text-center leading-relaxed max-w-5xl mx-auto">
            <strong className="font-semibold text-white">Disclaimer:</strong> theEb1 LLC (theEb1) is not a law firm and does not provide legal services. Our services are limited to consultation and document preparation for immigration petitions. We do not provide legal advice or representation. All documents prepared by theEb1 should be reviewed by a licensed attorney before submission to USCIS. Success rates mentioned are based on historical data and do not guarantee future results. Individual outcomes may vary based on specific circumstances and eligibility criteria.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-700 font-medium">
              © 2025 theEb1 LLC. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-700">
              <Link to="#" className="hover:text-[#6366f1] smooth-transition font-medium">Privacy Policy</Link>
              <span className="text-gray-400">•</span>
              <Link to="#" className="hover:text-[#6366f1] smooth-transition font-medium">Terms of Use</Link>
              <span className="text-gray-400">•</span>
              <Link to="#" className="hover:text-[#6366f1] smooth-transition font-medium">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
