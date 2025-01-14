import { Link } from "react-router-dom";

import { PostType } from "../../utils/types";

interface BlogListProps {
  posts: PostType[];
}

export default function PostsList({ posts }: BlogListProps) {
  return <section className="posts-page">
    {posts.map((post: PostType) => (
      <article key={post.id} className="mini-post">
        <span>{post.date}</span>
        <h2 className="home-post-title">
          <Link to={"/posts/" + post.name}>{post.title}</Link>
        </h2>
        <p className="home-post-description">{post.resume}</p>
      </article>
    ))}
  </section>;
}
