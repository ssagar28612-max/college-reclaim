const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setAdmin() {
  const adminEmail = 'collegereclaimjc@gmail.com'
  const adminPassword = 'Enixboi21'
  
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    if (existingUser) {
      // Update existing user to admin with password
      await prisma.user.update({
        where: { email: adminEmail },
        data: { 
          role: 'ADMIN',
          name: 'College Reclaim Admin',
          password: hashedPassword
        }
      })
      console.log(`✅ User ${adminEmail} updated to ADMIN role with password set`)
    } else {
      // Create new admin user
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'College Reclaim Admin',
          password: hashedPassword,
          role: 'ADMIN',
          emailVerified: new Date()
        }
      })
      console.log(`✅ Admin user created: ${adminEmail}`)
      console.log(`📝 Password: ${adminPassword}`)
    }
  } catch (error) {
    console.error('❌ Error setting admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setAdmin()
