import bcrypt from 'bcrypt';
import prisma from '@/config/database';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const { name, email, mobile, password } = await req.json();

        if (!name || !email || !mobile || !password) {
            return NextResponse.json({
                success: false,
                status: 422,
                message: 'Not Valid Data',
            }, { status: 422 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({
                success: false,
                status: 409,
                message: 'An account with this email already exists.',
            }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                mobile,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            success: true,
            status: 201,
            message: 'User created successfully',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
                createdAt: newUser.createdAt,
            },
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
