import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load() {
    const posts = await prisma.blogPost.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return { posts };
}