import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Post from "../../posts/components/Post";
import { getPostBySlug } from "../../content/portfolio";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: PostDetail,
  notFoundComponent: () => (
    <section className="px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold">Post not found</h1>
      <p className="mt-3 text-muted">That post does not exist.</p>
      <Link className="mt-6 inline-block text-accent transition-colors hover:text-white" to="/posts">
        View all posts
      </Link>
    </section>
  ),
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Post"} | asanch` }] }),
});

function PostDetail() { return <Post {...Route.useLoaderData()} />; }
