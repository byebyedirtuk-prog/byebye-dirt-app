export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Bye Bye Dirt Cleaning</p>
          <h1>Operations app foundation</h1>
          <p>
            The project base is ready for the cleaning business web app. This first phase only
            sets up the Next.js structure, documentation, and responsive layout shell.
          </p>
        </div>
      </section>

      <section className="status-section" aria-label="Project setup status">
        <article>
          <span>01</span>
          <h2>Source of truth</h2>
          <p>The project specification is stored in the docs folder and referenced by AGENTS.md.</p>
        </article>
        <article>
          <span>02</span>
          <h2>App Router</h2>
          <p>Next.js is configured with TypeScript and the App Router entry point.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Next phase</h2>
          <p>Firebase configuration will come next. No authentication or business modules exist yet.</p>
        </article>
      </section>
    </main>
  );
}
