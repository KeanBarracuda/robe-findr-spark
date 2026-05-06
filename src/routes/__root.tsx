import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barracuda Finder — Roblox account scanner & lookup" },
      {
        name: "description",
        content:
          "Barracuda Finder — scan random Roblox accounts by year & method, filter by RAP, hats, and badges, and look up any username.",
      },
      { property: "og:title", content: "Barracuda Finder — Roblox account scanner & lookup" },
      {
        property: "og:description",
        content: "Scan and look up Roblox accounts with deep filtering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Barracuda Finder — Roblox account scanner & lookup" },
      { property: "og:description", content: "Barracuda Finder scans Roblox accounts for available usernames and looks up user details." },
      { name: "twitter:description", content: "Barracuda Finder scans Roblox accounts for available usernames and looks up user details." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01384a72-e3b3-4231-b775-6fb2aa859b5f/id-preview-a13cf460--4fb35f9a-418d-4592-b0d3-289aa5b56795.lovable.app-1776878154104.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01384a72-e3b3-4231-b775-6fb2aa859b5f/id-preview-a13cf460--4fb35f9a-418d-4592-b0d3-289aa5b56795.lovable.app-1776878154104.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
