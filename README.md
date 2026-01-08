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