

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

----
# TRackey

TRackey is a commuter assistance platform aimed at improving the daily travel experience of local train passengers.  
The problem it addresses is the lack of structured, accessible, and real-time information for commuters, which often leads to confusion, delays, and inefficient travel decisions. This project lays the foundation for building a scalable solution to manage and present such information effectively.


Represents comments added to tasks by users.


* `id` (Primary Key)
* `content`
* `taskId` (Foreign Key → Task)
* `userId` (Foreign Key → User)
* `createdAt`

A comment belongs to one task and one user.
## Folder Structure

src/
├── app/ # Routes and pages using Next.js App Router
├── components/ # Reusable UI components
├── lib/ # Utility functions and helper logic


### Directory Explanation

- **app/**  
  Contains all application routes and pages handled by the Next.js App Router.  
  This is where page-level logic and server-side rendering (SSR) are implemented.

- **components/**  
  Holds reusable UI components that can be shared across multiple pages.  
  This helps avoid duplication and ensures consistent UI throughout the app.

- **lib/**  
  Includes utility functions, helper methods, and configurations.  
  Keeping logic here separates concerns and improves maintainability.

---

## Setup Instructions

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
https://github.com/kalviumcommunity/trackey.git

2. Navigate to the project directory:

cd trackey

3. Install dependencies:

npm install

4. Start the development server:

npm run dev

6. Open the application in your browser:

http://localhost:3000

Reflection

This folder structure is designed to promote clarity, modularity, and scalability.
By separating routing (app), UI components (components), and utility logic (lib), the codebase becomes easier to understand and extend.

As the application grows in future sprints—with features like real-time updates,
notifications, and dashboards—this structure will allow the team to scale efficiently without clutter or major refactoring. It also supports better collaboration by clearly defining responsibilities within the codebase.

 <img width="1680" height="1050" alt="Screenshot 2026-01-08 at 12 52 14 PM" src="https://github.com/user-attachments/assets/14703678-59ea-4ea8-a172-a397955aabca" />


Docker Assignment 2.12 
Dockerfile

Uses node:18-alpine.

Installs dependencies, copies code, exposes 5000, runs npm start.

Docker Compose

backend → built from Dockerfile, uses .env, runs on port 5000.

mongo → mongo:latest, port 27017, persistent volume.

Network & Volumes

Custom trackey-net network for backend ↔ mongo.

mongo-data volume to persist DB.

Env Variables

Loaded from .env using env_file:.

Issues & Fixes

Docker daemon off → start Docker Desktop.

DNS pull error → restart Docker.

Mongo connection error → use mongodb://mongo:27017/db.

Port conflict → stop local Node app.


Assignment 2.16

1. Ran Prisma Commands

After setting the .env, executed:

npx prisma generate
npx prisma migrate dev


This applied the schema and ensured the database was synced.

Then opened the Prisma UI:

npx prisma studio

2. Verified Folder Structure & Purpose

Backend is responsible for storing and managing tracking-related data

3. Server Setup

After completing the environment and Prisma setup, the development server was run using:
npm run dev
Everything loaded successfully once dependencies and env variables were correctly configured.

Assignment 2.19

Input Validation Using Zod

Trackey uses Zod to validate all incoming data for POST/PUT API routes.
This prevents invalid train information from entering the system and makes the backend more reliable.

Schemas

Example: trainSchema.ts

export const trainSchema = z.object({
  trainNumber: z.string().min(3),
  trainName: z.string().min(2),
  status: z.enum(["ON_TIME", "DELAYED", "CANCELLED"]),
  arrivalTime: z.string(),
  departureTime: z.string(),
});

Validation Flow

Incoming request → parsed using trainSchema.parse()

If valid → proceed with logic

If invalid → send structured error response

Error Handling Example
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    { "field": "trainNumber", "message": "Train number is required" }
  ]
}

Why It Matters

Prevents corrupted or incomplete train data

Ensures consistent input across the team

Reusable schemas work on both client and server

Saves debugging time and catches mistakes early


Assignment 2.20
Authorization Middleware – Trackey
Overview

Trackey uses JWT-based authorization middleware in Next.js to enforce Role-Based Access Control (RBAC). Middleware runs before API routes, validating user sessions and restricting access based on roles.

How It Works

Request hits /api/*

Middleware intercepts the request

JWT is extracted from Authorization header

Token is verified

User role is checked

Request is allowed or denied

Role-Based Access Rules
Route	Access
/api/users	Any authenticated user
/api/admin	Admin only
JWT & Roles

User role (user / admin) is stored in the database

Role is embedded inside JWT at login

Middleware reads decoded.role to enforce access

Least Privilege

Users can only access routes required for their role. Admin privileges are strictly limited to admin routes.

Extensibility

New roles (e.g., editor, moderator) can be added by:

Updating the User model

Extending role checks in middleware

Testing Results

Admin token → Admin route → ✅ Allowed

User token → Admin route → ❌ Denied

User token → User route → ✅ Allowed
