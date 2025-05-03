import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { 
      id: string; 
      isRead?: boolean; 
      isArchived?: boolean 
    }) => {
      const res = await api.patch(`/emails/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
  });
};