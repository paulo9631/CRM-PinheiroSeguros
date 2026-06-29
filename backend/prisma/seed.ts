import { prisma } from '../src/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = 'valcelio@pinheiroseguros.com';
  const password = 'Mudar123';
  const password_hash = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Valcélio Pinheiro',
        email: adminEmail,
        password_hash,
        role: 'ADMIN',
      }
    });
    console.log(`Admin user created: ${adminEmail} / ${password}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
