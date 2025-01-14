import "../styles/image-text-section.css";
import "../styles/hero.css";

export default function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <h2>Hi, Welcome to my website!</h2>
        <section className="image-text-section">
          <img src="./IMG_6590.JPG" alt="Profile Pic" id="home-img" />
          <div className="text-content">
            <h2>Alberto Sánchez del Álamo</h2>
            <div>
              <span>Software Developer</span>
              <span>Madrid, Spain</span>
            </div>
          </div>
        </section>
        <p>
          I'm a Computer Engineering student at University Carlos III of Madrid.{" "}
          <br />
          Previously at University of Waterloo. <br />
          Currently Developer @ STAR UC3M.
        </p>
        <p>
          Welcome to my website! I'm a Software Developer with a passion for
          building innovative software solutions that solve real-world problems.
          <br />
          Feel free to explore my projects, read my blog, or learn more about
          me.
        </p>
      </section>
    </>
  );
}
