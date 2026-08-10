import { createRootRoute, HeadContent, Link, Outlet } from "@tanstack/react-router";

import "../styles/App.css";
import "../styles/navbar.css";
import "../styles/footer.css";

function NotFound() {
  return <section className="not-found"><h1>Page not found</h1><p>The page you’re looking for doesn’t exist.</p><Link to="/">Return home</Link></section>;
}

function RootLayout() {
  return (
    <>
      <HeadContent />
      <header className="navbar">
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "selected" }} inactiveProps={{ className: "unselected" }}>Home</Link>
          <Link to="/projects" activeProps={{ className: "selected" }} inactiveProps={{ className: "unselected" }}>Projects</Link>
          <Link to="/posts" activeProps={{ className: "selected" }} inactiveProps={{ className: "unselected" }}>Posts</Link>
          <Link to="/about" activeProps={{ className: "selected" }} inactiveProps={{ className: "unselected" }}>About</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-content">
          <div className="contact-info">
            <a href="mailto:alberto.sanchez.delalamo@gmail.com" aria-label="Email"><i className="fas fa-envelope" /></a>
            <a href="https://linkedin.com/in/alberto-sanchez-del-alamo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
            <a href="https://github.com/albertosanchez14" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
          </div>
          <nav className="footer-links" aria-label="Footer navigation"><ul>
            <li><Link to="/">Home</Link></li><li><Link to="/projects">Projects</Link></li><li><Link to="/posts">Posts</Link></li><li><Link to="/about">About</Link></li>
          </ul></nav>
        </div>
        <div className="footer-bottom"><p>&copy; 2024 Alberto Sánchez del Álamo. All rights reserved.</p></div>
      </footer>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  head: () => ({ meta: [{ title: "Home | asanch" }] }),
});
