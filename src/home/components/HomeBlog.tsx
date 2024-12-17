import { Link } from "react-router-dom";

import { useBlogs } from "../../blog/hooks/useBlogs";
import { BlogType } from "../../utils/types";

import "../assets/home-blog.css";

export default function HomeBlog() {
  const { data, error, isLoading } = useBlogs(1);
  const blogs = data as BlogType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <section className="home-blog">
      <h1>Blog</h1>
      <p>Here are some of my latest blog posts:</p>
      <ul className="blog-posts">
        {blogs.map((blog: BlogType) => (
          <li key={blog.id} className="blog-post">
            <span>{blog.date}</span>
            <h2 className="home-blog-title">
              <Link to={`/blog/${blog.name}`}>{blog.title}</Link>
            </h2>
            <p className="home-blog-description">{blog.resume}</p>
          </li>
        ))}
      </ul>
      <Link className="see-more" to="/blog">
        See more →
      </Link>
    </section>
  );
}
