# Online Test Employee

An employee attendance management system as a submission for an Online Test. This project features role-based access control, employee management, attendance tracking, and monthly reports.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Database:** PostgreSQL
- **ORM:** Prisma
- **State Management:** TanStack Query (React Query)
- **Form:** React Hook Form + Zod
- **Auth:** Jose (JWT) + Bcrypt

## Features

- JWT authentication with role-based access (Admin & Employee)
- Employee management (CRUD operations, soft delete)
- Daily check-in/check-out attendance tracking
- Monthly attendance reports with public holiday integration

## Prerequisites

- **Node.js** v20 or higher
- **PostgreSQL** v14 or higher
- **npm** or **yarn**

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ablebil/Online-Test-Employee.git
   cd Online-Test-Employee
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create `.env` file in the root directory:

   ```env
   NODE_ENV=
   DATABASE_URL=
   JWT_SECRET=
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed database (optional)**

   ```bash
   npx prisma db seed
   ```

   Default credentials:
   - Admin: `admin@company.test` / `Str0ngP@ssw0rD`
   - Employee: `budi@company.test` / `Str0ngP@ssw0rD`

6. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

7. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable       | Description                  | Required |
| -------------- | ---------------------------- | -------- |
| `NODE_ENV`     | Application Environment      | Yes      |
| `DATABASE_URL` | PostgreSQL connection string | Yes      |
| `JWT_SECRET`   | Secret key for JWT signing   | Yes      |

## Project Architecture

```
src/
├── app/
│   ├── (dashboard)/          # Protected routes (requires auth)
│   ├── api/v1/              # API endpoints
│   └── login/               # Public login page
├── components/              # React components
├── hooks/                   # Custom React hooks
├── lib/
│   └── api/                 # API client functions
├── services/                # Business logic layer
├── repositories/            # Data access layer
├── schemas/                 # Zod validation schemas
├── types/                   # TypeScript type definitions
└── utils/                   # Helper functions
```

## Credits

**DayOff API** - Indonesian public holiday data ([dayoffapi.vercel.app](https://api-harilibur.vercel.app))
