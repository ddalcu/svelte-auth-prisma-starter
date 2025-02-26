import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()

export async function GET() {
    const posts = await prisma.blogPost.findMany()
    return new Response(JSON.stringify(posts), { status: 200 })
}

export async function POST({ request }) {
    const { title, content, authorId } = await request.json()
    const post = await prisma.blogPost.create({
        data: {
            title,
            content,
            authorId
        }
    })
    return new Response(JSON.stringify(post), { status: 201 })
}

export async function PUT({ request }) {
    const { id, title, content, authorId } = await request.json()
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (post?.authorId !== authorId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }
    const updatedPost = await prisma.blogPost.update({
        where: { id },
        data: { title, content }
    })
    return new Response(JSON.stringify(updatedPost), { status: 200 })
}

export async function DELETE({ request }) {
    const { id, authorId } = await request.json()
    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (post?.authorId !== authorId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }
    await prisma.blogPost.delete({
        where: { id }
    })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
}
