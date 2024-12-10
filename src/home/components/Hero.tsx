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
        <h2>Welcome to My Website</h2>
        <p>
          Fullstack Developer | Software Engineer | Computer Engineering Student
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien, sit amet sagittis lacus auctor pellentesque.
          Vivamus sit amet viverra nisl, sed consectetur risus. Etiam egestas
          ultrices lacus, lacinia euismod urna venenatis at. Proin aliquet
          rutrum sem vitae scelerisque.
        </p>
      </section>
    </>
  );
}
