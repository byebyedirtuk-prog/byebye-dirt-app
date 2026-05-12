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

class AuthTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthTimeoutError";
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new AuthTimeoutError(message));
    }, timeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const authStateTimeoutId = window.setTimeout(() => {
      console.error("[auth] Firebase auth state did not resolve before timeout.");
      setAuthError("Firebase authentication did not finish loading. Please refresh and try again.");
      setLoading(false);
      setProfileLoading(false);
    }, 12000);

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      window.clearTimeout(authStateTimeoutId);
      console.info("[auth] Auth state resolved.", {
        signedIn: Boolean(nextUser),
      });
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
        const token = await withTimeout(
          nextUser.getIdToken(),
          10000,
          "Firebase ID token request timed out.",
        );
        const response = await withTimeout(
          fetch("/api/auth/bootstrap", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }),
          12000,
          "The user profile request timed out.",
        );

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
        if (error instanceof AuthTimeoutError) {
          setAuthError(error.message);
          setProfile(null);
          return;
        }

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

    return () => {
      window.clearTimeout(authStateTimeoutId);
      unsubscribe();
    };
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
