import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

let emulatorsConnected = false;

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing public Firebase configuration: ${name}`);
  return value;
}

function getFirebaseClientConfig() {
  return {
    apiKey: required("NEXT_PUBLIC_FIREBASE_API_KEY", process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: required("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: required("NEXT_PUBLIC_FIREBASE_PROJECT_ID", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  };
}

export function getClientAuth() {
  const app = getApps()[0] ?? initializeApp(getFirebaseClientConfig());
  const auth = getAuth(getApp(app.name));
  connectLocalEmulators(auth.app);
  return auth;
}

function emulatorAddress(name: string, value: string | undefined, fallback: string) {
  const address = value || fallback;
  const match = /^(localhost|127\.0\.0\.1):(\d+)$/.exec(address);
  if (!match) throw new Error(`${name} must use localhost or 127.0.0.1.`);
  return { host: match[1], port: Number(match[2]) };
}

function connectLocalEmulators(app: ReturnType<typeof getApp>) {
  if (emulatorsConnected || process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS !== "true") return;
  if (process.env.NODE_ENV === "production") {
    throw new Error("Firebase emulators cannot be enabled in production.");
  }
  const authAddress = emulatorAddress(
    "NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST",
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
    "127.0.0.1:9099",
  );
  const functionsAddress = emulatorAddress(
    "NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST",
    process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST,
    "127.0.0.1:5001",
  );
  connectAuthEmulator(getAuth(app), `http://${authAddress.host}:${authAddress.port}`, { disableWarnings: true });
  connectFunctionsEmulator(getFunctions(app, "us-central1"), functionsAddress.host, functionsAddress.port);
  emulatorsConnected = true;
}

export function getClientFunctions() {
  const auth = getClientAuth();
  return getFunctions(auth.app, "us-central1");
}
