import { listPosts } from "../../content/portfolio";

import "../styles/blogs.css";

import PostsList from "./PostsList";

export default function Posts() {
  const posts = listPosts();

  return (
    <PostsList posts={posts} />
  );
}
