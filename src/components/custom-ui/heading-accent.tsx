// Renders a heading with one word/phrase highlighted in the primary colour.
export function HeadingAccent({ text, accent }: { text: string; accent?: string | null }) {
    if (!accent || !text.includes(accent)) {
        return <>{text}</>;
    }

    const [before, ...rest] = text.split(accent);
    const after = rest.join(accent);

    return (
        <>
            {before}
            <span className="text-primary">{accent}</span>
            {after}
        </>
    );
}
