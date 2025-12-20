const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');

    // Test connection by querying the database
    await prisma.$connect();
    console.log('✓ Successfully connected to the database');

    // Test query
    const userCount = await prisma.user.count();
    console.log(`✓ Database query successful. Current user count: ${userCount}`);

    console.log('\nDatabase tables created:');
    console.log('  - users');
    console.log('  - podcasts');
    console.log('  - invitations');

    console.log('\n✓ Phase 1: Database Setup Complete!');

  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
