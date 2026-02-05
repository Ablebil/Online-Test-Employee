import prisma from "@/lib/prisma";
import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@/schemas/employee.schema";

export const findEmployeeByEmail = async (email: string) => {
  return await prisma.employee.findUnique({
    where: { email },
  });
};

export const findEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({
    where: { id, deletedAt: null },
    select: {
      id: true,
      nik: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      position: true,
      employmentStatus: true,
      joinDate: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,

      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const findEmployeeByNik = async (nik: string) => {
  return await prisma.employee.findFirst({
    where: { nik, deletedAt: null },
  });
};

export const findAllEmployees = async () => {
  return prisma.employee.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nik: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      position: true,
      employmentStatus: true,
      joinDate: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,

      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const createEmployee = async (data: CreateEmployeeDTO) => {
  return await prisma.employee.create({
    data: {
      ...data,
      joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
    },
    select: {
      id: true,
      nik: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      position: true,
      employmentStatus: true,
      joinDate: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,

      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const updateEmployee = async (id: string, data: UpdateEmployeeDTO) => {
  return await prisma.employee.update({
    where: { id, deletedAt: null },
    data: {
      ...data,
      joinDate: data.joinDate ? new Date(data.joinDate) : undefined,
    },
    select: {
      id: true,
      nik: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      position: true,
      employmentStatus: true,
      joinDate: true,
      departmentId: true,
      createdAt: true,
      updatedAt: true,

      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const deleteEmployee = async (id: string) => {
  return await prisma.employee.update({
    where: { id, deletedAt: null },
    data: {
      deletedAt: new Date(),
    },
  });
};
