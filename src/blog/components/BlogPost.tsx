import { BlogType } from "../../utils/types";

export default function BlogPost(blog: BlogType) {
  return (
    <section className="blog-post-page">
      <h1>{blog.title}</h1>
      <span>{blog.date}</span>
      {blog.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}
