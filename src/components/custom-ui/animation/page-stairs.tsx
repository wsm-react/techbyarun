"use client"

import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnmateStair from './anmi-stairs';


export default function StairAnimataionLoader() {
    const pathName = usePathname();

    return (
        <Fragment>
            <AnimatePresence mode="wait">
                <div key={pathName}>
                    <div className="h-screen w-screen fixed flex top-0 right-0 left-0 pointer-events-none z-40">
                        <AnmateStair />
                    </div>
                </div>
            </AnimatePresence>
        </Fragment>
    );
}
