type AdminPlaceholderPageProps = {
  title: string;
  description: string;
  todo?: string;
};

export function AdminPlaceholderPage({ title, description, todo = "não especificado" }: AdminPlaceholderPageProps) {
  return (
    <section className="admin-placeholder">
      <div>
        <p className="admin-kicker">Phase 1 workspace</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="placeholder-grid" aria-label={`${title} implementation status`}>
        <span>
          <strong>Status</strong>
          Prepared shell
        </span>
        <span>
          <strong>Business rules</strong>
          {todo}
        </span>
      </div>
    </section>
  );
}
