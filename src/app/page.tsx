"use client";

import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { authError, logout, profile, user } = useAuth();

  return (
    <main className="home-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Bye Bye Dirt Cleaning</p>
          <h1>Operations app foundation</h1>
          <p>
            Authentication and user roles are now active. This protected page confirms the user can
            sign in and out before business modules are added.
          </p>
        </div>
      </section>

      <section className="status-section" aria-label="Authentication status">
        <article>
          <span>01</span>
          <h2>Signed in</h2>
          <p>{user?.email ?? "Authenticated user"}</p>
        </article>
        <article>
          <span>02</span>
          <h2>User role</h2>
          <p>{profile?.role ?? "Loading role"}</p>
        </article>
        <article>
          <span>03</span>
          <h2>Onboarding</h2>
          <p>{profile?.onboardingCompleted ? "Completed" : "Not completed yet"}</p>
        </article>
      </section>

      <section className="action-section">
        {authError && <p className="error-text">{authError}</p>}
        <a className="text-link" href="/admin-only">
          Open admin-only example
        </a>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </section>
    </main>
  );
}
