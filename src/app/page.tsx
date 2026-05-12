"use client";

import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { authError, logout, profile, user } = useAuth();

  return (
    <main className="home-shell">
      <section className="home-hero" aria-label="Bye Bye Dirt Cleaning home">
        <div className="home-topbar">
          <a className="brand-mark brand-mark-light" href="/">
            <span>BD</span>
            Bye Bye Dirt Cleaning
          </a>
          <div className="home-session">
            <span>{profile?.role ?? "Secure session"}</span>
            <button type="button" className="secondary-button" onClick={logout}>
              Log out
            </button>
          </div>
        </div>

        <div className="home-hero-copy">
          <p className="eyebrow">Cleaning operations workspace</p>
          <h1>Bye Bye Dirt</h1>
          <p>
            A focused command center for clients, properties, services, cleaners, jobs, and daily
            service records.
          </p>
          <div className="home-actions">
            <a className="primary-link" href="/admin/dashboard">
              Open workspace
            </a>
            <a className="text-link" href="/admin/clients">
              View clients
            </a>
          </div>
        </div>
      </section>

      <section className="home-overview" aria-label="Workspace overview">
        {authError && <p className="error-text">{authError}</p>}

        <article className="overview-panel overview-panel-main">
          <div>
            <p className="eyebrow">Phase 1 scope</p>
            <h2>Operational foundation</h2>
          </div>
          <div className="overview-metrics">
            <span>
              <strong>11</strong>
              Seed services
            </span>
            <span>
              <strong>2</strong>
              Roles
            </span>
            <span>
              <strong>UTC</strong>
              Storage
            </span>
          </div>
        </article>

        <article className="overview-panel">
          <p className="eyebrow">Signed in</p>
          <h2>{user?.email ?? "Authenticated user"}</h2>
          <p>{profile?.onboardingCompleted ? "Profile complete" : "Profile pending"}</p>
        </article>

        <article className="overview-panel">
          <p className="eyebrow">Access</p>
          <h2>{profile?.role ?? "Loading role"}</h2>
          <p>Role-based workspace access is active.</p>
        </article>
      </section>
    </main>
  );
}
