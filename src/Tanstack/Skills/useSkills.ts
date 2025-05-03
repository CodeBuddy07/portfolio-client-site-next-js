import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await api.get("/skills");
      return res.data;
    },
  });
};
