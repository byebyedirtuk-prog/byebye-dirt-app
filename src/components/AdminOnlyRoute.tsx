"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export function AdminOnlyRoute({ children }: { children: ReactNode }) {
  const { authError, loading, profile, profileLoading, user } = useAuth();
  const router = useRouter();
  const isCheckingAccess = loading || profileLoading;

  useEffect(() => {
    if (isCheckingAccess) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (authError && !profile) {
      return;
    }

    if (profile?.role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [authError, isCheckingAccess, profile, profile?.role, router, user]);

  if (isCheckingAccess) {
    return (
      <main className="center-screen">
        <div className="simple-panel">
          <p className="muted-text">Checking permissions...</p>
          {authError && <p className="error-text">{authError}</p>}
        </div>
      </main>
    );
  }

  if (user && authError && !profile) {
    return (
      <main className="center-screen">
        <div className="simple-panel">
          <p className="eyebrow">Authentication issue</p>
          <h1>Could not load your admin profile</h1>
          <p className="error-text">{authError}</p>
        </div>
      </main>
    );
  }

  if (!user || profile?.role !== "admin") {
    return null;
  }

  return children;
}
