// Test data persistence across devices
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testDataPersistence() {
  console.log('🧪 Testing Data Persistence for College Reclaim...');
  
  try {
    // Test user creation
    const hashedPassword = await bcrypt.hash('test123', 12);
    
    const testUser = await prisma.user.upsert({
      where: { email: 'test@college.edu' },
      update: {},
      create: {
        email: 'test@college.edu',
        name: 'Test Student',
        password: hashedPassword,
        role: 'STUDENT',
        college: 'Test University',
      },
    });
    
    console.log('✅ Test user created:', testUser.email);
    
    // Test lost item creation
    const lostItem = await prisma.lostItem.create({
      data: {
        title: 'iPhone 15 Pro',
        description: 'Black iPhone with cracked screen protector',
        category: 'ELECTRONICS',
        location: 'Library Study Room 3',
        dateLost: new Date(),
        userId: testUser.id,
      },
    });
    
    console.log('✅ Lost item created:', lostItem.title);
    
    // Test found item creation
    const foundItem = await prisma.foundItem.create({
      data: {
        title: 'Blue Water Bottle',
        description: 'Stainless steel water bottle with university logo',
        category: 'OTHER',
        location: 'Cafeteria Table 12',
        dateFound: new Date(),
        userId: testUser.id,
      },
    });
    
    console.log('✅ Found item created:', foundItem.title);
    
    // Test notification creation
    const notification = await prisma.notification.create({
      data: {
        title: 'Welcome to College Reclaim!',
        message: 'Your test account has been set up successfully.',
        type: 'INFO',
        userId: testUser.id,
      },
    });
    
    console.log('✅ Notification created:', notification.title);
    
    // Query all data to verify persistence
    const allUsers = await prisma.user.count();
    const allLostItems = await prisma.lostItem.count();
    const allFoundItems = await prisma.foundItem.count();
    const allNotifications = await prisma.notification.count();
    
    console.log('\n📊 Data Summary:');
    console.log(`👥 Users: ${allUsers}`);
    console.log(`🔍 Lost Items: ${allLostItems}`);
    console.log(`✨ Found Items: ${allFoundItems}`);
    console.log(`🔔 Notifications: ${allNotifications}`);
    
    console.log('\n🎉 SUCCESS! Data is being stored and persisted.');
    console.log('💡 To test cross-device access:');
    console.log('   1. Set up Supabase (see GOOGLE-OAUTH-SETUP.md)');
    console.log('   2. Update DATABASE_URL to Supabase connection string');
    console.log('   3. Run this test again to verify cloud storage');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDataPersistence();