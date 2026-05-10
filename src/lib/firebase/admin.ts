import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export class FirebaseAdminConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirebaseAdminConfigError";
  }
}

function getPrivateKey() {
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getAdminEnvStatus() {
  return {
    projectId: Boolean(process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    clientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    privateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY),
  };
}

function getServiceAccountProjectId(clientEmail: string) {
  return clientEmail.match(/@(.+)\.iam\.gserviceaccount\.com$/)?.[1] ?? null;
}

function assertFirebaseProjectMatch(projectId: string, clientEmail: string) {
  const publicProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const serviceAccountProjectId = getServiceAccountProjectId(clientEmail);

  if (publicProjectId && publicProjectId !== projectId) {
    throw new FirebaseAdminConfigError(
      "Firebase project mismatch: NEXT_PUBLIC_FIREBASE_PROJECT_ID and FIREBASE_PROJECT_ID must match.",
    );
  }

  if (serviceAccountProjectId && serviceAccountProjectId !== projectId) {
    throw new FirebaseAdminConfigError(
      "Firebase project mismatch: FIREBASE_CLIENT_EMAIL must belong to FIREBASE_PROJECT_ID.",
    );
  }
}

export function getFirebaseAdminApp() {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (projectId && clientEmail && privateKey) {
    assertFirebaseProjectMatch(projectId, clientEmail);

    console.info("[firebase-admin] Initializing Firebase Admin SDK.", {
      projectIdExists: true,
      clientEmailExists: true,
      privateKeyExists: true,
    });

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  const envStatus = getAdminEnvStatus();
  console.error("[firebase-admin] Missing Firebase Admin credentials.", envStatus);

  throw new FirebaseAdminConfigError(
    "Firebase Admin credentials are missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local, then restart the Next.js server.",
  );
}

export function getAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}
