import prisma from "@/lib/prisma";

export const findAllDepartments = async () => {
  return await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });
};
