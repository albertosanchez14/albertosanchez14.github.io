import { Routes, Route } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { BlogType } from "../../utils/types";

import "../styles/blogs.css";

import BlogList from "./BlogList";
import BlogPost from "./BlogPost";

export default function Blog() {
  const { data, error, isLoading } = useBlogs(1);
  const blogs = data as BlogType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={<BlogList blogs={blogs} />}
      />
      {blogs.map((blog: BlogType) => (
        <Route
          key={blog.id}
          path={"/" + blog.name}
          element={<BlogPost {...blog} />}
        />
      ))}
    </Routes>
  );
}
