import { Link } from "react-router-dom";

import "../styles/project-page.css";

import { ProjectType } from "../../utils/types";

export default function ProjectPage({ name, img, technologies }: ProjectType) {
  return (
    <section className="project-page">
      <h1>{name}</h1>
      <p>Project Image ID: {img.id}</p>
      <h2>Technologies:</h2>
      <ul>
        {technologies.map((tech, index) => (
          <li key={index}>{tech.id}</li>
        ))}
      </ul>
    </section>
  );
}
