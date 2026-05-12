import type { ReactNode } from "react";

type DashboardIconName = "calendar" | "clients" | "jobs" | "properties" | "services" | "team";

const dashboardModules = [
  ["Clients", "Manage active client records", "/admin/clients", "clients"],
  ["Properties", "Prepared for client property records", "/admin/properties", "properties"],
  ["Services", "Seed catalogue and templates", "/admin/services", "services"],
  ["Jobs", "Prepared for scheduled work", "/admin/jobs", "jobs"],
  ["Calendar", "Prepared day and week views", "/admin/calendar", "calendar"],
  ["Cleaners", "Prepared cleaner profiles", "/admin/cleaners", "team"],
] satisfies Array<[string, string, string, DashboardIconName]>;

function DashboardIcon({ name }: { name: DashboardIconName }) {
  const paths: Record<DashboardIconName, ReactNode> = {
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
    <svg aria-hidden="true" className="dashboard-tile-icon" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}

export default function AdminDashboardPage() {
  return (
    <section className="dashboard-page">
      <div className="admin-section-heading">
        <p className="admin-kicker">Dashboard</p>
        <h2>Phase 1 command surface</h2>
        <p>
          Current frontend shell for the admin workflow. Live metrics, daily work queues, and
          completion rules remain não especificado until their business definitions are added.
        </p>
      </div>

      <div className="dashboard-grid" aria-label="Phase 1 modules">
        {dashboardModules.map(([title, description, href, icon]) => (
          <a className="dashboard-tile" href={href} key={title}>
            <span>
              <DashboardIcon name={icon} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
