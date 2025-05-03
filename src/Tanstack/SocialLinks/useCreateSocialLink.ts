import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { platform: string; url: string; visible?: boolean }) => {
      const res = await api.post("/social-links", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-links"] });
    },
  });
};
