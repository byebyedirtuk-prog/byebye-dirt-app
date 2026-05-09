"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export function AdminOnlyRoute({ children }: { children: ReactNode }) {
  const { loading, profile, profileLoading, user } = useAuth();
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

    if (profile?.role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [isCheckingAccess, profile?.role, router, user]);

  if (isCheckingAccess) {
    return (
      <main className="center-screen">
        <p className="muted-text">Checking permissions...</p>
      </main>
    );
  }

  if (!user || profile?.role !== "admin") {
    return null;
  }

  return children;
}
