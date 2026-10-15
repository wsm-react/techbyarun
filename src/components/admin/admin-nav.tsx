"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const links = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Case Studies', href: '/admin/case-studies' },
    { label: 'Blog', href: '/admin/blog' },
    { label: 'Settings', href: '/admin/settings' },
];

export default function AdminNav({ email }: { email?: string | null }) {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    return (
        <nav className="flex flex-wrap items-center gap-1">
            {links.map(({ label, href }) => (
                <Link
                    key={href}
                    href={href}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isActive(href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                >
                    {label}
                </Link>
            ))}
            {email && <span className="mx-2 hidden text-xs text-muted-foreground sm:inline">{email}</span>}
            <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
                Sign out
            </button>
        </nav>
    );
}
