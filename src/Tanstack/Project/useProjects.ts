// hooks/useProjects.ts
import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';


export const useProjects = (filters: {
  visible?: boolean;
  category?: string;
  status?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (filters.visible !== undefined) {
    searchParams.append('visible', filters.visible.toString());
  }
  if (filters.category) {
    searchParams.append('category', filters.category);
  }
  if (filters.status) {
    searchParams.append('status', filters.status);
  }

  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      const res = await api.get(`/projects?${searchParams.toString()}`);
      return res.data.projects;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};
