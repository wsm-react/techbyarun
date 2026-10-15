"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await signIn('credentials', { email, password, redirect: false });

        setLoading(false);
        if (res?.ok) {
            router.push('/admin');
            router.refresh();
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-sm">
                <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
                <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your site content.</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-primary">← Back to site</Link>
                </p>
            </div>
        </main>
    );
}
