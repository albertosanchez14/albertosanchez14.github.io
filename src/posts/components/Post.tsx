import { type Post as PostType } from "../../content/portfolio";

export default function Post(post: PostType) {
  return (
    <section className="post-page">
      <h1>{post.title}</h1>
      <span>{post.date}</span>
      {post.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}
