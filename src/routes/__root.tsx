import { createRootRoute, HeadContent, Link, Outlet } from "@tanstack/react-router";

function NotFound() {
  return <section className="px-6 py-16 text-center"><h1 className="text-4xl font-semibold">Page not found</h1><p className="mt-3 text-muted">The page you’re looking for doesn’t exist.</p><Link className="mt-6 inline-block text-accent hover:text-white" to="/">Return home</Link></section>;
}

function RootLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-8 sm:px-8">
      <HeadContent />
      <header className="mb-14 flex justify-center">
        <nav className="flex flex-wrap justify-center gap-x-1 gap-y-2 text-sm sm:text-base" aria-label="Main navigation">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "rounded-md px-3 py-2 text-white" }} inactiveProps={{ className: "rounded-md px-3 py-2 text-muted transition-colors hover:text-white" }}>Home</Link>
          <Link to="/projects" activeProps={{ className: "rounded-md px-3 py-2 text-white" }} inactiveProps={{ className: "rounded-md px-3 py-2 text-muted transition-colors hover:text-white" }}>Projects</Link>
          <Link to="/posts" activeProps={{ className: "rounded-md px-3 py-2 text-white" }} inactiveProps={{ className: "rounded-md px-3 py-2 text-muted transition-colors hover:text-white" }}>Posts</Link>
          <Link to="/about" activeProps={{ className: "rounded-md px-3 py-2 text-white" }} inactiveProps={{ className: "rounded-md px-3 py-2 text-muted transition-colors hover:text-white" }}>About</Link>
        </nav>
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="mt-12 border-t border-white/70 pt-5 text-center text-sm text-muted">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-xl">
            <a className="transition-colors hover:text-accent" href="mailto:alberto.sanchez.delalamo@gmail.com" aria-label="Email"><i className="fas fa-envelope" /></a>
            <a className="transition-colors hover:text-accent" href="https://linkedin.com/in/alberto-sanchez-del-alamo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
            <a className="transition-colors hover:text-accent" href="https://github.com/albertosanchez14" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
          </div>
          <nav aria-label="Footer navigation"><ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <li><Link className="transition-colors hover:text-white" to="/">Home</Link></li><li><Link className="transition-colors hover:text-white" to="/projects">Projects</Link></li><li><Link className="transition-colors hover:text-white" to="/posts">Posts</Link></li><li><Link className="transition-colors hover:text-white" to="/about">About</Link></li>
          </ul></nav>
        </div>
        <p className="mt-5 border-t border-white/70 pt-4">&copy; 2024 Alberto Sánchez del Álamo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  head: () => ({ meta: [{ title: "Home | asanch" }] }),
});
