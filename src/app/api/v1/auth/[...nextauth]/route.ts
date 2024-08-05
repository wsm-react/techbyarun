import { NextRequest, NextResponse } from 'next/server';
import NextAuth from "next-auth"
import { authOptions } from './auth-options';

const ApiAuthHandler = NextAuth(authOptions);

// for check requestes
export { ApiAuthHandler as GET, ApiAuthHandler as POST }
