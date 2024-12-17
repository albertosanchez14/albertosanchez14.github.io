import { Link } from "react-router-dom";

import { BlogType } from "../../utils/types";

interface BlogListProps {
  blogs: BlogType[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return <section className="blog-page">
    {blogs.map((blog: BlogType) => (
      <article key={blog.id} className="blog-mini-post">
        <span>{blog.date}</span>
        <h2 className="home-blog-title">
          <Link to={"/blog/" + blog.name}>{blog.title}</Link>
        </h2>
        <p className="home-blog-description">{blog.resume}</p>
      </article>
    ))}
  </section>;
}
