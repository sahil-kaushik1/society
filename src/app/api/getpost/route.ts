import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/db';
import { z } from 'zod';

// Define validation schema
const schema = z.object({
    mobile: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits."),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
        }

        const { mobile } = parsed.data;

        // Query all visits for this mobile number
        const visits = await prisma.post.findMany({
            where: { Mobile: mobile },
            orderBy: { createdAt: 'desc' }, // Optional: newest first
        });

        return NextResponse.json({ visits }, { status: 200 });

    } catch (error) {
        console.error('[VISITOR_LOOKUP_ERROR]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
