import * as AuthService from "@/services/auth.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { LoginSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import { AppError } from "@/lib/exception";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return sendError("Validasi gagal", 400, validation.error.format());
    }

    const { employee, token } = await AuthService.login(validation.data);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return sendSuccess(employee, "Login berhasil");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
