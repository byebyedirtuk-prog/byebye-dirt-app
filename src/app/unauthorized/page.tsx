export default function UnauthorizedPage() {
  return (
    <main className="simple-shell">
      <section className="simple-panel">
        <p className="eyebrow">Access restricted</p>
        <h1>You do not have permission to open this page</h1>
        <p className="muted-text">
          Ask an admin to update your role if you need access to this area.
        </p>
      </section>
    </main>
  );
}
