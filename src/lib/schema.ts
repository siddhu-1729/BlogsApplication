// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export  const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const Post = pgTable("Post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  // published: boolean("published").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  categories: text("categories").notNull(),
});

