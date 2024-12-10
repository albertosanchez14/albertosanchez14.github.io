import "../assets/image-text-section.css";
import "../assets/hero.css";

export default function Hero() {
  return (
    <>
      <section className="image-text-section">
        <img src="src\assets\IMG_6590.JPG" alt="Example Image" />
        <div className="text-content">
          <h2>Alberto Sánchez del Álamo</h2>
          <p>Fullstack Developer</p>
        </div>
      </section>
      <section className="hero" id="home">
        {/* <h2>Welcome to My Website</h2> */}
        <p>
          Computer Engineering student at University Carlos III of Madrid.{" "}
          <br />
          Previously at University of Waterloo. <br />
          Currently Developer @ STAR UC3M.
        </p>
        <p>
          Welcome to my website! I'm a Fullstack Developer with a passion for
          building innovative software solutions that solve real-world problems.
          Feel free to explore my projects, read my blog, or learn more about me.
        </p>
      </section>
    </>
  );
}
