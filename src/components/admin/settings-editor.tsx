"use client";

import { useState } from 'react';
import { JsonArea } from '@/components/admin/fields';
import { apiSend } from '@/lib/admin-client';

type Row = {
    key: string;
    value: string;
    status: 'idle' | 'saving' | 'saved' | 'error';
    error: string | null;
};

export default function SettingsEditor({ settings }: { settings: { key: string; value: string }[] }) {
    const [rows, setRows] = useState<Row[]>(
        settings.map((s) => ({ ...s, status: 'idle', error: null }))
    );

    const updateRow = (key: string, patch: Partial<Row>) =>
        setRows((prev) => prev.map((row) => (row.key === key ? { ...row, ...patch } : row)));

    const onSave = async (row: Row) => {
        let parsed: unknown;
        try {
            parsed = JSON.parse(row.value);
        } catch {
            updateRow(row.key, { status: 'error', error: 'Invalid JSON — fix it before saving.' });
            return;
        }

        updateRow(row.key, { status: 'saving', error: null });

        const res = await apiSend(`/api/v1/site-settings/${row.key}`, 'PUT', { value: parsed });

        if (!res.ok) {
            updateRow(row.key, { status: 'error', error: res.message });
            return;
        }

        updateRow(row.key, { status: 'saved', error: null });
    };

    return (
        <div className="space-y-6">
            {rows.map((row) => (
                <div key={row.key} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-sm font-semibold text-primary">{row.key}</p>
                        <div className="flex items-center gap-4">
                            {row.status === 'saved' && <span className="text-xs font-medium text-green-600">Saved ✓</span>}
                            {row.status === 'error' && <span className="text-xs font-medium text-red-500">{row.error}</span>}
                            <button
                                onClick={() => onSave(row)}
                                disabled={row.status === 'saving'}
                                className="rounded-full bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                            >
                                {row.status === 'saving' ? 'Saving…' : 'Save'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <JsonArea
                            value={row.value}
                            onChange={(value) => updateRow(row.key, { value, status: 'idle', error: null })}
                            rows={10}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
