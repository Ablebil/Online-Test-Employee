import bcrypt from "bcrypt";
import * as EmployeeRepo from "@/repositories/employee.repository";
import { LoginDTO } from "@/schemas/auth.schema";
import { signJWT, verifyJWT } from "@/lib/auth";
import { AppError } from "@/lib/exception";

export const login = async (data: LoginDTO) => {
  const { email, password } = data;

  const employee = await EmployeeRepo.findEmployeeByEmail(email);
  if (!employee) {
    throw new AppError("Email atau password salah", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    throw new AppError("Email atau password salah", 401);
  }

  const token = await signJWT({
    sub: employee.id,
    email: employee.email,
    role: employee.role,
  });

  return {
    employee: {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    },
    token,
  };
};

export const verifySession = async (token: string) => {
  const payload = await verifyJWT(token);

  if (!payload) {
    throw new AppError("Sesi tidak valid atau kadaluarsa", 401);
  }

  const employee = await EmployeeRepo.findEmployeeById(payload.sub);

  if (!employee) {
    throw new AppError("User tidak ditemukan", 401);
  }

  return employee;
};
