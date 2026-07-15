import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartscreen.com' },
    update: {},
    create: {
      email: 'admin@smartscreen.com',
      password: hashedPassword,
      name: 'مدير النظام',
      role: 'ADMIN',
    },
  })
  console.log(`✅ Admin user: ${admin.email}`)

  // Create editor user
  const editorPass = await bcrypt.hash('editor123', 10)
  const editor = await prisma.user.upsert({
    where: { email: 'editor@smartscreen.com' },
    update: {},
    create: {
      email: 'editor@smartscreen.com',
      password: editorPass,
      name: 'محرر المحتوى',
      role: 'EDITOR',
    },
  })
  console.log(`✅ Editor user: ${editor.email}`)

  // Create groups
  const group1 = await prisma.group.create({
    data: { name: 'الإدارة', description: 'شاشات الإدارة والاستقبال', color: '#6366f1' },
  })
  const group2 = await prisma.group.create({
    data: { name: 'الكافيه', description: 'شاشات الكافيه', color: '#f59e0b' },
  })
  const group3 = await prisma.group.create({
    data: { name: 'المطعم', description: 'شاشات المطعم', color: '#10b981' },
  })
  console.log('✅ Groups created')

  // Create screens
  const screen1 = await prisma.screen.create({
    data: {
      name: 'شاشة الاستقبال الرئيسية',
      status: 'ONLINE',
      orientation: 'LANDSCAPE',
      location: 'الطابق الأرضي',
      groupId: group1.id,
      userId: admin.id,
      resolution: '1920x1080',
      tags: ['استقبال', 'رئيسية'],
    },
  })
  const screen2 = await prisma.screen.create({
    data: {
      name: 'شاشة الكافيه',
      status: 'ONLINE',
      orientation: 'LANDSCAPE',
      location: 'الطابق الأول',
      groupId: group2.id,
      userId: admin.id,
      resolution: '1920x1080',
      tags: ['كافيه', 'قهوة'],
    },
  })
  const screen3 = await prisma.screen.create({
    data: {
      name: 'شاشة المطعم',
      status: 'MAINTENANCE',
      orientation: 'PORTRAIT',
      location: 'الطابق الثاني',
      groupId: group3.id,
      userId: editor.id,
      resolution: '1080x1920',
      tags: ['مطعم', 'قائمة'],
    },
  })
  const screen4 = await prisma.screen.create({
    data: {
      name: 'شاشة الخروج',
      status: 'OFFLINE',
      orientation: 'LANDSCAPE',
      location: 'البوابة الرئيسية',
      groupId: group1.id,
      userId: admin.id,
      resolution: '1920x1080',
      tags: ['خروج', 'بوابة'],
    },
  })
  console.log('✅ Screens created')

  // Create devices
  await prisma.device.create({
    data: {
      name: 'جهاز شاشة الاستقبال',
      type: 'MONITOR',
      status: 'ONLINE',
      screenId: screen1.id,
      os: 'Ubuntu 22.04',
      version: '1.0.0',
      cpu: 25, ram: 45, temperature: 55,
      uptime: '99.9%',
    },
  })
  await prisma.device.create({
    data: {
      name: 'جهاز شاشة الكافيه',
      type: 'MONITOR',
      status: 'ONLINE',
      screenId: screen2.id,
      os: 'Android 12',
      version: '1.0.0',
      cpu: 30, ram: 50, temperature: 60,
      uptime: '99.5%',
    },
  })
  await prisma.device.create({
    data: {
      name: 'جهاز شاشة المطعم',
      type: 'PLAYER',
      status: 'DEGRADED',
      screenId: screen3.id,
      os: 'Raspberry Pi OS',
      version: '1.0.0',
      cpu: 78, ram: 85, temperature: 80,
      uptime: '97.2%',
    },
  })
  console.log('✅ Devices created')

  // Create sample content
  await prisma.content.create({
    data: {
      title: 'عرض ترحيبي',
      type: 'TEXT',
      body: 'أهلاً بكم في شركتنا',
      screenId: screen1.id,
      userId: admin.id,
      status: 'PUBLISHED',
      priority: 1,
    },
  })
  await prisma.content.create({
    data: {
      title: 'قائمة الكافيه الصباحية',
      type: 'IMAGE',
      screenId: screen2.id,
      userId: editor.id,
      status: 'PUBLISHED',
      priority: 2,
    },
  })
  console.log('✅ Content created')

  // Create approval requests
  await prisma.approvalRequest.create({
    data: {
      title: 'عرض الصباح الجديد',
      type: 'CONTENT',
      description: 'محتوى ترحيبي صباحي مع آية قرآنية واسم الشركة',
      priority: 'HIGH',
      screenName: 'شاشة الاستقبال',
      submittedById: editor.id,
    },
  })
  await prisma.approvalRequest.create({
    data: {
      title: 'فيديو ترويجي للصيف',
      type: 'VIDEO',
      description: 'فيديو ترويجي لعروض الصيف - 30 ثانية',
      priority: 'URGENT',
      screenName: 'شاشة الخروج',
      submittedById: editor.id,
    },
  })
  console.log('✅ Approval requests created')

  // Create notifications
  await prisma.notification.create({
    data: {
      title: 'مرحباً بك',
      message: 'تم إعداد النظام بنجاح. يمكنك البدء بإضافة الشاشات والمحتوى.',
      type: 'info',
      userId: admin.id,
    },
  })
  await prisma.notification.create({
    data: {
      title: 'شاشة الخروج غير متصلة',
      message: 'شاشة الخروج لم تتصل منذ ساعة. يرجى التحقق.',
      type: 'warning',
      userId: admin.id,
    },
  })
  console.log('✅ Notifications created')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📋 Login credentials:')
  console.log('   Admin:    admin@smartscreen.com / admin123')
  console.log('   Editor:   editor@smartscreen.com / editor123\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
