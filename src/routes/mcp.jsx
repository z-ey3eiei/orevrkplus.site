import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/mcp")({
  head: () => ({ meta: [{ title: "orevrkplus MCP server" }, { name: "description", content: "MCP server availability and documentation status for orevrkplus." }], links: [{ rel: "canonical", href: "https://orevrkplus.site/mcp" }] }),
  component: ToolDocs,
});
function ToolDocs() {
  return <article className="mx-auto max-w-4xl px-6 py-16 text-foreground">
    <a href="/Docs" className="text-foreground/70 underline">orevrkplus API Documentation</a>
    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">orevrkplus MCP server</h1>
    <p className="mt-4 text-foreground/70">MCP server availability and documentation status for orevrkplus.</p>
    <p className="mt-6">No orevrkplus MCP server implementation or verified connection URL is included in this website repository. This page is documentation, not an MCP protocol endpoint.</p><p className="mt-4">Server installation, transport, authentication and tool definitions will need a verified implementation before connection instructions can be published.</p>
    <nav aria-label="Developer documentation" className="mt-10 flex flex-wrap gap-6 underline"><a href="/Docs">API</a><a href="/cli">CLI</a><a href="/sdk">SDK</a><a href="/mcp">MCP</a><a href="https://github.com/z-ey3eiei/orevrkplus.site">Website source</a></nav>
  </article>;
}
