import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

async function main() {
  console.log('Seeding admin user...');

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: ADMIN_USERNAME,
    },
  });

  if (existingAdmin) {
    console.log('Admin already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.admin.create({
    data: {
      username: ADMIN_USERNAME,
      password: hashedPassword,
    },
  });

  console.log('Admin created successfully.');
  console.log({
    username: admin.username,
    password: ADMIN_PASSWORD,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });