import { PrismaPg } from "@prisma/adapter-pg";
import {
  AttendanceStatus,
  EmploymentStatus,
  PrismaClient,
  Role,
} from "@/app/generated/prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function hash(password: string) {
  return bcrypt.hash(password, 10);
}

export async function main() {
  console.log("seeding database...");

  // departments
  const itDept = await prisma.department.upsert({
    where: { name: "IT" },
    update: {},
    create: { name: "IT" },
  });

  const hrDept = await prisma.department.upsert({
    where: { name: "HR" },
    update: {},
    create: { name: "HR" },
  });

  // employees
  const admin = await prisma.employee.create({
    data: {
      nik: "ABC-2026-IT-001",
      name: "Admin",
      email: "admin@company.test",
      phone: "0811111111",
      password: await hash("Str0ngP@ssw0rD"),
      role: Role.ADMIN,
      position: "System Administrator",
      employmentStatus: EmploymentStatus.TETAP,
      departmentId: itDept.id,
    },
  });

  const employees = await prisma.employee.createMany({
    data: [
      {
        nik: "ABC-2026-IT-002",
        name: "Budi Santoso",
        email: "budi@company.test",
        password: await hash("Str0ngP@ssw0rD"),
        position: "Backend Engineer",
        departmentId: itDept.id,
      },
      {
        nik: "ABC-2026-IT-003",
        name: "Siti Aminah",
        email: "siti@company.test",
        password: await hash("Str0ngP@ssw0rD"),
        position: "Frontend Engineer",
        departmentId: itDept.id,
      },
      {
        nik: "ABC-2026-HR-001",
        name: "Andi Wijaya",
        email: "andi@company.test",
        password: await hash("Str0ngP@ssw0rD"),
        position: "HR Officer",
        departmentId: hrDept.id,
      },
      {
        nik: "ABC-2026-HR-002",
        name: "Rina Kusuma",
        email: "rina@company.test",
        password: await hash("Str0ngP@ssw0rD"),
        position: "HR Recruitment",
        departmentId: hrDept.id,
      },
    ],
  });

  const allEmployees = await prisma.employee.findMany();

  // attendance
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const emp of allEmployees) {
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      await prisma.attendance.create({
        data: {
          date,
          checkIn: new Date(date.getTime() + 9 * 60 * 60 * 1000),
          checkOut: new Date(date.getTime() + 17 * 60 * 60 * 1000),
          status: AttendanceStatus.HADIR,
          employeeId: emp.id,
        },
      });
    }
  }

  console.log("seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
