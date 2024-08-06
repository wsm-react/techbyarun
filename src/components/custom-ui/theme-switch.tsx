"use client"

import { LaptopMinimal, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useState, useEffect } from 'react'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme, theme } = useTheme();

    useEffect(() => setMounted(true), [])

    const [currentTheme, setCurrentTheme] = useState<string>(resolvedTheme || 'dark');

    useEffect(() => {
        if (resolvedTheme) {
            setCurrentTheme(resolvedTheme);
            updateThemeColor(resolvedTheme);
        }
    }, [resolvedTheme]);

    // console.log(theme);

    const handleThemeChange = (newTheme: string) => {
        // console.log(newTheme);

        setTheme(newTheme);
        setCurrentTheme(newTheme);
        updateThemeColor(newTheme);
    };

    const updateThemeColor = (newTheme: string) => {
        // console.log(newTheme);

        const themeColor = newTheme === 'dark' ? '#000000' : '#ffffff';
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const metaBarColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

        if (metaThemeColor && metaBarColor) {
            metaThemeColor.setAttribute('content', themeColor);
            metaBarColor.setAttribute('content', newTheme);
        }
    };

    useEffect(() => {
        updateThemeColor(currentTheme);
    }, [currentTheme]);

    // console.log(currentTheme);


    if (!mounted) return (
        // <Image
        //     src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        //     width={20}
        //     height={20}
        //     sizes="36x36"
        //     alt="Loading Light/Dark Toggle"
        //     priority={false}
        //     title="Loading Light/Dark Toggle"
        // />
        <LaptopMinimal className='w-6 h-6 focus-visible:ring-[none] cursor-pointer text-white font-bold transition-all rounded-full p-1' />
    )

    if (currentTheme === 'dark') {
        return <Sun className='w-6 h-6 focus-visible:ring-[none] cursor-pointer text-white bg-blue-600 font-bold transition-all rounded-full p-1' onClick={() => handleThemeChange('light')} />
    }

    if (currentTheme === 'light') {
        return <Moon className='w-6 h-6 focus-visible:ring-[none] cursor-pointer text-white  bg-slate-600 font-bold transition-all rounded-full p-1' onClick={() => handleThemeChange('dark')} />
    }

}
