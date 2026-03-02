const STRAPI_URL = 'http://localhost:1337';

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

export interface HeroData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  background_image?: StrapiImage;
  metrics?: MetricData[];
}

export interface AboutData {
  id: number;
  biography: string;
  profile_image: StrapiImage;
  certifications?: string;
  education?: string;
  experience_years: number;
  projects_completed: number;
  clients_served?: number;
  gallery_images?: StrapiImage[];
  stats?: StatData[];
}

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  description: string;
  overview: string;
  featured_image: StrapiImage;
  gallery?: StrapiImage[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  status: 'completed' | 'in-progress' | 'planned';
  start_date?: string;
  completion_date?: string;
  client_name?: string;
  client_location?: string;
  project_url?: string;
  github_url?: string;
  technologies?: TechnologyData[];
  challenges?: string;
  solutions?: string;
  methodology?: string;
  metrics?: MetricData[];
  featured: boolean;
  order: number;
}

export interface TechnologyData {
  id: number;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  color: string;
}

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  order: number;
}

export interface ContactData {
  id: number;
  email: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  business_hours?: string;
}

export interface StatData {
  id: number;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: string;
}

export interface MetricData {
  id: number;
  label: string;
  value: string;
  icon: string;
  description?: string;
}

class StrapiService {
  private baseUrl = STRAPI_URL;

  private async fetchData<T>(endpoint: string, params?: Record<string, any>): Promise<T[]> {
    try {
      const queryParams = new URLSearchParams({
        'populate': '*',
        'locale': 'pt-BR',
        'sort': 'order:asc',
        ...params
      });

      const response = await fetch(`${this.baseUrl}/api/${endpoint}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }

  // Métodos específicos para cada content type
  async getHeroData(): Promise<HeroData[]> {
    return this.fetchData<HeroData>('heroes');
  }

  async getAboutData(): Promise<AboutData[]> {
    return this.fetchData<AboutData>('abouts');
  }

  async getProjectsData(featured?: boolean): Promise<ProjectData[]> {
    const params = featured ? { 'filters[featured][$eq]': 'true' } : {};
    return this.fetchData<ProjectData>('projects', params);
  }

  async getProjectBySlug(slug: string): Promise<ProjectData | null> {
    const projects = await this.fetchData<ProjectData>('projects', {
      'filters[slug][$eq]': slug
    });
    return projects[0] || null;
  }

  async getServicesData(): Promise<ServiceData[]> {
    return this.fetchData<ServiceData>('services');
  }

  async getContactData(): Promise<ContactData[]> {
    return this.fetchData<ContactData>('contacts');
  }

  async getStatsData(): Promise<StatData[]> {
    return this.fetchData<StatData>('stats');
  }

  async getTechnologiesData(): Promise<TechnologyData[]> {
    return this.fetchData<TechnologyData>('technologies');
  }
}

export const strapiService = new StrapiService();