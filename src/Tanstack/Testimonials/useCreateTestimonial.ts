import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// POST create new testimonial (with FormData for image upload)
export const useCreateTestimonial = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (formData: FormData) => {
        const res = await api.post('/testimonials', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data.testimonial;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      },
    });
  };