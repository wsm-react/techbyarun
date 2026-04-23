import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

import { ThemeProvider } from '@/helpers/theme-provider';
import { FontBarlow, FontInter, FontPoppins, FontRoboto } from '@/helpers/fonts';

export const metadata: Metadata = {
  title: "TechByArun",
  description: "TechByArun – Design, Development & Branding services.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FontInter.variable} ${FontRoboto.variable} ${FontPoppins.variable} ${FontBarlow.variable}`} suppressHydrationWarning>
        <ThemeProvider defaultTheme={"dark"} attribute="class" enableSystem={true}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
