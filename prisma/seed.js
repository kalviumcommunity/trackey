import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Yashika",
      email: "yashika@trackey.com",
    },
  });

  const todo = await prisma.status.create({
    data: { name: "Todo" },
  });

  const done = await prisma.status.create({
    data: { name: "Done" },
  });

  const project = await prisma.project.create({
    data: {
      title: "Trackey MVP",
      userId: user.id,
    },
  });

  const task = await prisma.task.create({
    data: {
      title: "Design Database Schema",
      description: "PostgreSQL schema for Trackey app",
      userId: user.id,
      projectId: project.id,
      statusId: todo.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Initial schema setup completed",
      taskId: task.id,
      userId: user.id,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
