import "../styles/sections.css";

import Hero from "./Hero";
import HomeProjects from "./HomeProjects";
import HomeBlog from "./HomePosts";

export default function Home() {
  return (
    <div className="home-contents">
      <Hero />
      <HomeProjects />
      <HomeBlog />
    </div>
  );
}
