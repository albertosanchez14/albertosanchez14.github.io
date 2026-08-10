import { listPosts } from "../../content/portfolio";

import PostsList from "./PostsList";

export default function Posts() {
  const posts = listPosts();

  return (
    <PostsList posts={posts} />
  );
}
