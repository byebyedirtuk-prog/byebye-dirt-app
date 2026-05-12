"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-hero">
        <a className="brand-mark brand-mark-light" href="/">
          <span>BD</span>
          Bye Bye Dirt Cleaning
        </a>

        <div className="login-hero-copy">
          <p className="eyebrow">Cleaning operations workspace</p>
          <h1>Run every cleaning day with clarity.</h1>
          <p>
            A calm, focused home for schedules, clients, properties, services, checklists,
            inventory, and job records.
          </p>
        </div>

        <div className="login-hero-footer" aria-label="Bye Bye Dirt workspace highlights">
          <span>Jobs</span>
          <span>Cleaners</span>
          <span>Properties</span>
        </div>
      </section>

      <section className="login-panel" aria-label="Login form">
        <div className="login-panel-header">
          <p className="form-label">Secure access</p>
          <h2>Welcome back</h2>
          <p>Sign in to continue to the Bye Bye Dirt Cleaning workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            Email
            <input
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="login-support">Protected access for authorized team members.</p>
      </section>
    </main>
  );
}
