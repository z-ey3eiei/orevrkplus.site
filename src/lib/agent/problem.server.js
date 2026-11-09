const PROBLEM_JSON = "application/problem+json; charset=utf-8";

/**
 * RFC 9457 problem detail response.
 * @param {object} opts
 * @param {number} opts.status
 * @param {string} opts.title
 * @param {string} opts.detail
 * @param {string} [opts.type]
 * @param {string} [opts.code]
 * @param {string} [opts.instance]
 * @param {Record<string, unknown>} [opts.extra]
 */
export function problemResponse({ status, title, detail, type, code, instance, extra = {} }) {
  const body = {
    type: type || `https://orevrkplus.site/problems/${code || status}`,
    title,
    status,
    detail,
    ...(code ? { code } : {}),
    ...(instance ? { instance } : {}),
    resolution: detail,
    ...extra,
  };
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": PROBLEM_JSON,
      "Cache-Control": "no-store",
    },
  });
}

export const PROBLEM_CONTENT_TYPE = PROBLEM_JSON;
