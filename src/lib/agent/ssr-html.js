/**
 * Strip scripts/styles and tags for agent-readiness checks on raw HTML (no JS).
 */
export function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
}

export function documentTextLength(html) {
  const stripped = stripScriptsAndStyles(html);
  const text = stripped
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length;
}

/** First h1 text (including nested markup). */
export function firstHeadingText(html) {
  const stripped = stripScriptsAndStyles(html);
  const match = stripped.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return "";
  return match[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
