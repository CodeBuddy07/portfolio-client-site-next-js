/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: any) => {
      const res = await api.post('/projects', formData);
      return res.data.project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
