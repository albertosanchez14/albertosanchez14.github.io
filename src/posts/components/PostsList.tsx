import { Link } from "react-router-dom";

import { PostType } from "../../utils/types";

interface BlogListProps {
  posts: PostType[];
}

export default function PostsList({ posts }: BlogListProps) {
  return (
    <section className="posts-page">
      {posts.map((post: PostType, index: number) => (
        <article
          key={post.id}
          className="mini-post"
          style={{
            animation: `slide-right 1s ease-out forwards`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <span>{post.date}</span>
          <h2 className="home-post-title">
            <Link to={"/posts/" + post.name}>{post.title}</Link>
          </h2>
          <p className="home-post-description">{post.resume}</p>
        </article>
      ))}
    </section>
  );
}
