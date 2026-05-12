"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AdminOnlyRoute } from "@/components/AdminOnlyRoute";
import { useAuth } from "@/hooks/useAuth";

type AdminIconName =
  | "calendar"
  | "clients"
  | "dashboard"
  | "jobs"
  | "properties"
  | "settings"
  | "services"
  | "team";

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Clients", href: "/admin/clients", icon: "clients" },
  { label: "Properties", href: "/admin/properties", icon: "properties" },
  { label: "Cleaners", href: "/admin/cleaners", icon: "team" },
  { label: "Services", href: "/admin/services", icon: "services" },
  { label: "Jobs", href: "/admin/jobs", icon: "jobs" },
  { label: "Calendar", href: "/admin/calendar", icon: "calendar" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
] satisfies Array<{ label: string; href: string; icon: AdminIconName }>;

function AdminNavIcon({ name }: { name: AdminIconName }) {
  const paths: Record<AdminIconName, ReactNode> = {
    calendar: (
      <>
        <path d="M5 7.5h14" />
        <path d="M8 4.5v4" />
        <path d="M16 4.5v4" />
        <rect width="14" height="14" x="5" y="6.5" rx="2.5" />
        <path d="M8.5 12h2" />
        <path d="M13.5 12h2" />
        <path d="M8.5 16h2" />
      </>
    ),
    clients: (
      <>
        <path d="M9.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M4.5 19.5c.5-3.1 2.3-5 5-5s4.5 1.9 5 5" />
        <path d="M16 11.5a2.4 2.4 0 1 0 0-4.8" />
        <path d="M15.8 14.5c2 .4 3.2 2 3.7 5" />
      </>
    ),
    dashboard: (
      <>
        <rect width="6" height="7" x="4.5" y="4.5" rx="1.5" />
        <rect width="6" height="4.5" x="13.5" y="4.5" rx="1.5" />
        <rect width="6" height="4.5" x="4.5" y="15" rx="1.5" />
        <rect width="6" height="7" x="13.5" y="12.5" rx="1.5" />
      </>
    ),
    jobs: (
      <>
        <path d="M8 7.5h8" />
        <path d="M8 12h8" />
        <path d="M8 16.5h5" />
        <rect width="14" height="16" x="5" y="4" rx="2.5" />
      </>
    ),
    properties: (
      <>
        <path d="M4.5 11.5 12 5l7.5 6.5" />
        <path d="M7 10v9.5h10V10" />
        <path d="M10 19.5v-5h4v5" />
      </>
    ),
    services: (
      <>
        <path d="M6 17.5 17.5 6" />
        <path d="m15.5 4.5 4 4" />
        <path d="M5 7.5h4" />
        <path d="M7 5.5v4" />
        <path d="M15 18.5h4" />
        <path d="M17 16.5v4" />
      </>
    ),
    settings: (
      <>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19 12a6.9 6.9 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.8-1l-.3-2.6h-4l-.4 2.6a8 8 0 0 0-1.8 1l-2.3-1-2 3.4 2 1.5a6.9 6.9 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 1.8 1l.4 2.6h4l.3-2.6a8 8 0 0 0 1.8-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />
      </>
    ),
    team: (
      <>
        <path d="M8.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M3.5 19.5c.5-3.1 2.3-5 5-5s4.5 1.9 5 5" />
        <path d="M16.5 12.5a2.5 2.5 0 1 0 0-5" />
        <path d="M16 15c2 .5 3.4 2 4 4.5" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" className="admin-nav-icon" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" className="button-icon" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9">
        <path d="M9 20H6.5A2.5 2.5 0 0 1 4 17.5v-11A2.5 2.5 0 0 1 6.5 4H9" />
        <path d="M15.5 16.5 20 12l-4.5-4.5" />
        <path d="M20 12H9" />
      </g>
    </svg>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { logout, profile } = useAuth();

  return (
    <AdminOnlyRoute>
      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <Link className="brand-mark admin-brand" href="/admin/dashboard">
            <span>BD</span>
            <strong>Bye Bye Dirt</strong>
            <small>Cleaning operations</small>
          </Link>

          <nav className="admin-nav">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "admin-nav-link active" : "admin-nav-link"}
                  href={item.href}
                  key={item.href}
                >
                  <span aria-hidden="true">
                    <AdminNavIcon name={item.icon} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <div>
              <p className="admin-kicker">Admin workspace</p>
              <h1>Bye Bye Dirt operations</h1>
            </div>

            <div className="admin-account">
              <span>{profile?.email ?? "Admin"}</span>
              <button type="button" onClick={logout}>
                <LogoutIcon />
                Log out
              </button>
            </div>
          </header>

          <main className="admin-content">{children}</main>
        </div>
      </div>
    </AdminOnlyRoute>
  );
}
