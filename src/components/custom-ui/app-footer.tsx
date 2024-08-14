import Link from 'next/link';
import ThemeSwitch from './theme-switch';
import React, { Fragment } from 'react';
import { MenuLinksList } from '@/types/app-interface';

export default function AppFooter() {

    const menuList: MenuLinksList[] = [
        {
            label: "Important links",
            links: [
                { label: 'career', href: '/career' },
                { label: 'about-me', href: '/about-me' },
                { label: 'blog', href: '/blog' },
                { label: 'contact-us', href: '/contact-us' },
                { label: 'projects', href: '/projects' },
            ],
        },
        {
            label: "services",
            links: [
                { label: 'branding', href: '/services/branding' },
                { label: 'development', href: '/services/development' },
                { label: 'ux-design', href: '/services/ux-design' },
                { label: 'visual-design', href: '/services/visual-design' },
            ],
        },
        {
            label: "Contact Us",
            links: [
                { label: 'projects', href: '/projects' },
                { label: 'projects', href: '/projects' },
                { label: 'projects', href: '/projects' },
                { label: 'projects', href: '/projects' },
            ],
        },
        {
            label: "projects asdsds",
            links: <ThemeSwitch />,
        },
    ];

    return (
        <div className="footer">
            <div className="container">
                <div className="flex flex-row justify-between space-y-0 space-x-10">
                    {menuList.map((menu, index) => (
                        <div key={index}>
                            {/* <h3>{menu.label}</h3> */}
                            {Array.isArray(menu.links) ? (
                                <Fragment>
                                    <h3>{menu.label}</h3>
                                    <ul>
                                        {menu.links.map((link, idx) => (
                                            <li key={idx}>
                                                <a href={link.href}>{link.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Fragment>
                            ) : typeof menu.links === 'string' ? (
                                <div>{typeof menu.links === 'string' ? <Link href={menu.links}>{menu.label}</Link> : JSON.stringify(menu.links)}</div>
                            ) : React.isValidElement(menu.links) ? (
                                <div>{menu.label} {menu.links}</div>
                            ) : (
                                <div>{menu.label} {JSON.stringify(menu.links)}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
