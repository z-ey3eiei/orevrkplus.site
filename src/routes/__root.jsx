import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/AuthContext";
import { Base44Scripts } from "base44:document";
import Layout from "@/components/Layout";
import brand from "@/lib/brand.config";
import { agentJsonLd, agentMetaKeywords } from "@/lib/agent/seo.js";
import appCss from "@/index.css?url";
import tokensCss from "@/styles/tokens.css?url";

export const Route = createRootRoute({
  // Per-page <title>/meta come from each route's head(); this is the shared base.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: brand.name },
      { name: "description", content: brand.description },
      { name: "keywords", content: agentMetaKeywords.join(", ") },
      { property: "og:site_name", content: brand.name },
      { property: "og:image", content: "https://orevrkplus.site/orevrkplus-logo.png" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/orevrkplus-mark.svg" },
      { rel: "alternate", type: "text/markdown", href: "/index.md" },
      { rel: "describedby", href: "/llms.txt" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: tokensCss },
      {"rel": "preconnect", "href": "https://fonts.googleapis.com"},
      {"rel": "preconnect", "href": "https://fonts.gstatic.com", "crossOrigin": "anonymous"},
      {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=GeistSans:wght@300;400;500;600;700&display=swap"},
      {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=GeistSans:wght@300;400;500;600;700&display=swap"},
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(agentJsonLd),
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <Layout />
      <Toaster />
    </AuthProvider>
  );
}

// The document. There is no index.html: the server renders <html> from here.
function RootDocument({ children }) {
  return (
    <html lang={"en"}>
      <head>
        <HeadContent />
      </head>
      {/* data-react-root: the builder's preview bridge looks for #root and falls back to this. */}
      <body data-react-root="true">
        {children}
        <Base44Scripts />
        <Scripts />
      </body>
    </html>
  );
}