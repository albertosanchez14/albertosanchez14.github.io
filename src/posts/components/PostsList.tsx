import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { type Post as PostType } from "../../content/portfolio";

interface BlogListProps {
  posts: readonly PostType[];
}

export default function PostsList({ posts }: BlogListProps) {
  return (
    <section className="flex flex-col gap-7 px-4 pb-4 sm:px-0" aria-labelledby="posts-heading">
      <div className="motion-safe:animate-enter-right">
        <h1 id="posts-heading" className="text-4xl font-semibold leading-tight sm:text-5xl">Posts</h1>
        <p className="mt-3 text-zinc-100">Thoughts, tutorials, and notes from my journey.</p>
      </div>
      {posts.map((post: PostType, index: number) => (
        <article
          key={post.id}
          className="motion-safe:animate-enter-right border-b border-white/20 pb-7 last:border-b-0 [animation-delay:var(--post-delay)]"
          style={{ "--post-delay": `${(index + 1) * 120}ms` } as CSSProperties}
        >
          <time className="text-sm text-muted">{post.date}</time>
          <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
            <Link className="rounded-sm transition-colors hover:text-accent focus-visible:text-accent" to="/posts/$slug" params={{ slug: post.slug }}>{post.title}</Link>
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-zinc-100">{post.resume}</p>
        </article>
      ))}
    </section>
  );
}
