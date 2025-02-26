import type { RequestHandler } from '@sveltejs/kit'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET: RequestHandler = async () => {
	const posts = await prisma.blogPost.findMany()
	return new Response(JSON.stringify(posts), { status: 200 })
}

export const POST: RequestHandler = async ({ request }) => {
	const { title, content, authorId } = await request.json() as { title: string; content: string; authorId: string }
	const post = await prisma.blogPost.create({
		data: { title, content, authorId }
	})
	return new Response(JSON.stringify(post), { status: 201 })
}

export const PUT: RequestHandler = async ({ request }) => {
	const { id, title, content, authorId } = await request.json() as { id: string; title: string; content: string; authorId: string }
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

export const DELETE: RequestHandler = async ({ request }) => {
	const { id, authorId } = await request.json() as { id: string; authorId: string }
	const post = await prisma.blogPost.findUnique({ where: { id } })
	if (post?.authorId !== authorId) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
	}
	await prisma.blogPost.delete({ where: { id } })
	return new Response(JSON.stringify({ success: true }), { status: 200 })
}
