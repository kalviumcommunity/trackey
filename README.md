

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

API Route Structure and Naming

This project follows RESTful API design principles using Next.js App Router file-based routing.
All backend API endpoints are organized under the /api directory to ensure clarity, predictability, and maintainability.

📁 API Folder Structure
app/
 └── api/
     ├── users/
     │   └── route.ts
     ├── trains/
     │   └── route.ts
     └── bookings/
         └── route.ts


Each route.ts file automatically maps to a REST API endpoint in Next.js.

🌐 API Endpoints
HTTP Method	Endpoint	Description
GET	/api/users	Fetch all users
POST	/api/users	Create a new user
GET	/api/trains	Fetch trains with pagination
GET	/api/bookings	Fetch all bookings
🔹 REST Design Principles Followed

Resource-based routing using plural nouns

Lowercase route names

HTTP methods define actions (GET, POST)

No verbs used in URLs

Clear separation between UI routes and API routes

🔹 Pagination Support

The /api/trains endpoint supports pagination using query parameters:

/api/trains?page=1&limit=10


This helps handle large datasets efficiently and keeps responses lightweight.

⚠️ Error Handling

Meaningful HTTP status codes and error messages are returned when data is unavailable.

Example:

404 Not Found when no bookings exist

This improves debugging and API usability.

🧪 API Testing

All API endpoints were tested using:

Browser

curl / Postman

Screenshots of successful API responses are included as evidence.

🧠 Reflection

Using a consistent and RESTful API route structure makes backend development more predictable and easier to maintain.
Clear naming conventions reduce confusion, improve collaboration, and allow frontend developers to integrate APIs without needing extra documentation.

🔐 Authentication APIs (Signup / Login)

This project implements secure user authentication using bcrypt for password hashing and JWT (JSON Web Tokens) for session management in a Next.js App Router backend.

Authentication ensures that only valid users can access protected routes and sensitive data.

📌 Features Implemented

User Signup API with secure password hashing

User Login API with JWT token generation

Protected Route that allows access only with a valid token

Secure handling of credentials

Token expiry for session safety

🧠 Authentication vs Authorization
Concept	Meaning	Example
Authentication	Verifies who the user is	Login using email & password
Authorization	Verifies what the user can access	Admin-only routes

👉 This project focuses on authentication.

🛠️ Technologies Used

Next.js (App Router)

Prisma ORM

PostgreSQL

bcrypt

jsonwebtoken (JWT)

📂 API Folder Structure
app/
 └── api/
      ├── auth/
      │    ├── signup/
      │    │    └── route.ts
      │    └── login/
      │         └── route.ts
      └── users/
           └── route.ts
lib/
 └── prisma.ts

🔑 Signup API
Endpoint
POST /api/auth/signup

What it does

Accepts name, email, and password

Hashes the password using bcrypt

Stores the user securely in the database

Password Hashing Code
const hashedPassword = await bcrypt.hash(password, 10);

Sample Request
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"name":"Alice","email":"alice@example.com","password":"mypassword"}'

Sample Success Response
{
  "success": true,
  "message": "Signup successful"
}

Sample Failure Response
{
  "success": false,
  "message": "User already exists"
}

🔓 Login API
Endpoint
POST /api/auth/login

What it does

Verifies email & password

Compares hashed password using bcrypt

Generates a JWT token on success

JWT Generation Code
const token = jwt.sign(
  { id: user.id, email: user.email },
  JWT_SECRET,
  { expiresIn: "1h" }
);

Sample Request
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"alice@example.com","password":"mypassword"}'

Sample Success Response
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Sample Failure Response
{
  "success": false,
  "message": "Invalid credentials"
}

🛡️ Protected Route
Endpoint
GET /api/users

What it does

Checks Authorization header

Verifies JWT token

Returns protected data only if token is valid

Header Format
Authorization: Bearer <JWT_TOKEN>

Sample Request
curl -X GET http://localhost:3000/api/users \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>"

Success Response
{
  "success": true,
  "message": "Protected data",
  "user": {
    "id": "123",
    "email": "alice@example.com"
  }
}

Failure Response
{
  "success": false,
  "message": "Invalid or expired token"
}

⏳ Token Expiry & Refresh Reflection

Tokens expire after 1 hour

Expiry prevents misuse if a token is leaked

On expiry, user must log in again

For long-lived sessions:

Refresh tokens can be implemented

Tokens can be rotated securely

🍪 Token Storage Options
Storage	Pros	Cons
localStorage	Easy to use	Vulnerable to XSS
HTTP-only cookies	More secure	Slightly complex

👉 Best practice: HTTP-only cookies for production apps.

🔐 How Authentication Improves Security

Passwords are never stored as plain text

JWT ensures identity verification on every request

Unauthorized users cannot access protected routes

Token expiry reduces attack impact

💭 Creative Reflection

