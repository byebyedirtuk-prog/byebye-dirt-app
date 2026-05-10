"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authError, loading, profileLoading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const isCheckingAccess = loading || (!isLoginPage && user && profileLoading);

  useEffect(() => {
    if (!isCheckingAccess && !user && !isLoginPage) {
      router.replace("/login");
    }

    if (!isCheckingAccess && user && isLoginPage) {
      router.replace("/");
    }
  }, [isCheckingAccess, isLoginPage, router, user]);

  if (isCheckingAccess) {
    return (
      <main className="center-screen">
        <div className="simple-panel">
          <p className="muted-text">Checking session...</p>
          {authError && <p className="error-text">{authError}</p>}
        </div>
      </main>
    );
  }

  if (!user && !isLoginPage) {
    return null;
  }

  if (user && isLoginPage) {
    return null;
  }

  return children;
}
