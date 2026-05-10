"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AppUserProfile } from "@/lib/auth";

type AuthContextValue = {
  user: User | null;
  profile: AppUserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  authError: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type BootstrapResponse = {
  profile?: AppUserProfile;
  error?: string;
  detail?: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setLoading(false);
      setAuthError("");

      if (!nextUser) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);

      try {
        console.info("[auth] Starting profile bootstrap.");
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 12000);
        const token = await nextUser.getIdToken();
        const response = await fetch("/api/auth/bootstrap", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        window.clearTimeout(timeoutId);
        const data = (await response.json()) as BootstrapResponse;

        if (!response.ok) {
          throw new Error(
            [data.error, data.detail].filter(Boolean).join(" ") ||
              "Could not create or load your user profile.",
          );
        }

        if (!data.profile) {
          throw new Error("Bootstrap response did not include a user profile.");
        }

        console.info("[auth] Profile bootstrap complete.", {
          uid: data.profile.uid,
          role: data.profile.role,
        });

        setProfile(data.profile);
      } catch (error) {
        console.error("Could not load user profile.", error);
        setAuthError(
          error instanceof DOMException && error.name === "AbortError"
            ? "The user profile request timed out. Please refresh and try again."
            : error instanceof Error
              ? error.message
              : "Could not create or load your user profile. Please check Firebase Admin settings and Firestore access.",
        );
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      profileLoading,
      authError,
      login,
      logout,
    }),
    [authError, loading, login, logout, profile, profileLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
