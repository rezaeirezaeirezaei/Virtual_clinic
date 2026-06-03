import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create specialties
  const specialties = await Promise.all([
    prisma.specialty.upsert({
      where: { name: 'General Practice' },
      update: {},
      create: { name: 'General Practice' },
    }),
    prisma.specialty.upsert({
      where: { name: 'Cardiology' },
      update: {},
      create: { name: 'Cardiology' },
    }),
    prisma.specialty.upsert({
      where: { name: 'Dermatology' },
      update: {},
      create: { name: 'Dermatology' },
    }),
    prisma.specialty.upsert({
      where: { name: 'Pediatrics' },
      update: {},
      create: { name: 'Pediatrics' },
    }),
  ]);

  console.log(`✅ Created ${specialties.length} specialties`);

  // Create test doctor
  const doctorUser = await prisma.user.upsert({
    where: { phone: '9121234567' },
    update: {},
    create: {
      phone: '9121234567',
      role: UserRole.DOCTOR,
      doctorProfile: {
        create: {
          name: 'دکتر علی محمدی',
          specialties: [specialties[0].id, specialties[1].id],
        },
      },
    },
  });

  console.log(`✅ Created doctor: ${doctorUser.phone}`);

  // Create test patient
  const patientUser = await prisma.user.upsert({
    where: { phone: '9109876543' },
    update: {},
    create: {
      phone: '9109876543',
      role: UserRole.PATIENT,
      patientProfile: {
        create: {
          name: 'محمد حسین پور',
          dateOfBirth: new Date('1990-05-15'),
          gender: 'M',
          address: 'تهران',
        },
      },
    },
  });

  console.log(`✅ Created patient: ${patientUser.phone}`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
