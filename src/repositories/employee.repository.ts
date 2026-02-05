import prisma from "@/lib/prisma";

export const findEmployeeByEmail = async (email: string) => {
  return await prisma.employee.findUnique({
    where: { email },
  });
};

export const findEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({
    where: { id },
  });
};
