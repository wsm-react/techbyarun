import { NextRequest, NextResponse } from 'next/server';
import { appDB } from '@/lib/database';
import { connectToDatabase } from '@/helpers/server-helper';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { name, email, mobile, password } = await req.json();
        // console.log(name, email, mobile, password);

        if (!name || !email || !mobile || !password) {
            return NextResponse.json({
                success: false,
                status: 422,
                message: 'Not Valid Data',
            }, { status: 422 });
        }

        await connectToDatabase();

        const newUser = await appDB.user.create({
            data: {
                name: name,
                email: email,
                mobile: mobile,
                password: password
            },
        });

        // console.log(newUser);


        return NextResponse.json({
            success: true,
            status: 201,
            message: 'User created successfully',
            data: newUser,
        }, { status: 201 });

    } catch (error: any) {
        // console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message || "Internal server error",
        }, { status: 500 });

    } finally {
        // appDB.$disconnect();
    }
}
