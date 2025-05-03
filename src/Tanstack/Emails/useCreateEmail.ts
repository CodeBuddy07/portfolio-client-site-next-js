import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEmail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await api.post("/emails", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
  });
};