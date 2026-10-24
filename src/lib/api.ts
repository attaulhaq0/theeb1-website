// ============================================
// API Configuration for Hostinger
// ============================================

// Detect if running on Hostinger (production) or locally (preview)
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname === 'theeb1.com' || 
   window.location.hostname === 'www.theeb1.com');

export const API_BASE_URL = '';

// API endpoints
export const API_ENDPOINTS = {
  // POST endpoints (form submissions)
  contact: `${API_BASE_URL}api/contact.php`,
  newsletter: `${API_BASE_URL}api/newsletter.php`,
  consultation: `${API_BASE_URL}api/consultation.php`,
  
  // GET endpoints (content)
  testimonials: `${API_BASE_URL}api/testimonials.php`,
  faqs: `${API_BASE_URL}api/faqs.php`,
  pricing: `${API_BASE_URL}api/pricing.php`,
  heroSlides: `${API_BASE_URL}api/hero-slides.php`,
  companyLogos: `${API_BASE_URL}api/company-logos.php`,
  statistics: `${API_BASE_URL}api/statistics.php`,
  settings: `${API_BASE_URL}api/settings.php`,
  team: `${API_BASE_URL}api/team.php`,
  visaPages: `${API_BASE_URL}api/visa-pages.php`,
} as const;

// Generic POST API call helper
export async function apiCall<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<{ data?: T; error?: string }> {
  // In preview mode, simulate successful submission
  if (!isProduction) {
    return { 
      data: { 
        success: true, 
        message: 'Form submitted successfully! (Preview mode - will work on Hostinger)',
        id: Date.now(),
        reference: `REF-${Date.now()}`
      } as T 
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'An error occurred' };
    }

    return { data: result as T };
  } catch (error) {
    console.error('API call error:', error);
    return { error: 'Network error. Please check your connection.' };
  }
}

// Generic GET API call helper
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<{ data?: T; error?: string }> {
  // In preview mode, return empty data (components have their own fallbacks)
  if (!isProduction) {
    console.log('[Preview Mode] API GET skipped:', endpoint);
    return { data: undefined };
  }

  try {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url = `${endpoint}?${searchParams.toString()}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'An error occurred' };
    }

    return { data: result.data as T };
  } catch (error) {
    console.error('API GET error:', error);
    return { error: 'Network error. Please check your connection.' };
  }
}

// TypeScript interfaces for API responses
export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  rating: number;
  image_url: string | null;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  currency: string;
  billing_period: string;
  description: string | null;
  features: string[];
  is_popular: boolean;
  cta_text: string;
  cta_link: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string | null;
  background_image: string | null;
  cta_text: string;
  cta_link: string;
}

export interface CompanyLogo {
  id: number;
  company_name: string;
  logo_url: string;
  website_url: string | null;
}

export interface Statistic {
  id: number;
  stat_key: string;
  stat_value: number;
  stat_suffix: string;
  stat_label: string;
  icon: string | null;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  expertise: string[];
  image_url: string | null;
  linkedin_url: string | null;
  email: string | null;
}

export interface VisaPage {
  visa_type: string;
  page_title: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  overview: string | null;
  eligibility_criteria: string[];
  benefits: string[];
  process_steps: string[];
  requirements: string[];
  meta_title: string | null;
  meta_description: string | null;
}

// Typed API functions
export const api = {
  // POST endpoints
  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    return apiCall<{ success: boolean; message: string; id: number }>(
      API_ENDPOINTS.contact,
      data
    );
  },

  subscribeNewsletter: async (email: string) => {
    return apiCall<{ success: boolean; message: string }>(
      API_ENDPOINTS.newsletter,
      { email }
    );
  },

  bookConsultation: async (data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    preferred_date?: string;
  }) => {
    return apiCall<{ success: boolean; message: string; id: number; reference: string }>(
      API_ENDPOINTS.consultation,
      data
    );
  },

  // GET endpoints
  getTestimonials: async (featured?: boolean) => {
    const params = featured !== undefined ? { featured: String(featured) } : undefined;
    return apiGet<Testimonial[]>(API_ENDPOINTS.testimonials, params);
  },

  getFAQs: async (category?: string) => {
    const params = category ? { category } : undefined;
    return apiGet<FAQ[]>(API_ENDPOINTS.faqs, params);
  },

  getPricing: async () => {
    return apiGet<PricingPlan[]>(API_ENDPOINTS.pricing);
  },

  getHeroSlides: async () => {
    return apiGet<HeroSlide[]>(API_ENDPOINTS.heroSlides);
  },

  getCompanyLogos: async () => {
    return apiGet<CompanyLogo[]>(API_ENDPOINTS.companyLogos);
  },

  getStatistics: async () => {
    return apiGet<Statistic[]>(API_ENDPOINTS.statistics);
  },

  getSettings: async (key?: string) => {
    const params = key ? { key } : undefined;
    return apiGet<SiteSettings>(API_ENDPOINTS.settings, params);
  },

  getTeamMembers: async () => {
    return apiGet<TeamMember[]>(API_ENDPOINTS.team);
  },

  getVisaPage: async (type: string) => {
    return apiGet<VisaPage>(API_ENDPOINTS.visaPages, { type });
  },
};
