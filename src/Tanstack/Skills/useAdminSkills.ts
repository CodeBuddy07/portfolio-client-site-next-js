import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useAdminSkills = () => {
  return useQuery({
    queryKey: ["admin-skills"],
    queryFn: async () => {
      const res = await api.get("/skills/admin");
      return res.data;
    },
  });
};
