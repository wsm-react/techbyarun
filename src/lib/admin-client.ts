// Small client-side helper for admin forms talking to the CRUD APIs.
export async function apiSend<T = unknown>(
    url: string,
    method: 'POST' | 'PUT' | 'DELETE',
    body?: unknown
): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
    try {
        const res = await fetch(url, {
            method,
            headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        const json = await res.json().catch(() => null);

        if (!res.ok || json?.success === false) {
            const message =
                typeof json?.message === 'string'
                    ? json.message
                    : json?.error ?? `Request failed (${res.status})`;
            return { ok: false, message };
        }

        return { ok: true, data: (json?.data ?? json) as T };
    } catch (error) {
        return { ok: false, message: error instanceof Error ? error.message : 'Network error' };
    }
}
