import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.ts';

async function main() {
  console.log('Seeding admin...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Admin created:', admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });