import bcrypt from "bcrypt";
import { AppError } from "@/lib/exception";
import * as EmployeeRepo from "@/repositories/employee.repository";
import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@/schemas/employee.schema";

export const getEmployee = async () => {
  const employees = await EmployeeRepo.findAllEmployees();
  return employees;
};

export const getEmployeeDetail = async (id: string) => {
  const employee = await EmployeeRepo.findEmployeeById(id);
  if (!employee) {
    throw new AppError("Employee tidak ditemukan", 404);
  }

  return employee;
};

export const createEmployee = async (data: CreateEmployeeDTO) => {
  const existingEmail = await EmployeeRepo.findEmployeeByEmail(data.email);
  if (existingEmail) {
    throw new AppError("Email sudah terdaftar", 409);
  }

  const existingNik = await EmployeeRepo.findEmployeeByNik(data.nik);
  if (existingNik) {
    throw new AppError("NIK sudah terdaftar", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newEmployee = await EmployeeRepo.createEmployee({
    ...data,
    password: hashedPassword,
  });

  return newEmployee;
};

export const updateEmployee = async (id: string, data: UpdateEmployeeDTO) => {
  const employee = await EmployeeRepo.findEmployeeById(id);
  if (!employee) {
    throw new AppError("Employee tidak ditemukan", 404);
  }

  if (data.email && data.email !== employee.email) {
    const existingEmail = await EmployeeRepo.findEmployeeByEmail(data.email);
    if (existingEmail) {
      throw new AppError("Email sudah terdaftar", 409);
    }
  }

  if (data.nik && data.nik !== employee.nik) {
    const existingNik = await EmployeeRepo.findEmployeeByNik(data.nik);
    if (existingNik) {
      throw new AppError("NIK sudah terdaftar", 409);
    }
  }

  const updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updatedEmployee = await EmployeeRepo.updateEmployee(id, updateData);

  return updatedEmployee;
};

export const deleteEmployee = async (id: string) => {
  const employee = await EmployeeRepo.findEmployeeById(id);
  if (!employee) {
    throw new AppError("Employee tidak ditemukan", 404);
  }

  await EmployeeRepo.deleteEmployee(id);
};
