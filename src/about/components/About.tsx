import "../styles/about.css";

export default function About() {
  return (
    <section className="about-page" id="about-page">
      <section className="image-text-section">
        <img src="./IMG_6590.JPG" alt="Example Image" />
        <div className="text-content">
          <h2>Alberto Sánchez del Álamo</h2>
          <div>
            <span>Software Developer</span>
            <span>Madrid, Spain</span>
          </div>
          <div className="contact-info-about">
            <a
              href="mailto:alberto.sanchez.delalamo@gmail.com"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://linkedin.com/in/alberto-sanchez-del-alamo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/albertosanchez14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2>Education</h2>
        <div>
          <h3>University Carlos III of Madrid</h3>
          <span>Bachelor's degree, Computer Engineering</span>
          <span>sept. 2021 - may. 2025</span>
          <p>Modality: Bilingual.</p>
        </div>
        <div>
          <h3>University of Waterloo</h3>
          <span>Bachelor's degree, Computer Science</span>
          <span>sept. 2023 - jun. 2024</span>
          <p>Exchange Program</p>
        </div>
      </section>

      <section className="content-section">
        <h2>Experience</h2>
        <div>
          <h3>STAR UC3M</h3>
          <span>Software Developer</span>
          <span>sept. 2024 - Present</span>
          <p>
            Involved in the Stardust Program, an advanced software, under
            internal development, designed for comprehensive design,
            optimization and flight simulation of rockets.
          </p>
        </div>
        <div>
          <h3>GMV</h3>
          <span>Software Engineering Internship</span>
          <span>feb. 2025 - Present</span>
        </div>
      </section>
    </section>
  );
}
