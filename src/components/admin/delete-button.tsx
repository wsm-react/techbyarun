"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiSend } from '@/lib/admin-client';

export default function DeleteButton({ url, confirmText = 'Delete this item?' }: { url: string; confirmText?: string }) {
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    const onClick = async () => {
        if (!window.confirm(confirmText)) return;

        setBusy(true);
        const res = await apiSend(url, 'DELETE');
        setBusy(false);

        if (!res.ok) {
            window.alert(res.message);
            return;
        }

        router.refresh();
    };

    return (
        <button
            onClick={onClick}
            disabled={busy}
            className="text-xs font-medium text-red-500 hover:underline disabled:opacity-50"
        >
            {busy ? 'Deleting…' : 'Delete'}
        </button>
    );
}
