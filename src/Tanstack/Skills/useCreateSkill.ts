import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      iconURL: string;
      percentage: number;
      visible?: boolean;
    }) => {
      const res = await api.post("/skills/admin", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
    },
  });
};
