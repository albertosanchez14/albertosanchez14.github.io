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
  notFoundComponent: () => <section className="not-found"><h1>Post not found</h1><p>That post does not exist.</p><Link to="/posts">View all posts</Link></section>,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Post"} | asanch` }] }),
});

function PostDetail() { return <Post {...Route.useLoaderData()} />; }
