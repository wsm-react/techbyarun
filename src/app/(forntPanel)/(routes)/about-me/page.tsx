import Link from 'next/link';

const skills = [
    'React / Next.js', 'TypeScript', 'Node.js', 'Prisma & MongoDB',
    'Figma & UX Design', 'Tailwind CSS', 'Firebase', 'REST APIs',
];

export default function AboutMePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Hero */}
            <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-primary mb-6">
                    About Me
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                    Hi, I&apos;m <span className="text-primary">Arun</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    A full-stack developer and designer passionate about building clean, performant digital products. I work across the full spectrum — from branding and UX to code and deployment.
                </p>
            </section>

            {/* Bio section */}
            <section className="mx-auto max-w-4xl px-6 pb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                    <p>
                        With years of experience crafting web applications and digital brands, I help businesses and individuals turn ideas into products that people love to use.
                    </p>
                    <p>
                        My work spans across startup MVPs, enterprise dashboards, e-commerce platforms, and brand identity systems. I care deeply about the details — both in design and in code.
                    </p>
                    <p>
                        When I&apos;m not building, I write about design, development, and the intersection of creativity and technology on my blog.
                    </p>
                </div>
                <div>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Skills & Tools</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium text-foreground"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-semibold">Want to collaborate?</h2>
                        <p className="text-sm text-muted-foreground mt-1">Let&apos;s build something meaningful together.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                            Get in Touch
                        </Link>
                        <Link href="/projects" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:bg-muted">
                            View Projects
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
