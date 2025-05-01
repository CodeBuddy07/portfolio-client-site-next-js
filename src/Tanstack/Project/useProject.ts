

import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data.project;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

