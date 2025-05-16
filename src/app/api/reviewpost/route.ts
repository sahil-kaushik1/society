import { NextResponse } from 'next/server';
import prisma from '@/app/db'; // Update this path based on your project structure

export async function GET() {
    try {
        const unsolvedPosts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ posts: unsolvedPosts }, { status: 200 });
    } catch (error) {
        console.error('[GET_UNSOLVED_POSTS_ERROR]', error);
        return NextResponse.json({ error: 'Failed to fetch unsolved posts' }, { status: 500 });
    }
}
