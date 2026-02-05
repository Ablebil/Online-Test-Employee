import bcrypt from "bcrypt";
import * as EmployeeRepo from "@/repositories/employee.repository";
import { LoginDTO } from "@/schemas/auth.schema";
import { signJWT } from "@/lib/auth";
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

export const getAuthenticatedUser = async (userId: string) => {
  const employee = await EmployeeRepo.findEmployeeById(userId);

  if (!employee) {
    throw new AppError("User tidak ditemukan", 401);
  }

  return employee;
};
