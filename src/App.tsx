import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import EB1AVisa from "./pages/EB1AVisa";
import O1AVisa from "./pages/O1AVisa";
import EB2NIW from "./pages/EB2NIW";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import OurStory from "./pages/OurStory";
import WhyChooseUs from "./pages/WhyChooseUs";
import Leadership from "./pages/Leadership";
import Blog from "./pages/Blog";
import CaseStudies from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eb1a-visa" element={<EB1AVisa />} />
          <Route path="/o1a-visa" element={<O1AVisa />} />
          <Route path="/eb2-niw" element={<EB2NIW />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
