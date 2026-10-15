"use client";

// Shared form primitives for the admin panel (styled with the site's theme tokens).

const inputClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary';

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <div>
            <span className="text-sm font-medium">{label}</span>
            {children}
            {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
        </div>
    );
}

export function TextInput({
    value,
    onChange,
    placeholder,
    type = 'text',
    required,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={`mt-1 ${inputClass}`}
        />
    );
}

export function TextArea({
    value,
    onChange,
    rows = 3,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
}) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className={`mt-1 ${inputClass}`}
        />
    );
}

export function Checkbox({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
}) {
    return (
        <label className="flex items-center gap-2 text-sm font-medium">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 accent-primary"
            />
            {label}
        </label>
    );
}

export function JsonArea({
    value,
    onChange,
    rows = 8,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
}) {
    let error: string | null = null;
    if (value.trim() !== '') {
        try {
            JSON.parse(value);
        } catch (e) {
            error = e instanceof Error ? e.message : 'Invalid JSON';
        }
    }

    return (
        <div className="mt-1">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                spellCheck={false}
                placeholder={placeholder}
                className={`${inputClass} font-mono text-xs ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="mt-1 text-xs text-red-500">Invalid JSON: {error}</p>}
        </div>
    );
}
