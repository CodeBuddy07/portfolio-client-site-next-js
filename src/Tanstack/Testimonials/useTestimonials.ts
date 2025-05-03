/**
 * Helper function to create a FormData object from testimonial data
 * @param data Testimonial data to convert to FormData
 * @param file Optional file to include in the FormData
 * @returns FormData object ready to be sent to the API
 */

import api from '@/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const createTestimonialFormData = (
    data: Partial<TestimonialInput>, 
    file?: File | null
  ): FormData => {
    const formData = new FormData();
    
    // Add all data fields to the form data
    if (data.name) formData.append('name', data.name);
    if (data.position) formData.append('position', data.position);
    if (data.company) formData.append('company', data.company);
    if (data.starCount) formData.append('starCount', data.starCount.toString());
    if (data.testimonial) formData.append('testimonial', data.testimonial);
    if (data.projectID) formData.append('projectID', data.projectID);
    
    // Boolean fields need to be converted to strings
    if (data.isFeatured !== undefined) formData.append('isFeatured', data.isFeatured.toString());
    if (data.isActive !== undefined) formData.append('isActive', data.isActive.toString());
    
    // Add file if provided
    if (file) {
      formData.append('file', file);
    }
    
    return formData;
  }


  
  // Types for testimonials
  export interface Testimonial {
    _id: string;
    name: string;
    position?: string;
    company: string;
    starCount: number;
    testimonial: string;
    imgDeleteURL?: string;
    imgDisplayURL?: string;
    projectID?: string;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TestimonialInput {
    name: string;
    position?: string;
    company: string;
    starCount: number;
    testimonial: string;
    imgDeleteURL?: string;
    imgDisplayURL?: string;
    projectID?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  }
  
  export interface PaginatedResponse {
    testimonials: Testimonial[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }
  
  // GET all testimonials with pagination
  export const useTestimonials = (
    params: {
      page?: number;
      projectData?: boolean
      limit?: number;
      search?: string;
      featured?: boolean;
      all?: boolean;
      sortField?: string;
      sortOrder?: 'asc' | 'desc';
    } = {},
    options?: UseQueryOptions<PaginatedResponse>
  ) => {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.featured) queryParams.append('featured', 'true');
    if (params.projectData) queryParams.append('projectData', 'true');
    if (params.all) queryParams.append('all', 'true');
    if (params.sortField) queryParams.append('sortField', params.sortField);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const queryString = queryParams.toString();
    const url = `/testimonials${queryString ? `?${queryString}` : ''}`;
  
    return useQuery<PaginatedResponse>({
      queryKey: ['testimonials', params],
      queryFn: async () => {
        const res = await api.get(url);
        return res.data;
      },
      ...options
    });
  };
  
  
  
  
  
  
