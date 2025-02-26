import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load({ params }) {
    const post = await prisma.blogPost.findUnique({
        where: { id: params.id }
    });

    if (!post) {
        throw error(404, 'Post not found');
    }

    return { post };
}