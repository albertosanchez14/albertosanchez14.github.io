import { Routes, Route } from "react-router-dom";

import { useBlogs } from "../hooks/usePosts";
import { PostType } from "../../utils/types";

import "../styles/blogs.css";

import PostsList from "./PostsList";
import Post from "./Post";

export default function Posts() {
  const { data, error, isLoading } = useBlogs(1);
  const posts = data as PostType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={<PostsList posts={posts} />}
      />
      {posts.map((post: PostType) => (
        <Route
          key={post.id}
          path={"/" + post.name}
          element={<Post {...post} />}
        />
      ))}
    </Routes>
  );
}
