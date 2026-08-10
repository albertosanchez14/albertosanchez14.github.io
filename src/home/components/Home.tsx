import Hero from "./Hero";
import HomeProjects from "./HomeProjects";
import HomeBlog from "./HomePosts";

export default function Home() {
  return (
    <div className="flex flex-col gap-14 pb-4 sm:px-4">
      <Hero />
      <HomeProjects />
      <HomeBlog />
    </div>
  );
}
