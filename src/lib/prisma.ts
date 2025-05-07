//In a Next.js environment, it’s important to avoid creating multiple instances of the Prisma Client. Use a singleton pattern to reuse the same instance.
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Ensure the PrismaClient instance is not recreated in development
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
