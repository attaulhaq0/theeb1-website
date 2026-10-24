import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopInfoBar } from '@/components/TopInfoBar';
import logo from '@/assets/logo.png';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg nav-smooth' : 'relative z-50'}`}>
        <TopInfoBar />
        <nav className="bg-white shadow-sm nav-smooth">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="theEb1" className="h-20" />
            </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-black smooth-transition font-medium text-base">
              Home
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black hover:text-black bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent active:text-black font-medium text-base">
                    What we do
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 duration-200">
                    <ul className="grid w-[400px] gap-3 p-4 bg-white shadow-lg rounded-md border border-gray-200">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/eb1a-visa"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">EB1A Visa (Green Card)</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Fast-track your Green Card application
                          </p>
                        </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/o1a-visa"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">O1A Work Visa</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            For high-achieving professionals
                          </p>
                        </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/eb2-niw"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">EB2-NIW (Green Card)</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            No job offer or employer sponsorship required
                          </p>
                        </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black hover:text-black bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent active:text-black font-medium text-base">
                    Who are we
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 duration-200">
                    <ul className="grid w-[400px] gap-3 p-4 bg-white shadow-lg rounded-md border border-gray-200">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/our-story"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Our Story</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/why-choose-us"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Why Choose Us?</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/leadership"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Leadership Team</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/testimonials" className="text-black hover:text-black smooth-transition font-medium text-base">
              Testimonials
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black hover:text-black bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent active:text-black font-medium text-base">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 duration-200">
                    <ul className="grid w-[400px] gap-3 p-4 bg-white shadow-lg rounded-md border border-gray-200">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/case-studies"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Case Studies</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/blog"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">Blog</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                          to="/faqs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-900">FAQs</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/contact" className="text-black hover:text-black smooth-transition font-medium text-base">
              Contact Us
            </Link>
          </div>

          <div className="hidden lg:block">
            <Button asChild className="primary-gradient text-white hover:opacity-90 rounded-full px-8 smooth-transition">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="text-gray-700" /> : <Menu className="text-gray-700" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary">Home</Link>
            <Link to="/eb1a-visa" className="block py-2 text-gray-700 hover:text-primary">EB1A Visa</Link>
            <Link to="/o1a-visa" className="block py-2 text-gray-700 hover:text-primary">O1A Visa</Link>
            <Link to="/eb2-niw" className="block py-2 text-gray-700 hover:text-primary">EB2-NIW</Link>
            <Link to="/testimonials" className="block py-2 text-gray-700 hover:text-primary">Testimonials</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary">Contact Us</Link>
            <Button asChild className="w-full primary-gradient text-white rounded-full">
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>
        </div>
      )}
        </nav>
      </div>
      {isSticky && <div className="h-[120px]" />}
    </>
  );
};
