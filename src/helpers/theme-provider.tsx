"use client"

import { ThemeProvider as NextThemesProvider, useTheme, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    // const { resolvedTheme, theme } = useTheme()
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
