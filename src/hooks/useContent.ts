import { useQuery } from '@tanstack/react-query';
import { 
  api, 
  Testimonial, 
  FAQ, 
  PricingPlan, 
  HeroSlide, 
  CompanyLogo, 
  Statistic, 
  SiteSettings, 
  TeamMember, 
  VisaPage 
} from '@/lib/api';

// Stale time for content queries (5 minutes)
const CONTENT_STALE_TIME = 5 * 60 * 1000;

export function useTestimonials(featured?: boolean) {
  return useQuery<Testimonial[], Error>({
    queryKey: ['testimonials', featured],
    queryFn: async () => {
      const result = await api.getTestimonials(featured);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useFAQs(category?: string) {
  return useQuery<FAQ[], Error>({
    queryKey: ['faqs', category],
    queryFn: async () => {
      const result = await api.getFAQs(category);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function usePricing() {
  return useQuery<PricingPlan[], Error>({
    queryKey: ['pricing'],
    queryFn: async () => {
      const result = await api.getPricing();
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useHeroSlides() {
  return useQuery<HeroSlide[], Error>({
    queryKey: ['heroSlides'],
    queryFn: async () => {
      const result = await api.getHeroSlides();
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useCompanyLogos() {
  return useQuery<CompanyLogo[], Error>({
    queryKey: ['companyLogos'],
    queryFn: async () => {
      const result = await api.getCompanyLogos();
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useStatistics() {
  return useQuery<Statistic[], Error>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const result = await api.getStatistics();
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useSiteSettings(key?: string) {
  return useQuery<SiteSettings, Error>({
    queryKey: ['settings', key],
    queryFn: async () => {
      const result = await api.getSettings(key);
      if (result.error) throw new Error(result.error);
      return result.data || {};
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useTeamMembers() {
  return useQuery<TeamMember[], Error>({
    queryKey: ['teamMembers'],
    queryFn: async () => {
      const result = await api.getTeamMembers();
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: CONTENT_STALE_TIME,
  });
}

export function useVisaPage(type: string) {
  return useQuery<VisaPage, Error>({
    queryKey: ['visaPage', type],
    queryFn: async () => {
      const result = await api.getVisaPage(type);
      if (result.error) throw new Error(result.error);
      if (!result.data) throw new Error('Visa page not found');
      return result.data;
    },
    staleTime: CONTENT_STALE_TIME,
    enabled: !!type,
  });
}
