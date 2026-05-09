"use client";

import { AdminOnlyRoute } from "@/components/AdminOnlyRoute";
import { useAuth } from "@/hooks/useAuth";

export default function AdminOnlyPage() {
  const { profile } = useAuth();

  return (
    <AdminOnlyRoute>
      <main className="simple-shell">
        <section className="simple-panel">
          <p className="eyebrow">Admin only</p>
          <h1>Role protection is active</h1>
          <p>
            This route is only visible when the signed-in user profile has role
            <strong> admin</strong>.
          </p>
          <p className="muted-text">
            Signed in as {profile?.email ?? "authenticated admin"}.
          </p>
        </section>
      </main>
    </AdminOnlyRoute>
  );
}
