import * as AuthService from "@/services/auth.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    const user = await AuthService.getAuthenticatedUser(userId!);

    return sendSuccess(user, "Berhasil mengambil data user");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
