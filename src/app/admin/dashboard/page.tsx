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
        {[
          ["Clients", "Manage active client records", "/admin/clients"],
          ["Properties", "Prepared for client property records", "/admin/properties"],
          ["Services", "Seed catalogue and templates", "/admin/services"],
          ["Jobs", "Prepared for scheduled work", "/admin/jobs"],
          ["Calendar", "Prepared day and week views", "/admin/calendar"],
          ["Cleaners", "Prepared cleaner profiles", "/admin/cleaners"],
        ].map(([title, description, href]) => (
          <a className="dashboard-tile" href={href} key={title}>
            <span>{title.slice(0, 2).toUpperCase()}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
