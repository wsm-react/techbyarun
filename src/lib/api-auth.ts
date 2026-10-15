import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/v1/auth/[...nextauth]/auth-options';

export type SessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as SessionUser | undefined) ?? null;
}

/**
 * Guard for admin-only endpoints.
 * Returns `{ user }` when the caller is an authenticated admin,
 * otherwise `{ error }` containing the response to return.
 */
export async function assertAdmin(): Promise<
  { user: SessionUser; error: null } | { user: null; error: NextResponse }
> {
  const user = await getSessionUser();

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, status: 401, message: 'Authentication required.' },
        { status: 401 }
      ),
    };
  }

  if (user.role !== 'admin') {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, status: 403, message: 'Admin access required.' },
        { status: 403 }
      ),
    };
  }

  return { user, error: null };
}
