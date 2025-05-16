import { NextResponse } from 'next/server';
import prisma from '@/app/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { Name, Flat_no, Purpose, Mobile } = body;

        // Validate input
        if (!Name || !Flat_no || !Purpose || !Mobile) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        if (!/^\d{10}$/.test(Mobile)) {
            return NextResponse.json({ error: 'Mobile number must be exactly 10 digits.' }, { status: 400 });
        }

        // Create the visitor entry
        const visitor = await prisma.post.create({
            data: {
                Name,
                Flat_no,
                Purpose,
                Mobile,
            },
        });

        return NextResponse.json({ message: 'Visitor registered successfully.', visitor }, { status: 201 });
    } catch (error) {
        console.error('[VISITOR_REGISTER_ERROR]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