If a token leaks or expires, the system protects users by limiting token lifetime and requiring re-authentication. This ensures attackers cannot maintain long-term access, keeping user data safe.

✅ Conclusion

This project demonstrates a secure, scalable authentication system using modern best practices. Implementing authentication early ensures better security, maintainability, and user trust.

Layout & Component Architecture (Next.js)
🚀 Project Overview

This project focuses on creating a reusable component architecture in a Next.js application.
The goal is to build a structured layout using shared components like Header, Sidebar, LayoutWrapper, and reusable UI elements such as a Button.
This approach helps to maintain consistent design, improve scalability, and make the application easier to manage.

📁 Project Structure (Descriptive)

The project is organized into separate folders for app pages, components, and styles.

app/ contains the main pages and global layout.

components/ holds reusable UI components divided into layout components (Header, Sidebar, LayoutWrapper) and UI elements (Button, Card, Input).

styles/ contains global CSS styling.

This structure keeps the code modular and easy to maintain.

🧩 Component Architecture
1. Header Component

The Header component is used as the top navigation bar across all pages.
It provides links to major pages like Home, Dashboard, and Profile.
The header ensures consistent navigation and branding throughout the application.

2. Sidebar Component

The Sidebar component provides side navigation for dashboard-related pages.
It includes links like Overview, Users, and Settings.
Using a sidebar ensures the layout remains consistent and navigation is easy to access.

3. LayoutWrapper Component

The LayoutWrapper combines the Header and Sidebar into a single layout structure.
It acts as the main template for all pages, ensuring the UI remains uniform.
Every page that uses this wrapper automatically inherits the same layout design.

4. Reusable UI Elements (Example: Button)

Reusable UI components like Button, Card, and InputField are created to maintain consistent design.
These components accept properties (props) so they can be customized easily while keeping the same style.

🧠 Component Hierarchy (Descriptive)

The layout follows a hierarchical structure where the Root Layout wraps the entire app.
Inside it, the LayoutWrapper holds the Header and Sidebar, and the main page content is displayed within the layout.

This hierarchy ensures:

consistent design

easy component reuse

better maintainability

🧪 Visual Testing (Optional)

To ensure components are working correctly, you can use tools like Storybook.
Storybook helps to preview components in isolation, which makes testing and debugging easier.

📝 Reflection
✅ Benefits of Modular Architecture

Reusability: Same components can be used across multiple pages.

Maintainability: Changes in one component reflect across the whole app.

Scalability: Easy to add new pages and components without disrupting the layout.

Consistency: Same UI style is maintained across the entire app.

Accessibility: Standardized structure helps with keyboard navigation and readability.

📌 Final Deliverables

✔ Modular layout components (Header, Sidebar, LayoutWrapper)
✔ Reusable UI elements (Button, Card, etc.)
✔ Consistent page layout across all pages
✔ Documentation describing component architecture and benefits

📌 Overview

This assignment demonstrates how to build a reusable and accessible form using React Hook Form for form state management and Zod for schema-based validation. The goal is to ensure clean, predictable, and validated user input while keeping the UI simple and maintainable.

⚙️ Technologies Used

Next.js (App Router)

React Hook Form

Zod

@hookform/resolvers

Tailwind CSS

📂 Project Structure (Relevant Files)
app/
 └── signup/
     └── page.tsx        # Signup form page
components/
 └── FormInput.tsx       # Reusable input component
lib/
 └── signupSchema.ts     # Zod validation schema

🧠 Form Handling with React Hook Form

React Hook Form is used to manage form state efficiently with minimal re-renders.
It handles:

Input registration

Form submission

Error tracking

Submission state (isSubmitting)

This makes form logic clean and easy to scale.

✅ Validation using Zod

Zod is used to define a validation schema for the form fields.

Validation Rules:

Name: Minimum 3 characters

Email: Must be a valid email format

Password: Minimum 6 characters

The schema is connected to React Hook Form using zodResolver, ensuring all validation rules are enforced before submission.

🔁 Reusable Components

A reusable FormInput component was created to avoid repetition.

Benefits:

Reduces duplicated input and error logic

Makes the form easier to maintain

Allows reuse across multiple forms

Each input receives its label, type, register function, and error message as props.

♿ Accessibility Considerations

Every input is associated with a <label>

Validation error messages are shown clearly below inputs

aria-invalid is used to indicate invalid fields to screen readers

Keyboard-friendly and readable UI

🧪 Form Behavior

Prevents submission if inputs are invalid

Displays validation errors instantly

On successful submission:

Shows an alert message

Logs validated form data in the console

📸 Screenshots Included

Empty form submission showing validation errors

Invalid input values with error messages

Successful form submission state

✨ Conclusion

Using React Hook Form with Zod provides a powerful and scalable way to handle forms.
This approach improves:

Data integrity

Code reusability

