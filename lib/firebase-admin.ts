import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type FirebaseAdminEnvironment = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function requireEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

function getFirebaseAdminEnvironment(): FirebaseAdminEnvironment {
  return {
    projectId: requireEnvironmentValue("FIREBASE_PROJECT_ID"),
    clientEmail: requireEnvironmentValue("FIREBASE_CLIENT_EMAIL"),
    privateKey: requireEnvironmentValue("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  };
}

function getAdminApp(): App {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const environment = getFirebaseAdminEnvironment();
  const emulatorHosts = [
    process.env.FIREBASE_AUTH_EMULATOR_HOST,
    process.env.FIRESTORE_EMULATOR_HOST,
  ].filter(Boolean) as string[];
  if (emulatorHosts.length) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Firebase Admin emulators cannot be enabled in production.");
    }
    if (emulatorHosts.some((host) => !/^(localhost|127\.0\.0\.1):\d+$/.test(host))) {
      throw new Error("Firebase Admin emulator hosts must use localhost or 127.0.0.1.");
    }
    return initializeApp({ projectId: environment.projectId });
  }
  return initializeApp({
    credential: cert(environment),
    projectId: environment.projectId,
  });
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
