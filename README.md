# Trackey – Code Quality Setup

## 1️⃣ Project Overview
This project uses **Next.js 16**, **TypeScript**, **Tailwind CSS**, **ESLint**, **Prettier**, **Husky**, and **lint-staged**.  
The goal is to ensure **strict type safety**, **consistent code style**, and **automatic pre-commit checks** for high-quality code.

---

## 2️⃣ TypeScript Strict Mode

**tsconfig.json key settings:**
```json
{
  "strict": true,
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "forceConsistentCasingInFileNames": true
}
---

3️⃣ ESLint Setup
.eslintrc.json

json
Copy code
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "rules": {
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
---

4️⃣ Prettier Setup
.prettierrc

json
Copy code
{
  "singleQuote": false,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
---

python-repl
Copy code
.eslintrc.json 33ms
.prettierrc 7ms
app/page.tsx 8ms (unchanged)
...
5️⃣ Husky + lint-staged (Pre-commit Hooks)
package.json lint-staged section:

json
Copy code
"lint-staged": {
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}

---

6️⃣ How to Test Locally
Run dev server

bash
Copy code
npm run dev
Open http://localhost:3000 → verify pages load

Run lint

bash
Copy code
npm run lint
Check for warnings/errors

Test Prettier

bash
Copy code
npx prettier --write .
Code is automatically formatted

Test Husky + lint-staged

bash
Copy code
git add <file>
git commit -m "test husky"
Commit will fail if lint/prettier rules broken

Fix errors → commit will succeed

7️⃣ Final Notes
Strict TypeScript + ESLint + Prettier ensures high-quality, maintainable code

Husky + lint-staged improves team collaboration and code consistency

Screenshots and terminal logs above demonstrate fully functional setup

8️⃣ Deliverables Included
tsconfig.json

.eslintrc.json

.prettierrc

package.json

.husky/ folder with pre-commit hook



----

# Environment Variable Management (Next.js)

This project demonstrates secure and professional management of environment variables in a Next.js application. Sensitive configuration values are protected from client-side exposure, ensuring security, portability, and production readiness.

---


---

## 📌 Purpose

The purpose of environment variable management is to:
- Store sensitive data securely (API keys, database URLs, secrets)
- Prevent accidental exposure of secrets to the browser
- Enable easy setup across different environments (development, staging, production)

---

## 📁 Environment Files Used

The project uses the following environment files:

### `.env.local`
- Contains **actual credentials and secrets**
- Used only for local development
- **Never committed to GitHub**

### `.env.example`
- Template file listing all required environment variables
- Contains placeholder values and documentation
- Safe to commit and share with teammates

---

## 🖥️ Server-Side Environment Variables

These variables are available **only on the server** and must never be accessed inside client components.

| Variable | Description |
|--------|------------|
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET` | Secret key for authentication and token handling |

> These variables do **not** use the `NEXT_PUBLIC_` prefix, ensuring they remain private.

---

## 🌐 Client-Side Environment Variables

Client-side variables must start with `NEXT_PUBLIC_` to be safely exposed by Next.js.

| Variable | Description |
|--------|------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for frontend API requests |

> Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

---

## ⚙️ Setup Instructions

Follow these steps to configure environment variables:

1. Create a local environment file:
   ```bash
   cp .env.example .env.local
Replace placeholder values in .env.local with actual credentials.

Start the development server:

bash
Copy code
npm run dev