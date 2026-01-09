---

## Project Overview

**Trackey** is a task and project management application designed to help users organize projects, track tasks, assign statuses, and collaborate using comments.

This assignment  focuses on **database schema design**, **relationships**, **constraints**, and **normalization** using **PostgreSQL** and **Prisma ORM**.

--

## Tech Stack

* **Database**: PostgreSQL
* **ORM**: Prisma
* **Backend: Next.js
* **Tooling**: Prisma Studio

---

## Entities (Tables)

### 1. User

Represents a registered user of Trackey.

* `id` (Primary Key)
* `name`
* `email` (Unique)
* `createdAt`

A user can create multiple projects and comments.

---

### 2. Project

Represents a project created by a user.

* `id` (Primary Key)
* `name`
* `description`
* `userId` (Foreign Key → User)
* `createdAt`

A project belongs to one user and contains many tasks.

---

### 3. Task

Represents an individual task within a project.

* `id` (Primary Key)
* `title`
* `description`
* `projectId` (Foreign Key → Project)
* `statusId` (Foreign Key → Status)
* `createdAt`

A task belongs to one project and has one status.

---

### 4. Status

Represents the status of a task (e.g., Todo, In Progress, Done).

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