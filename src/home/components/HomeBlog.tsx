import { Link } from "react-router-dom";

import "../assets/home-blog.css";

export default function HomeBlog() {
  return (
    <section className="home-blog">
      <h1>Blog</h1>
      <p>Here are some of my latest blog posts:</p>
      <ul className="blog-posts">
        <li className="blog-post">
          <span>Dec 8, 2024</span>
          <h2 className="home-blog-title">
            <Link to="/blog/post-1">Blog Post 1</Link>
          </h2>
          <p className="home-blog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            facilisis luctus sapien, sit amet sagittis lacus auctor
            pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque facilisis luctus sapien.
          </p>
        </li>
        <li className="blog-post">
          <span>Dec 8, 2024</span>
          <h2 className="home-blog-title">
            <Link to="/blog/post-2">Blog Post 2</Link>
          </h2>
          <p className="home-blog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            facilisis luctus sapien, sit amet sagittis lacus auctor
            pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque facilisis luctus sapien.
          </p>
        </li>
        <li className="blog-post">
          <span>Dec 8, 2024</span>
          <h2 className="home-blog-title">
            <Link to="/blog/post-3">Blog Post 3</Link>
          </h2>
          <p className="home-blog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            facilisis luctus sapien, sit amet sagittis lacus auctor
            pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque facilisis luctus sapien.
          </p>
        </li>
      </ul>
      <Link className="see-more" to="/blog">
        See more →
      </Link>
    </section>
  );
}
