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

* `id` (Primary Key)
* `name`

One status can be associated with multiple tasks.

---

### 5. Comment

Represents comments added to tasks by users.

* `id` (Primary Key)
* `content`
* `taskId` (Foreign Key → Task)
* `userId` (Foreign Key → User)
* `createdAt`

A comment belongs to one task and one user.

---

## Relationships Summary

* **User → Project**: One-to-Many
* **Project → Task**: One-to-Many
* **Status → Task**: One-to-Many
* **Task → Comment**: One-to-Many
* **User → Comment**: One-to-Many

---

## Keys and Constraints

### Primary Keys

* All tables use `id` as the primary key.

### Foreign Keys

* `Project.userId` → `User.id`
* `Task.projectId` → `Project.id`
* `Task.statusId` → `Status.id`
* `Comment.taskId` → `Task.id`
* `Comment.userId` → `User.id`

### Constraints

* `email` in **User** table is **UNIQUE**
* Required fields use **NOT NULL** constraints
* Referential integrity enforced via Prisma relations

---

## Normalization

### First Normal Form (1NF)

* All fields contain atomic values
* No repeating groups or multivalued attributes

### Second Normal Form (2NF)

* All non-key attributes depend on the full primary key

### Third Normal Form (3NF)

* No transitive dependencies
* Status and comments are stored in separate tables

The schema is fully normalized and avoids redundancy.

---

## Scalability and Design Benefits

* Clean separation of concerns
* Easy to extend with features like:

  * Task priority
  * Teams and roles
  * Activity logs
* Optimized querying using foreign keys

---

## Common Queries Supported

* Fetch all projects for a user
* Fetch all tasks under a project
* Filter tasks by status
* View comments for a task

---

## Prisma Commands Used

```bash
npx prisma migrate dev --name init_schema
npx prisma db seed
npx prisma studio
```

---

## Screenshots Included

* Prisma Studio showing all tables and relationships
* Terminal output of successful migration and seeding

---

## Conclusion

This schema efficiently models a real-world task management system while following database best practices, ensuring consistency, scalability, and maintainability.