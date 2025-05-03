import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// PUT update existing testimonial (with FormData for image upload)
export const useUpdateTestimonial = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
        const res = await api.put(`/testimonials/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data.testimonial;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        queryClient.invalidateQueries({ queryKey: ['testimonial', data._id] });
      },
    });
  };