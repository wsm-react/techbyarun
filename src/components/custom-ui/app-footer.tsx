import Link from 'next/link';
import ThemeSwitch from './theme-switch';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconBrandInstagram, IconMail } from '@tabler/icons-react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about-me' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Career', href: '/career' },
    { label: 'Contact Us', href: '/contact-us' },
];

const serviceLinks = [
    { label: 'Branding', href: '/services/branding' },
    { label: 'Development', href: '/services/development' },
    { label: 'UX Design', href: '/services/ux-design' },
    { label: 'Visual Design', href: '/services/visual-design' },
];

const caseStudyLinks = [
    { label: 'Get Down Fitness', href: '/case-study/getdownfitness' },
    { label: 'School Info Tech', href: '/case-study/schoolinfotech' },
    { label: 'UX Design Study', href: '/case-study/ux-design' },
    { label: 'Visual Design Study', href: '/case-study/visual-design' },
];

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: IconBrandGithub },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: IconBrandLinkedin },
    { label: 'X / Twitter', href: 'https://x.com', icon: IconBrandX },
    { label: 'Instagram', href: 'https://instagram.com', icon: IconBrandInstagram },
    { label: 'Email', href: 'mailto:hello@techbyarun.com', icon: IconMail },
];

export default function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
                            TechByArun
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Design, development & branding services crafted with purpose. Building digital experiences that inspire.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                        <div className="pt-1">
                            <ThemeSwitch />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {quickLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Services
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {serviceLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Case Studies */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Case Studies
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {caseStudyLinks.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        &copy; {currentYear} TechByArun. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                        <Link href="/contact-us" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="/career" className="hover:text-primary transition-colors">Careers</Link>
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
