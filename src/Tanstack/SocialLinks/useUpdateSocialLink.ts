import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; update: Partial<{ platform: string; url: string; visible: boolean }> }) => {
      const res = await api.put(`/social-links/${data.id}`, data.update);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-links"] });
    },
  });
};
