export default function About() {
  return (
    <section className="flex flex-col gap-12 px-4 pb-4 sm:px-0" id="about-page" aria-labelledby="about-heading">
      <section className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <img
          src="./IMG_6590.JPG"
          alt="Profile Pic"
          className="motion-safe:animate-enter-right h-36 w-36 rounded-[10%] object-cover"
        />
        <div className="flex flex-col">
          <h1 id="about-heading" className="motion-safe:animate-enter-right text-3xl font-semibold sm:text-4xl">Alberto Sánchez del Álamo</h1>
          <div className="motion-safe:animate-enter-right mt-1 flex flex-col text-muted [animation-delay:100ms]">
            <span>Software Developer</span>
            <span>Madrid, Spain</span>
          </div>
          <div className="motion-safe:animate-enter-right mt-5 flex items-center gap-4 text-xl text-muted [animation-delay:180ms]" aria-label="Contact links">
            <a
              href="mailto:alberto.sanchez.delalamo@gmail.com"
              className="rounded-md transition-colors hover:text-accent focus-visible:text-accent"
              aria-label="Email"
            >
              <i className="fas fa-envelope" />
            </a>
            <a
              href="https://linkedin.com/in/alberto-sanchez-del-alamo"
              className="rounded-md transition-colors hover:text-accent focus-visible:text-accent"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://github.com/albertosanchez14"
              className="rounded-md transition-colors hover:text-accent focus-visible:text-accent"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="education-heading">
        <h2 id="education-heading" className="motion-safe:animate-enter-down text-3xl font-semibold sm:text-4xl">Education</h2>
        <div className="motion-safe:animate-enter-down flex flex-col gap-1 [animation-delay:120ms]">
          <h3 className="text-xl font-semibold text-muted">University Carlos III of Madrid</h3>
          <span className="text-muted">Bachelor's degree, Computer Engineering</span>
          <span className="text-sm text-muted">sept. 2021 - may. 2025</span>
          <p className="mt-2 text-zinc-100">Modality: Bilingual.</p>
        </div>
        <div className="motion-safe:animate-enter-down flex flex-col gap-1 [animation-delay:240ms]">
          <h3 className="text-xl font-semibold text-muted">University of Waterloo</h3>
          <span className="text-muted">Bachelor's degree, Computer Science</span>
          <span className="text-sm text-muted">sept. 2023 - jun. 2024</span>
          <p className="mt-2 text-zinc-100">Exchange Program</p>
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="motion-safe:animate-enter-down text-3xl font-semibold sm:text-4xl">Experience</h2>
        <div className="motion-safe:animate-enter-down flex flex-col gap-1 [animation-delay:120ms]">
          <h3 className="text-xl font-semibold text-muted">STAR UC3M</h3>
          <span className="text-muted">Software Developer</span>
          <span className="text-sm text-muted">sept. 2024 - Present</span>
          <p className="mt-2 text-zinc-100">
            Involved in the Stardust Program, an advanced software, under
            internal development, designed for comprehensive design,
            optimization and flight simulation of rockets.
          </p>
        </div>
        <div className="motion-safe:animate-enter-down flex flex-col gap-1 [animation-delay:240ms]">
          <h3 className="text-xl font-semibold text-muted">GMV</h3>
          <span className="text-muted">Software Engineering Internship</span>
          <span className="text-sm text-muted">feb. 2025 - Present</span>
        </div>
      </section>
    </section>
  );
}
