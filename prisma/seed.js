const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

// Demo users with Indian names
const demoUsers = [
  { name: 'Arjun Mehta', email: 'arjun.mehta@college.edu', password: 'Demo@123' },
  { name: 'Priya Sharma', email: 'priya.sharma@college.edu', password: 'Demo@123' },
  { name: 'Rajesh Kumar', email: 'rajesh.kumar@college.edu', password: 'Demo@123' },
  { name: 'Ananya Iyer', email: 'ananya.iyer@college.edu', password: 'Demo@123' },
  { name: 'Vikram Singh', email: 'vikram.singh@college.edu', password: 'Demo@123' },
  { name: 'Sneha Patel', email: 'sneha.patel@college.edu', password: 'Demo@123' },
]

// Demo lost items
const demoLostItems = [
  {
    title: 'Black Leather Wallet',
    description: 'Lost my black leather wallet near the library. Contains important IDs and some cash.',
    category: 'ACCESSORIES',
    location: 'Central Library',
    dateLost: new Date('2024-12-20'),
    contactPhone: '+919876543210',
  },
  {
    title: 'Blue JBL Headphones',
    description: 'Blue colored JBL wireless headphones. Lost them in the cafeteria during lunch.',
    category: 'ELECTRONICS',
    location: 'Main Cafeteria',
    dateLost: new Date('2024-12-22'),
    contactPhone: '+919876543211',
  },
  {
    title: 'HP Laptop Charger',
    description: 'HP 65W laptop charger with original cable. Left it in Computer Lab 3.',
    category: 'ELECTRONICS',
    location: 'Computer Lab 3',
    dateLost: new Date('2024-12-24'),
    contactPhone: '+919876543212',
  },
  {
    title: 'Red Nike Backpack',
    description: 'Red Nike backpack with laptop compartment. Contains notebooks and pens.',
    category: 'BAGS',
    location: 'Sports Complex',
    dateLost: new Date('2024-12-23'),
    contactPhone: '+919876543213',
  },
]

// Demo found items
const demoFoundItems = [
  {
    title: 'Student ID Card',
    description: 'Found a student ID card near the entrance gate. Name: Amit Verma, Roll: 20CS123',
    category: 'ID_CARD',
    location: 'Main Gate',
    dateFound: new Date('2024-12-21'),
    contactPhone: '+919876543214',
  },
  {
    title: 'Samsung Mobile Phone',
    description: 'Found a Samsung phone in the parking lot. Screen is locked. Please contact with proof.',
    category: 'ELECTRONICS',
    location: 'Parking Area',
    dateFound: new Date('2024-12-25'),
    contactPhone: '+919876543215',
  },
  {
    title: 'Silver Water Bottle',
    description: 'Silver colored steel water bottle found in the auditorium after the cultural event.',
    category: 'OTHER',
    location: 'Main Auditorium',
    dateFound: new Date('2024-12-24'),
    contactPhone: '+919876543216',
  },
  {
    title: 'Black Umbrella',
    description: 'Found a black umbrella near the admin block. Good condition.',
    category: 'OTHER',
    location: 'Admin Block',
    dateFound: new Date('2024-12-26'),
    contactPhone: '+919876543217',
  },
]

// Demo books
const demoBooks = [
  {
    title: 'Data Structures and Algorithms in Java',
    author: 'Robert Lafore',
    description: 'Complete guide to DSA. Good condition with minimal highlighting.',
    condition: 'GOOD',
    priceOrRent: 450,
    type: 'SELL',
    contactPhone: '+919876543218',
  },
  {
    title: 'Introduction to Machine Learning',
    author: 'Ethem Alpaydin',
    description: 'ML textbook for semester 6. Available for rent.',
    condition: 'LIKE_NEW',
    priceOrRent: 150,
    type: 'RENT',
    contactPhone: '+919876543219',
  },
  {
    title: 'Database Management Systems',
    author: 'Raghu Ramakrishnan',
    description: 'DBMS book with solved examples. Perfect for exams.',
    condition: 'GOOD',
    priceOrRent: 380,
    type: 'SELL',
    contactPhone: '+919876543220',
  },
  {
    title: 'Computer Networks - Tanenbaum',
    author: 'Andrew S. Tanenbaum',
    description: 'Classic networking book. Latest edition. Excellent condition.',
    condition: 'LIKE_NEW',
    priceOrRent: 200,
    type: 'RENT',
    contactPhone: '+919876543221',
  },
]

// Demo events
const demoEvents = [
  {
    title: 'Lost & Found Drive',
    description: 'Special drive to help students recover their lost items. Bring ID proof.',
    venue: 'Student Center',
    date: new Date('2025-01-05'),
    time: '10:00 AM',
    clubOrDept: 'Student Council',
    contactInfo: '+919876543222',
  },
  {
    title: 'Tech Fest 2025',
    description: 'Annual technical festival featuring coding competitions, robotics, and AI workshops.',
    venue: 'Engineering Block',
    date: new Date('2025-01-15'),
    time: '09:00 AM',
    clubOrDept: 'Tech Club',
    contactInfo: '+919876543223',
  },
  {
    title: 'Book Exchange Fair',
    description: 'Exchange or sell your old textbooks. Great opportunity to get books at discounted prices.',
    venue: 'Library Lawn',
    date: new Date('2025-01-10'),
    time: '11:00 AM',
    clubOrDept: 'Library Committee',
    contactInfo: '+919876543224',
  },
]

async function main() {
  console.log('Starting seed...')

  // Create demo users
  console.log('Creating demo users...')
  const createdUsers = []
  for (const user of demoUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        emailVerified: new Date(),
        role: 'STUDENT',
      },
    })
    createdUsers.push(createdUser)
    console.log(`Created user: ${createdUser.name}`)
  }

  // Create lost items
  console.log('\\nCreating lost items...')
  for (let i = 0; i < demoLostItems.length; i++) {
    const item = demoLostItems[i]
    const user = createdUsers[i % createdUsers.length]
    
    await prisma.lostItem.create({
      data: {
        ...item,
        userId: user.id,
        status: 'LOST',
      },
    })
    console.log(`Created lost item: ${item.title}`)
  }

  // Create found items
  console.log('\\nCreating found items...')
  for (let i = 0; i < demoFoundItems.length; i++) {
    const item = demoFoundItems[i]
    const user = createdUsers[(i + 1) % createdUsers.length]
    
    await prisma.foundItem.create({
      data: {
        ...item,
        userId: user.id,
        status: 'FOUND',
      },
    })
    console.log(`Created found item: ${item.title}`)
  }

  // Create books
  console.log('\\nCreating books...')
  for (let i = 0; i < demoBooks.length; i++) {
    const book = demoBooks[i]
    const user = createdUsers[(i + 2) % createdUsers.length]
    
    await prisma.book.create({
      data: {
        ...book,
        ownerUserId: user.id,
        available: true,
      },
    })
    console.log(`Created book: ${book.title}`)
  }

  // Create events
  console.log('\\nCreating events...')
  for (let i = 0; i < demoEvents.length; i++) {
    const event = demoEvents[i]
    const user = createdUsers[(i + 3) % createdUsers.length]
    
    await prisma.event.create({
      data: {
        ...event,
        postedByUserId: user.id,
      },
    })
    console.log(`Created event: ${event.title}`)
  }

  console.log('\\nSeed completed successfully!')
  console.log('\\n=== Demo Credentials ===')
  console.log('Email: arjun.mehta@college.edu')
  console.log('Password: Demo@123')
  console.log('(All demo users have the same password)')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
