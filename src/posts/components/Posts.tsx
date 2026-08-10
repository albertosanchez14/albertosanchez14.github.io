import { Routes, Route } from "react-router-dom";

import { listPosts } from "../../content/portfolio";

import "../styles/blogs.css";

import PostsList from "./PostsList";
import Post from "./Post";

export default function Posts() {
  const posts = listPosts();

  return (
    <Routes>
      <Route
        path="/"
        element={<PostsList posts={posts} />}
      />
      {posts.map((post) => (
        <Route
          key={post.id}
          path={"/" + post.slug}
          element={<Post {...post} />}
        />
      ))}
    </Routes>
  );
}
