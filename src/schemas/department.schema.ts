import z from "zod";

export const DepartmentSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export type DepartmentDTO = z.infer<typeof DepartmentSchema>;
