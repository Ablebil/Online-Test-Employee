import { api } from "@/lib/axios";
import { CheckInDTO, CheckOutDTO } from "@/schemas/attendance.schema";

export const attendanceClient = {
  getTodayStatus: async () => {
    const response = await api.get("/attendance/today");
    return response.data;
  },

  checkIn: async (data: CheckInDTO = {}) => {
    const response = await api.post("/attendance/check-in", data);
    return response.data;
  },

  checkOut: async (data: CheckOutDTO = {}) => {
    const response = await api.post("/attendance/check-out", data);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get("/attendance/history");
    return response.data;
  },
};
