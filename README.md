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

Screenshots/logs

----
# TRackey

TRackey is a commuter assistance platform aimed at improving the daily travel experience of local train passengers.  
The problem it addresses is the lack of structured, accessible, and real-time information for commuters, which often leads to confusion, delays, and inefficient travel decisions. This project lays the foundation for building a scalable solution to manage and present such information effectively.

---

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
