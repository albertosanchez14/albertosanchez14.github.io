import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="intro-container">
        <h2>Alberto Sánchez del Álamo</h2>
        <span>Software Developer</span>
        <span>Madrid, Spain</span>
      </div>
      <section className="image-text-section">
        <img
          src="./IMG_0225.JPG"
          alt="Profile Pic"
          id="home-img"
        />
      </section>

      {/* <section className="image-text-section">
        <img
          src="https://avatars.githubusercontent.com/u/94110492?v=4"
          alt="Profile Pic"
          id="home-img"
        />
        <div className="hero-text-content">
          <h2>Alberto Sánchez del Álamo</h2>
          <div>
            <span>Software Developer</span>
            <span>Madrid, Spain</span>
          </div>
        </div>
      </section> */}

      <section className="description-section">
        <p>Hi! I'm Alberto.</p>
        <p>
          I'm a Computer Engineering student at the University Carlos III of
          Madrid.
          <br />
          Previously, I studied at the University of Waterloo.
        </p>
        <p>
          Currently intern at GMV as a Software Engineering and contributing to
          the Stardust Program @ STAR UC3M.
        </p>
        <p>
          Explore this website to discover what I'm currently working on,
          reading or thinking about.
        </p>
        <p>If what you find interests you, don't hesitate to reach out.</p>
      </section>
    </section>
  );
}
