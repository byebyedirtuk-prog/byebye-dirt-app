import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { FirebaseAdminConfigError, getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import type { UserRole } from "@/lib/auth";

export const runtime = "nodejs";

function getBearerToken(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length);
}

function serializeTimestamp(value: unknown) {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  return null;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error.";
}

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    return String(error.code);
  }

  return null;
}

export async function POST(request: NextRequest) {
  const token = getBearerToken(request);

  if (!token) {
    console.warn("[auth/bootstrap] Missing bearer token.");

    return NextResponse.json({ error: "Missing authorization token." }, { status: 401 });
  }

  try {
    console.info("[auth/bootstrap] Starting user bootstrap.");
    const auth = getAdminAuth();
    const db = getAdminDb();
    const decodedToken = await auth.verifyIdToken(token);
    console.info("[auth/bootstrap] Token verified.", { uid: decodedToken.uid });

    const userRecord = await auth.getUser(decodedToken.uid);
    const profileRef = db.collection("users").doc(decodedToken.uid);
    const profileSnapshot = await profileRef.get();
    const email = userRecord.email ?? decodedToken.email ?? "";

    if (!profileSnapshot.exists) {
      console.info("[auth/bootstrap] Creating users/{uid}.", { uid: decodedToken.uid });

      await profileRef.set({
        uid: decodedToken.uid,
        email,
        fullName: userRecord.displayName ?? "não especificado",
        role: "cleaner" satisfies UserRole,
        onboardingCompleted: false,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      console.info("[auth/bootstrap] users/{uid} created.", { uid: decodedToken.uid });
    } else {
      console.info("[auth/bootstrap] Updating existing users/{uid}.", { uid: decodedToken.uid });

      await profileRef.set(
        {
          email: email || profileSnapshot.data()?.email || "",
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }

    const refreshedProfileSnapshot = await profileRef.get();
    const profile = refreshedProfileSnapshot.data();

    if (!profile) {
      console.error("[auth/bootstrap] users/{uid} write/read verification failed.", {
        uid: decodedToken.uid,
      });

      return NextResponse.json({ error: "Profile could not be loaded." }, { status: 500 });
    }

    console.info("[auth/bootstrap] Bootstrap complete.", {
      uid: decodedToken.uid,
      role: profile.role,
    });

    return NextResponse.json({
      profile: {
        uid: profile.uid,
        email: profile.email,
        fullName: profile.fullName,
        role: profile.role,
        onboardingCompleted: profile.onboardingCompleted,
        createdAt: serializeTimestamp(profile.createdAt),
        updatedAt: serializeTimestamp(profile.updatedAt),
      },
    });
  } catch (error) {
    const code = getErrorCode(error);
    const message = getErrorMessage(error);

    console.error("[auth/bootstrap] User bootstrap failed.", {
      code,
      message,
    });

    if (error instanceof FirebaseAdminConfigError) {
      return NextResponse.json(
        {
          error: "Firebase Admin credentials are missing.",
          detail: message,
        },
        { status: 500 },
      );
    }

    if (code?.includes("permission-denied") || code === "7") {
      return NextResponse.json(
        {
          error: "Firestore permission failure.",
          detail: message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "User bootstrap failed.",
        detail: message,
      },
      { status: 500 },
    );
  }
}