Accessibility

Developer experience

# Trackey – Role-Based Access Control (RBAC)

## Overview
This project implements **Role-Based Access Control (RBAC)** to ensure users can only access features and perform actions that match their assigned role.  
RBAC improves security, prevents privilege misuse, and makes the system easier to scale and audit.

---

## Roles & Permissions

| Role   | Permissions                         |
|--------|-------------------------------------|
| Admin  | Create, Read, Update, Delete         |
| Editor | Read, Update                         |
| Viewer | Read only                            |

Roles are designed to be broad and clearly separated to avoid unnecessary complexity.

---

## RBAC Design

### Permission Mapping
Roles and permissions are defined in a centralized configuration file.  
Each role maps to a list of allowed actions such as `create`, `read`, `update`, and `delete`.

### Permission Check Logic
A reusable helper function checks whether a given role is allowed to perform a specific action before proceeding.

---

## Backend Enforcement (API Routes)
RBAC is enforced at the **API level** to ensure security even if the frontend is bypassed.

- Every sensitive API route checks the user’s role before executing an action
- Unauthorized requests return **HTTP 403 (Forbidden)**
- Example protected resources:
  - `/api/bookings`
  - `/api/trains`
  - `/api/users`

This guarantees that permission rules cannot be bypassed from the client side.

---

## Frontend Access Control (UI)
The UI conditionally renders buttons and actions based on the user’s role.

- Unauthorized actions are hidden from the interface
- Users only see what they are permitted to do
- Improves user experience and reduces accidental misuse

---

## Auditing & Logging
All permission checks generate logs indicating whether access was **ALLOWED** or **DENIED**.

These logs help with:
- Security auditing
- Debugging permission issues
- Demonstrating policy enforcement during review or evaluation

---

## Scalability & Future Improvements
This RBAC design is scalable and can be extended by:
- Adding new roles or permissions
- Moving permissions to a database
- Introducing policy-based access control (PBAC)
- Integrating middleware-based RBAC enforcement

---

## Summary
- RBAC ensures secure and controlled access
- Backend APIs enforce permissions strictly
- Frontend reflects role-based visibility
- Logging provides transparency and auditability

This implementation forms a strong foundation for secure, role-aware applications.


# Error & Loading States (Next.js App Router)

## 📌 Overview

This assignment focuses on improving user experience in a Next.js application by properly handling **asynchronous states** such as **loading** and **error**. Instead of showing blank screens or crashing the app when data is slow or fails to load, we use Next.js App Router features to display friendly fallback UIs.

The goal is to ensure that users always understand what is happening in the app, even when things go wrong.

---

## ❓ Why Handling Loading & Error States Is Important

When an application fetches data from an API:

* There can be **network delays**
* The API might **fail or return errors**

If these situations are not handled properly:

* Users may see a blank page
* The app may crash suddenly
* Users may lose trust in the application

By adding **loading skeletons** and **error boundaries**, we:

* Communicate progress clearly
* Handle failures gracefully
* Allow users to retry actions without refreshing the page

---

## 🛠️ Technologies Used

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **JavaScript**

---

## 📂 Folder Structure Used

```
app/
 └─ users/
     ├─ page.js      // Main page that fetches data
     ├─ loading.js   // Loading skeleton UI
     ├─ error.js     // Error boundary UI with retry
```

---

## ⏳ Loading State Implementation

### What was done

* A `loading.js` file was created inside the route folder.
* This file automatically renders when the page is waiting for data.
* Skeleton UI was created using Tailwind CSS and `animate-pulse`.

### How loading was tested

* An artificial delay of 2 seconds was added using `setTimeout`.
* Fetch caching was disabled to ensure the loader is visible.

### Result

* Users see a skeleton layout while data is loading.
* No blank screen is shown during the delay.

---

## ❌ Error State Implementation

### What was done

* An `error.js` file was added in the same route folder.
* The component uses `'use client'` and receives `error` and `reset` props.
* A friendly error message and a **Try Again** button are shown.

### How error was tested

* Errors were intentionally thrown during data fetching.
* Incorrect API URLs were also used temporarily.

### Retry behavior

* Clicking **Try Again** calls the `reset()` function.
* The route re-renders and attempts to fetch data again.

---

## 🔁 Testing & Verification

The following states were tested and verified:

1. **Loading State**

   * Skeleton UI visible during delay

2. **Error State**

   * Custom error UI displayed instead of app crash

3. **Retry State**

   * Data successfully loads after clicking retry

Screenshots and recordings were captured for all states as evidence.

---

## ✅ Conclusion

By using Next.js App Router features like `loading.js` and `error.js`, the application gracefully handles asynchronous operations. This ensures a smooth and user-friendly experience even when data is slow or errors occur.

This assignment demonstrates a complete understanding of fallback UIs, error boundaries, and resilient UI d
