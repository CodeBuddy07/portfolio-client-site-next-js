// hooks/useProjects.ts
import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

interface ProjectFilters {
  visible?: boolean;
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useProjects = (filters: ProjectFilters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.visible !== undefined) {
        params.append('visible', filters.visible.toString());
      }
      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.status) {
        params.append('status', filters.status);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.page) {
        params.append('page', filters.page.toString());
      }
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }

      const res = await api.get(`/projects?${params.toString()}`);
      return res.data; // includes both `projects` and `pagination`
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
