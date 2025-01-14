import { Link } from "react-router-dom";

import { useBlogs } from "../../posts/hooks/usePosts";
import { PostType } from "../../utils/types";

import "../styles/home-posts.css";

export default function HomeBlog() {
  const { data, error, isLoading } = useBlogs(1);
  const posts = data as PostType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <section className="home-posts">
      <h1>Posts</h1>
      <p>Here are some of my latest blog posts:</p>
      <ul className="blog-posts">
        {posts.map((post: PostType) => (
          <li key={post.id} className="blog-post">
            <span>{post.date}</span>
            <h2 className="home-post-title">
              <Link to={`/blog/${post.name}`}>{post.title}</Link>
            </h2>
            <p className="home-post-description">{post.resume}</p>
          </li>
        ))}
      </ul>
      <Link className="see-more" to="/blog">
        See more →
      </Link>
    </section>
  );
}
