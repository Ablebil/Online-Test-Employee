import { sendSuccess } from "@/lib/api-response";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).delete("token");

  return sendSuccess(null, "Logout berhasil");
}
