import { type Post as PostType } from "../../content/portfolio";

export default function Post(post: PostType) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col px-4 pb-4 sm:px-0" aria-labelledby="post-title">
      <header className="motion-safe:animate-enter-right border-b border-white/20 pb-7">
        <h1 id="post-title" className="text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
        <time className="mt-3 block text-sm text-muted">{post.date}</time>
      </header>
      <div className="motion-safe:animate-enter-down mt-8 space-y-5 text-lg leading-relaxed text-zinc-100 [animation-delay:150ms]">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
