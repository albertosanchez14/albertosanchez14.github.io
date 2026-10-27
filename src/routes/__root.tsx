import { createRootRoute, HeadContent, Link, Outlet } from "@tanstack/react-router";

function NotFound() {
  return <div className="not-found"><p>404 / page not found</p><Link to="/">Back to home ↗</Link></div>;
}

function RootLayout() {
  return <><HeadContent /><Outlet /></>;
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
