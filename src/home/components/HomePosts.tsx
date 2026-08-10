import { Link } from "react-router-dom";
import { listPosts } from "../../content/portfolio";

import "../styles/home-posts.css";

export default function HomeBlog() {
  const posts = listPosts(1);

  return (
    <section className="home-posts">
      <h1>Posts</h1>
      <p>Here are some of my latest blog posts:</p>
      <ul className="blog-posts">
        {posts.map((post) => (
          <li key={post.id} className="blog-post">
            <span>{post.date}</span>
            <h2 className="home-post-title">
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="home-post-description">{post.resume}</p>
          </li>
        ))}
      </ul>
      <Link className="see-more" to="/posts">
        See more →
      </Link>
    </section>
  );
}
