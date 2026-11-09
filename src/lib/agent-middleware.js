import { createMiddleware } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { preferredType, appendVaryAccept } from "@/lib/agent/accept.server";
import { llmsTxtBody } from "@/lib/agent/llms-txt.server";
import { openApiDocument } from "@/lib/agent/openapi.server";
import { markdownForPath, notFoundMarkdown, markdownAlternatePath, SITE } from "@/lib/agent/markdown-pages.server";
import { problemResponse } from "@/lib/agent/problem.server";

const TEXT_MARKDOWN = "text/markdown; charset=utf-8";
const AGENT_PATHS = new Set(["/llms.txt", "/llms-full.txt", "/robots.txt", "/sitemap.xml", "/openapi.json"]);

function isPageRequest(pathname) {
  if (pathname.startsWith("/api/") || pathname.startsWith("/assets/")) return false;
  if (AGENT_PATHS.has(pathname)) return false;
  return true;
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

function sitemapXml() {
  const urls = ["/", "/docs", "/docs/api", "/registry", "/Showcase", "/create-ovk-app", "/cli", "/ai"];
  const lastmod = new Date().toISOString().slice(0, 10);
  const locs = urls.map((path) => `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs}
</urlset>`;
}

function staticAgentResponse(pathname) {
  if (pathname === "/llms.txt" || pathname === "/llms-full.txt") {
    const body = llmsTxtBody();
    return new Response(body, {
      headers: { "Content-Type": TEXT_MARKDOWN, "Cache-Control": "public, max-age=3600" },
    });
  }
  if (pathname === "/robots.txt") {
    return new Response(robotsTxt(), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  }
  if (pathname === "/sitemap.xml") {
    return new Response(sitemapXml(), {
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  }
  if (pathname === "/openapi.json") {
    return new Response(JSON.stringify(openApiDocument()), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  }
  return null;
}

function markdownResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": TEXT_MARKDOWN,
      Vary: "Accept",
      "Cache-Control": status === 404 ? "no-store" : "public, max-age=60",
    },
  });
}

function negotiateMarkdown(request, pathname) {
  const accept = request.headers.get("Accept");
  const chosen = preferredType(accept, ["text/html", "text/markdown"]);
  if (chosen === null && accept) {
    return new Response("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }
  if (chosen !== "text/markdown") return null;
  const md = markdownForPath(pathname);
  if (md) return markdownResponse(md);
  return markdownResponse(notFoundMarkdown(pathname), 404);
}

function wrapHtmlResponse(response, pathname) {
  if (!response?.headers) return response;
  const ct = response.headers.get("Content-Type") || "";
  if (ct.includes("text/html")) {
    appendVaryAccept(response.headers);
    const alt = markdownAlternatePath(pathname);
    if (alt) {
      const link = `<${alt}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`;
      const existing = response.headers.get("Link");
      response.headers.set("Link", existing ? `${existing}, ${link}` : link);
    }
  }
  return response;
}

async function wrapApiResponse(response, request) {
  if (!response?.headers) return response;
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return response;

  const clone = new Response(response.body, response);
  const ct = clone.headers.get("Content-Type") || "";

  if (clone.status === 404 && !ct.includes("problem+json")) {
    return problemResponse({
      status: 404,
      title: "Not Found",
      detail: `No API route matches ${url.pathname}. See ${SITE}/openapi.json and ${SITE}/docs/api.`,
      code: "NOT_FOUND",
      instance: url.pathname,
    });
  }

  if (clone.status === 405 && !ct.includes("problem+json")) {
    return problemResponse({
      status: 405,
      title: "Method Not Allowed",
      detail: `HTTP method ${request.method} is not allowed for ${url.pathname}.`,
      code: "METHOD_NOT_ALLOWED",
      instance: url.pathname,
    });
  }

  if (clone.status >= 400 && ct.includes("application/json") && !ct.includes("problem+json")) {
    try {
      const text = await clone.text();
      let detail = text;
      try {
        const parsed = JSON.parse(text);
        detail = parsed.error || parsed.message || text;
      } catch {
        /* keep text */
      }
      return problemResponse({
        status: clone.status,
        title: clone.statusText || "Error",
        detail: String(detail),
        code: clone.status === 400 ? "BAD_REQUEST" : clone.status === 403 ? "FORBIDDEN" : "API_ERROR",
        instance: url.pathname,
      });
    } catch {
      return clone;
    }
  }

  return clone;
}

export const agentRequestMiddleware = createMiddleware({ type: "request" }).server(async ({ next, request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const staticHit = staticAgentResponse(pathname);
  if (staticHit) return staticHit;

  if (isPageRequest(pathname)) {
    const md = negotiateMarkdown(request, pathname);
    if (md) return md;
  }

  const result = await next();

  if (isPageRequest(pathname)) {
    setResponseHeader("Vary", "Accept");
    const wrapped = wrapHtmlResponse(result, pathname);
    if (wrapped?.headers && wrapped.status === 404) {
      const chosen = preferredType(request.headers.get("Accept"), ["text/html", "text/markdown"]);
      if (chosen === "text/markdown") {
        return markdownResponse(notFoundMarkdown(pathname), 404);
      }
    }
    return wrapped;
  }

  return wrapApiResponse(result, request);
});
