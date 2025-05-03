import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useEmails = (params?: { 
  search?: string; 
  page?: number; 
  limit?: number;
  isRead?: boolean;
  isArchived?: boolean;
}) => {
  return useQuery({
    queryKey: ["emails", params],
    queryFn: async () => {
      const res = await api.get("/emails", { params });
      return res.data;
    },
  });
};