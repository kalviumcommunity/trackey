

# 📘 Prisma ORM Setup & Client Initialisation

## 📌 Overview

This project uses **Prisma ORM** to connect a **Next.js backend** with a **PostgreSQL database**. Prisma acts as a bridge between the application and the database, making database operations simple, type-safe, and reliable.

---

## 🎯 Objective

The goal of this task is to:

* Integrate Prisma ORM into the project
* Define database models using Prisma schema
* Generate and initialise the Prisma Client
* Verify a successful database connection

---

## 🛠️ Tools & Technologies Used

* **Prisma ORM**
* **Prisma Client**
* **Prisma Postgres**
* **Next.js**
* **Node.js**

---

## ⚙️ Setup Steps

### 1️⃣ Install and Initialize Prisma

```bash
npm install prisma --save-dev
npx prisma init
```

This command created:

* A `/prisma` folder
* A `schema.prisma` file
* A `.env` file with `DATABASE_URL`

---

### 2️⃣ Database Configuration

The database connection is configured using the `DATABASE_URL` provided by Prisma in the `.env` file.

```env
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=..."
```

This uses **Prisma Postgres**, which allows easy local development without manual database setup.

---

### 3️⃣ Define Database Models

The database schema is defined in `prisma/schema.prisma`.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  createdAt DateTime  @default(now())
  projects  Project[]
}

model Project {
  id     Int    @id @default(autoincrement())
  name   String
  userId Int
  user   User   @relation(fields: [userId], references: [id])
}
```

This schema defines:

* A `User` table
* A `Project` table
* A one-to-many relationship between User and Project

---

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client, which is used to perform database queries inside the application.

---

### 5️⃣ Prisma Client Initialisation

A reusable Prisma client is created in `src/lib/prisma.ts`.

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

This ensures only **one Prisma Client instance** is used during development, preventing multiple database connections.

---

### 6️⃣ Apply Migration and Verify Connection

```bash
npx prisma migrate dev --name init
```

To visually verify the database and tables:

```bash
npx prisma studio
```

Tables were successfully created and accessed without errors.

---

## ✅ Verification

* Prisma Client generated successfully
* Database connected without errors
* Prisma Studio displays the tables
* Test query `prisma.user.findMany()` executed successfully

---

## 🧠 Reflection

Prisma ORM simplifies database access by providing a clean, type-safe API. It reduces boilerplate SQL, prevents common runtime errors, and improves developer productivity. The Prisma Client ensures reliable and maintainable database interactions, making the project scalable and production-ready.

---

## 🏁 Conclusion

Prisma ORM was successfully installed, configured, and connected to the database. The Prisma Client was generated and initialised correctly, and the database connection was verified using migrations and Prisma Studio.

---

