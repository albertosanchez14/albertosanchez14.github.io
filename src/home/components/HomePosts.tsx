import { Link } from "@tanstack/react-router";
import { listPosts } from "../../content/portfolio";

export default function HomeBlog() {
  const posts = listPosts(1);

  return (
    <section className="flex flex-col" id="posts">
      <h2 className="motion-safe:animate-enter-right text-4xl font-semibold leading-tight sm:text-5xl">Posts</h2>
      <p className="motion-safe:animate-enter-right mt-3 text-zinc-100 [animation-delay:100ms]">Here are some of my latest blog posts:</p>
      <ul className="mt-5 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="motion-safe:animate-enter-right [animation-delay:200ms]">
            <span className="text-sm text-muted">{post.date}</span>
            <h3 className="mt-1 text-2xl font-semibold"><Link className="transition-colors hover:text-accent" to="/posts/$slug" params={{ slug: post.slug }}>{post.title}</Link></h3>
            <p className="mt-1 text-zinc-100">{post.resume}</p>
          </li>
        ))}
      </ul>
      <Link className="motion-safe:animate-enter-right mt-4 self-end text-muted transition-colors hover:text-white [animation-delay:350ms]" to="/posts">
        See more →
      </Link>
    </section>
  );
}
