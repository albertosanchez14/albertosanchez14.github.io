import { useEffect } from "react";

import { PostType } from "../../utils/types";

export default function Post(post: PostType) {
  useEffect(() => {
    document.title = `${post.title} | asanch`;
  }, [post.title]);

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
