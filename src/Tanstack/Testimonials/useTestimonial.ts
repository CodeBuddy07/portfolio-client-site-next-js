import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Testimonial } from "./useTestimonials";
import api from "@/utils/api";

// GET a single testimonial by ID
export const useTestimonial = (id: string, options?: UseQueryOptions<Testimonial>) => {
    return useQuery<Testimonial>({
      queryKey: ['testimonial', id],
      queryFn: async () => {
        const res = await api.get(`/testimonials/${id}`);
        return res.data;
      },
      enabled: !!id,
      ...options
    });
  };