import * as DepartmentRepo from "@/repositories/department.repository";

export const getAllDepartments = async () => {
  const departments = await DepartmentRepo.findAllDepartments();
  return departments;
};
