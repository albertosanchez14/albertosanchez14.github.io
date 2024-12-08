import Hero from "./Hero";
import HomeProjects from "./HomeProjects";
import HomeBlog from "./HomeBlog";

import "../assets/sections.css";

export default function Home() {
  return (
    <div className="home-contents">
      <Hero />
      <HomeProjects />
      <HomeBlog />
    </div>
  );
}
