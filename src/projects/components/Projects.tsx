import "../assets/projects.css";

export default function Projects() {
  return (
    <section className="projects">
      {/* <h1>Projects</h1>
      <p>Here are some of the projects I've worked on:</p> */}
      <div>
        <div className="projects-display">
          <div className="project">
            <div className="project-content">
              <h2>Shape Editing Web App</h2>
              <img src="src/projects/assets/a3-screencap.png" alt="Project 1" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget felis eget nunc.
              </p>
            </div>
          </div>
          <div className="project">
            <img src="images/project-2.jpg" alt="Project 2" />
            <h2>Project 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc.
            </p>
          </div>
          <div className="project">
            <img src="images/project-3.jpg" alt="Project 3" />
            <h2>Project 3</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc.
            </p>
          </div>
          <div className="project">
            <img src="images/project-4.jpg" alt="Project 4" />
            <h2>Project 4</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc.
            </p>
          </div>
          <div className="project">
            <img src="images/project-5.jpg" alt="Project 5" />
            <h2>Project 5</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc.
            </p>
          </div>
          <div className="project">
            <img src="images/project-6.jpg" alt="Project 6" />
            <h2>Project 6</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              eget felis eget nunc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
