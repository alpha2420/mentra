const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Connection successful');
        const userCount = await prisma.user.count();
        console.log(`✅ Found ${userCount} users`);
    } catch (e) {
        console.error('❌ Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
