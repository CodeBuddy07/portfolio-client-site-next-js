import api from "@/utils/api";
import { useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { PaginatedResponse, useTestimonials } from "./useTestimonials";

  // PATCH toggle featured status
  export const useToggleTestimonialFeature = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (id: string) => {
        const res = await api.patch(`/testimonials/feature/${id}`);
        return res.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        queryClient.invalidateQueries({ queryKey: ['testimonial', data._id] });
      },
    });
  };
  
  // Helper hook for featured testimonials
  export const useFeaturedTestimonials = (limit = 6, options?: UseQueryOptions<PaginatedResponse>) => {
    return useTestimonials(
      { featured: true, limit, sortField: 'createdAt', sortOrder: 'desc' },
      { ...options, queryKey: ['testimonials', 'featured', limit] }
    );
  };