export default function stripTags(html?: string): string {
    return !!html ? html.replace(/(<[^>]+>)/ig, "") : "";
};