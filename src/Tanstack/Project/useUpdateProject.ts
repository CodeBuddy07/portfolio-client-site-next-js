/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: FormData | Record<string, any>; // Support both JSON and FormData
    }) => {
      const isFormData = data instanceof FormData;
      const res = await api.patch(`/projects/${id}`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      return res.data.project;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    },
  });
};
