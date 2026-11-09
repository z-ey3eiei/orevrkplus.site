/** @typedef {{ type: string; q: number; specificity: number; position: number }} AcceptEntry */

/**
 * Parse RFC 9110 Accept header with q-values and specificity for negotiation.
 * @param {string | null} header
 * @returns {AcceptEntry[]}
 */
export function parseAccept(header) {
  if (!header) return [];
  return header
    .split(",")
    .map((raw, position) => {
      const parts = raw.trim().split(";").map((s) => s.trim());
      const type = parts[0]?.toLowerCase();
      if (!type) return null;
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split("=").map((s) => s.trim());
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity, position };
    })
    .filter(Boolean);
}

/**
 * @param {AcceptEntry} entry
 * @param {string} candidate
 */
function matches(entry, candidate) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Pick the best representation the client accepts from `produces`.
 * Returns null when the client explicitly rejects everything (q=0 only).
 * @param {string | null} header
 * @param {string[]} produces
 * @returns {string | null}
 */
export function preferredType(header, produces) {
  if (!produces.length) return null;
  const entries = parseAccept(header);
  if (!entries.length) return produces[0];

  let bestType = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of produces) {
    let matched = null;
    let matchedPosition = Infinity;
    for (const entry of entries) {
      if (!matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && entry.position < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = entry.position;
      }
    }
    if (!matched || matched.q <= 0) continue;
    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/**
 * @param {Headers} headers
 */
export function appendVaryAccept(headers) {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
