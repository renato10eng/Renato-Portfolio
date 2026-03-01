import { useState, useEffect } from 'react';

const STRAPI_URL = 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const useStrapiData = <T>(endpoint: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          'populate': '*',
          'locale': 'pt-BR',
          ...params
        });

        const response = await fetch(`${STRAPI_URL}/api/${endpoint}?${queryParams}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: StrapiResponse<T> = await response.json();
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error, refetch: () => window.location.reload() };
};

// Hooks específicos para cada content type
export const useHeroData = () => useStrapiData('heroes');
export const useAboutData = () => useStrapiData('abouts');
export const useProjectsData = (params?: Record<string, any>) => useStrapiData('projects', params);
export const useServicesData = () => useStrapiData('services');
export const useContactData = () => useStrapiData('contacts');
export const useStatsData = () => useStrapiData('stats');
export const useTechnologiesData = () => useStrapiData('technologies');