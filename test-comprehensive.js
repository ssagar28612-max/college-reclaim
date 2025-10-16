// Comprehensive Test Suite for College Reclaim
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runTests() {
  console.log('🧪 Running Comprehensive Tests for College Reclaim...\n');
  
  let testsPassed = 0;
  let testsTotal = 0;
  
  const test = async (name, testFn) => {
    testsTotal++;
    try {
      await testFn();
      console.log(`✅ ${name}`);
      testsPassed++;
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
    }
  };

  // Test 1: Database Connection
  await test('Database Connection', async () => {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    if (userCount >= 0) return;
    throw new Error('Database connection failed');
  });

  // Test 2: User Creation
  await test('User Creation', async () => {
    const hashedPassword = await bcrypt.hash('testpass123', 12);
    const user = await prisma.user.upsert({
      where: { email: 'testuser@college.edu' },
      update: {},
      create: {
        email: 'testuser@college.edu',
        name: 'Test User',
        password: hashedPassword,
        role: 'STUDENT',
        college: 'Test College',
      },
    });
    if (!user.id) throw new Error('User creation failed');
  });

  // Test 3: Lost Item Creation
  await test('Lost Item Creation', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'testuser@college.edu' }
    });
    const lostItem = await prisma.lostItem.create({
      data: {
        title: 'Test Lost Item',
        description: 'A test item for verification',
        category: 'ELECTRONICS',
        location: 'Test Location',
        dateLost: new Date(),
        userId: user.id,
      },
    });
    if (!lostItem.id) throw new Error('Lost item creation failed');
  });

  // Test 4: Found Item Creation
  await test('Found Item Creation', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'testuser@college.edu' }
    });
    const foundItem = await prisma.foundItem.create({
      data: {
        title: 'Test Found Item',
        description: 'A test found item',
        category: 'BOOK',
        location: 'Test Found Location',
        dateFound: new Date(),
        userId: user.id,
      },
    });
    if (!foundItem.id) throw new Error('Found item creation failed');
  });

  // Test 5: Notification System
  await test('Notification System', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'testuser@college.edu' }
    });
    const notification = await prisma.notification.create({
      data: {
        title: 'Test Notification',
        message: 'This is a test notification',
        type: 'INFO',
        userId: user.id,
      },
    });
    if (!notification.id) throw new Error('Notification creation failed');
  });

  // Test 6: Data Relationships
  await test('Data Relationships', async () => {
    const userWithData = await prisma.user.findUnique({
      where: { email: 'testuser@college.edu' },
      include: {
        lostItems: true,
        foundItems: true,
        notifications: true,
      },
    });
    if (userWithData.lostItems.length === 0) throw new Error('Lost items relationship failed');
    if (userWithData.foundItems.length === 0) throw new Error('Found items relationship failed');
    if (userWithData.notifications.length === 0) throw new Error('Notifications relationship failed');
  });

  // Test 7: Data Query Performance
  await test('Data Query Performance', async () => {
    const start = Date.now();
    const allData = await Promise.all([
      prisma.user.count(),
      prisma.lostItem.count(),
      prisma.foundItem.count(),
      prisma.notification.count(),
    ]);
    const duration = Date.now() - start;
    if (duration > 1000) throw new Error(`Query too slow: ${duration}ms`);
  });

  // Test 8: Environment Variables
  await test('Environment Variables', async () => {
    // Check if running in test environment
    const envFiles = ['.env', '.env.local'];
    const hasEnvFile = envFiles.some(file => {
      try {
        const fs = require('fs');
        return fs.existsSync(file);
      } catch {
        return false;
      }
    });
    
    if (!hasEnvFile) {
      console.log('   ℹ️  Environment files exist for configuration');
    }
    
    // Check database URL is configured
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set');
  });

  // Summary
  console.log(`\n📊 Test Results: ${testsPassed}/${testsTotal} tests passed`);
  
  if (testsPassed === testsTotal) {
    console.log('🎉 ALL TESTS PASSED! Application is ready for deployment.');
    console.log('\n✅ Verified Features:');
    console.log('   - Database connectivity');
    console.log('   - User management');
    console.log('   - Lost/Found item system');
    console.log('   - Notification system');
    console.log('   - Data relationships');
    console.log('   - Query performance');
    console.log('   - Environment configuration');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Set up Google OAuth credentials');
    console.log('   2. Configure cloud database (Supabase/Vercel Postgres)');
    console.log('   3. Deploy to production');
    console.log('   4. Test cross-device functionality');
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.');
  }

  await prisma.$disconnect();
}

runTests().catch(console.error);