import { createHash } from 'node:crypto';
import { PrismaClient, UserStatus, UserType } from '@prisma/client';
import type { PaymentMethodCode } from '@gym/types';

const prisma = new PrismaClient();

function hashPassword(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

async function upsertAdminUser(): Promise<void> {
  await prisma.user.upsert({
    where: { email: 'admin@gym.local' },
    update: {
      firstName: 'Admin',
      lastName: 'Gym',
      status: UserStatus.active,
    },
    create: {
      firstName: 'Admin',
      lastName: 'Gym',
      email: 'admin@gym.local',
      passwordHash: hashPassword('changeme123'),
      userType: UserType.admin,
      status: UserStatus.active,
    },
  });
}

async function upsertPaymentMethods(): Promise<void> {
  const methods: ReadonlyArray<{ code: PaymentMethodCode; name: string }> = [
    { code: 'cash', name: 'Especes' },
    { code: 'card', name: 'Carte' },
    { code: 'transfer', name: 'Virement' },
    { code: 'cheque', name: 'Cheque' },
  ];

  for (const method of methods) {
    await prisma.paymentMethod.upsert({
      where: { code: method.code },
      update: { name: method.name, isActive: true },
      create: { code: method.code, name: method.name, isActive: true },
    });
  }
}

async function upsertSettings(): Promise<void> {
  const settings = [
    {
      key: 'booking.cancel_cutoff_hours',
      groupName: 'booking',
      value: 6,
      description: 'Nombre d\'heures minimum avant debut du cours pour annuler.',
    },
    {
      key: 'access.allow_partial_payment_access',
      groupName: 'access',
      value: false,
      description: 'Autoriser l\'acces si paiement partiel.',
    },
    {
      key: 'invoice.prefix',
      groupName: 'invoice',
      value: 'GYM',
      description: 'Prefixe des factures.',
    },
    {
      key: 'invoice.next_number',
      groupName: 'invoice',
      value: 1,
      description: 'Prochain numero sequentiel de facture.',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        groupName: setting.groupName,
        description: setting.description,
      },
      create: {
        key: setting.key,
        value: setting.value,
        groupName: setting.groupName,
        description: setting.description,
      },
    });
  }
}

async function main(): Promise<void> {
  await upsertAdminUser();
  await upsertPaymentMethods();
  await upsertSettings();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    process.stderr.write(`${String(error)}\n`);
    await prisma.$disconnect();
    process.exit(1);
  });
