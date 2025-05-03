import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// DELETE testimonial
export const useDeleteTestimonial = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (id: string) => {
        const res = await api.delete(`/testimonials/${id}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      },
    });
  };