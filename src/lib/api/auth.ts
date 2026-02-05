import { LoginDTO } from "@/schemas/auth.schema";
import { api } from "@/lib/axios";

export const authClient = {
  login: async (data: LoginDTO) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
