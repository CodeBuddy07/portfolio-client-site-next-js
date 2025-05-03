import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useSocialLinks = (admin?: boolean) => {
  return useQuery({
    queryKey: ["social-links", admin],
    queryFn: async () => {
      const res = await api.get("/social-links", {
        params: admin ? {} : { visible: true },
      });
      return res.data;
    },
  });
};
