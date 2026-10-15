import Link from 'next/link';
import { IconMail, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

const contactInfo = [
    { icon: IconMail, label: 'Email', value: 'techbyarun@gmail.com', href: 'mailto:techbyarun@gmail.com' },
    { icon: IconBrandLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/techbyarun', href: 'https://linkedin.com' },
    { icon: IconBrandGithub, label: 'GitHub', value: 'github.com/techbyarun', href: 'https://github.com' },
];

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Header */}
            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    Contact
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Let&apos;s <span className="text-primary">Connect</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Have a project in mind, a question, or just want to say hello? Reach out and I&apos;ll get back to you promptly.
                </p>
            </section>

            {/* Contact info cards */}
            <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:border-primary hover:shadow-md"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon size={20} />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">{label}</p>
                            <p className="text-sm font-semibold">{value}</p>
                        </div>
                    </Link>
                ))}
            </section>

            {/* Form CTA */}
            <section className="mx-auto max-w-4xl px-6 pb-24">
                <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
                    <h2 className="text-2xl font-bold">Send a Message</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Fill in your details and I&apos;ll respond within 24 hours.
                    </p>
                    <Link
                        href="/coffee-with-me"
                        className="mt-6 inline-block rounded-full border border-border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                    >
                        Coffee with me instead →
                    </Link>
                </div>
            </section>

        </main>
    );
}
