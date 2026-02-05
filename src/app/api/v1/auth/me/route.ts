import * as AuthService from "@/services/auth.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) {
      throw new AppError("Sesi tidak ditemukan, silakan login kembali", 401);
    }

    const user = await AuthService.verifySession(token);

    return sendSuccess(user, "User terautentikasi");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
