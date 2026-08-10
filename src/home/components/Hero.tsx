export default function Hero() {
  return (
    <section className="flex w-full flex-col items-start gap-8" id="home">
      <div className="flex flex-col overflow-hidden">
        <h1 className="motion-safe:animate-curtain text-4xl font-semibold leading-tight sm:text-5xl">Alberto Sánchez del Álamo</h1>
        <span className="motion-safe:animate-curtain text-muted [animation-delay:100ms]">Software Developer</span>
        <span className="motion-safe:animate-curtain text-muted [animation-delay:180ms]">Madrid, Spain</span>
      </div>
      <div>
        <img src="./IMG_0225.JPG" alt="Profile Pic" className="motion-safe:animate-enter-right h-44 w-44 rounded-[10%] object-cover [animation-delay:300ms]" />
      </div>
      <div className="flex max-w-2xl flex-col gap-4 leading-relaxed text-zinc-100">
        <p className="motion-safe:animate-enter-down [animation-delay:350ms]">Hi! I'm Alberto.</p>
        <p className="motion-safe:animate-enter-down [animation-delay:450ms]">I'm a Computer Engineering student at the University Carlos III of Madrid.<br />Previously, I studied at the University of Waterloo.</p>
        <p className="motion-safe:animate-enter-down [animation-delay:550ms]">Currently intern at GMV as a Software Engineering and contributing to the Stardust Program @ STAR UC3M.</p>
        <p className="motion-safe:animate-enter-down [animation-delay:650ms]">Explore this website to discover what I'm currently working on, reading or thinking about.</p>
        <p className="motion-safe:animate-enter-down [animation-delay:750ms]">If what you find interests you, don't hesitate to reach out.</p>
      </div>
    </section>
  );
}
