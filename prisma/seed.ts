import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import data from "./MOCK_DATA.json";
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);
  for (const item of data) {
    await prisma.user.create({
      data: {
        ...item,
        password,
      },
    });
  }
}

main().catch((err) => console.error(err));
