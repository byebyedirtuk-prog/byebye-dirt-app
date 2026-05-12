"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AdminOnlyRoute } from "@/components/AdminOnlyRoute";
import { useAuth } from "@/hooks/useAuth";

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "DA" },
  { label: "Clients", href: "/admin/clients", icon: "CL" },
  { label: "Properties", href: "/admin/properties", icon: "PR" },
  { label: "Cleaners", href: "/admin/cleaners", icon: "CR" },
  { label: "Services", href: "/admin/services", icon: "SV" },
  { label: "Jobs", href: "/admin/jobs", icon: "JB" },
  { label: "Calendar", href: "/admin/calendar", icon: "CA" },
  { label: "Settings", href: "/admin/settings", icon: "SE" },
];

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
                  <span aria-hidden="true">{item.icon}</span>
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
