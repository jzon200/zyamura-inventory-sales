import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const USER_DATA = [
  { username: "admin", password: "adminpass", isAdmin: true },
  { username: "edzon", password: "mypass" },
];

async function main() {
  for (const u of USER_DATA) {
    const hashedPassword = await hash(u.password, 12);

    await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
