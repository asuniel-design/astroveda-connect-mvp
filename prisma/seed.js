const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Igniting Sovereign Seed Sequence...');
  
  const partner = await prisma.identity.upsert({
    where: { email: 'niel@astroveda.io' },
    update: {},
    create: {
      email: 'niel@astroveda.io',
      star: 'Rohini',
      place: 'Fort Worth',
      status: 'FULFILLED',
      apiKeys: {
        create: {
          key: 'ak_live_9fc8130a7fd3f183daa916b43db8fb7e42c4477c62a1670ad263389ad7554a38',
          tier: 'SOVEREIGN_ELITE'
        }
      }
    },
  });

  console.log('✅ B2B Vault Seeded: ' + partner.email);
}

main()
  .catch((e) => { 
    console.error(e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });
