import Link from 'next/link';

const highlights = [
    { label: 'Scope', value: 'Web Design · Development' },
    { label: 'Timeline', value: '12 weeks' },
    { label: 'Platform', value: 'Web App (Next.js + MongoDB)' },
    { label: 'Outcome', value: 'Serving 5 campuses, 3k+ users' },
];

export default function SchoolInfoTechPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">

            <section className="mx-auto max-w-4xl px-6 pt-24 pb-12">
                <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                <div className="mt-6 flex flex-wrap gap-2 mb-4">
                    {([
                        { label: 'Web Design', href: '/services/development' },
                        { label: 'Development', href: '/services/development' },
                    ] as { label: string; href: string }[]).map(({ label, href }) => (
                        <Link key={label} href={href} className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{label}</Link>
                    ))}
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                    School <span className="text-primary">Info Tech</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    A multi-campus educational information system — student records, staff dashboards, announcements, and a public-facing portal.
                </p>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {highlights.map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                ))}
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-24 space-y-10">
                <div>
                    <h2 className="text-xl font-bold mb-3">The Challenge</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        The institution was managing student data across spreadsheets and paper forms across five campuses. Communication was inconsistent and there was no centralised record system.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Process</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        I conducted stakeholder interviews across campuses to map the existing workflows, then designed a unified data model in Prisma + MongoDB. The admin UI was built with Next.js and role-based access control.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3">The Result</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A centralised platform now serves all five campuses, with over 3,000 active users. Admin workload for data entry dropped by over 60%.
                    </p>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/case-study" className="text-sm text-muted-foreground hover:text-primary transition-colors">← All Case Studies</Link>
                    <Link href="/contact-us" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Start a Similar Project
                    </Link>
                </div>
            </section>

        </main>
    );
}
