import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        name?: string;
        iconURL?: string;
        percentage?: number;
        visible?: boolean;
      };
    }) => {
      const res = await api.put(`/skills/admin/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
    },
  });
};
