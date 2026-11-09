import { ClientOnly, HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/AuthContext";
import { Base44Scripts } from "base44:document";
import Layout from "@/components/Layout";
import brand from "@/lib/brand.config";
import appCss from "@/index.css?url";
import tokensCss from "@/styles/tokens.css?url";

const SITE_URL = "https://orevrkplus.site";

export const Route = createRootRoute({
  // Per-page <title>/meta come from each route's head(); this is the shared base.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: brand.name },
      { name: "description", content: brand.description },
      { property: "og:site_name", content: brand.name },
      { property: "og:image", content: `${SITE_URL}/orevrkplus-logo.png` },
      { property: "og:title", content: brand.name },
      { property: "og:description", content: brand.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: brand.name },
      { name: "twitter:description", content: brand.description },
      { name: "twitter:image", content: `${SITE_URL}/orevrkplus-logo.png` },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/orevrkplus-mark.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: tokensCss },
      { rel: "canonical", href: SITE_URL },
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
      <ClientOnly>
        <Layout />
      </ClientOnly>
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground">
          Skip to content
        </a>
        {children}
        <Base44Scripts />
        <Scripts />
      </body>
    </html>
  );
}