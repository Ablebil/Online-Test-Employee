import axios, { AxiosError } from "axios";
import { AppError } from "./exception";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ success: boolean; message: string }>) => {
    if (error.response?.data?.message) {
      throw new AppError(
        error.response.data.message,
        error.response.status || 500,
      );
    }

    if (error.message) {
      throw new AppError(error.message, 500);
    }

    throw new AppError("Terjadi kesalahan yang tidak diketahui", 500);
  },
);
