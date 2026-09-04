import "server-only";

import fs from "node:fs";

import { getVercelOidcToken } from "@vercel/oidc";
import {
  applicationDefault,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type FirebaseAdminEnvironment = {
  firebaseProjectId: string;
  gcpProjectId: string;
  projectNumber: string;
  serviceAccountEmail: string;
  workloadIdentityPoolId: string;
  workloadIdentityPoolProviderId: string;
  audience: string;
};

const ADMIN_APP_NAME = "parkingoath-web-admin";
const OIDC_TOKEN_PATH = "/tmp/parkingoath-vercel-oidc-token";
const EXTERNAL_ACCOUNT_CONFIG_PATH = "/tmp/parkingoath-google-external-account.json";
let adminAppPromise: Promise<App> | null = null;

function requireEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }
  return value;
}

function getFirebaseAdminEnvironment(): FirebaseAdminEnvironment {
  const environment = {
    firebaseProjectId: requireEnvironmentValue("FIREBASE_PROJECT_ID"),
    gcpProjectId: requireEnvironmentValue("GCP_PROJECT_ID"),
    projectNumber: requireEnvironmentValue("GCP_PROJECT_NUMBER"),
    serviceAccountEmail: requireEnvironmentValue("GCP_SERVICE_ACCOUNT_EMAIL"),
    workloadIdentityPoolId: requireEnvironmentValue(
      "GCP_WORKLOAD_IDENTITY_POOL_ID",
    ),
    workloadIdentityPoolProviderId: requireEnvironmentValue(
      "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID",
    ),
    audience: requireEnvironmentValue("GCP_AUDIENCE"),
  };

  if (environment.firebaseProjectId !== environment.gcpProjectId) {
    throw new Error("FIREBASE_PROJECT_ID and GCP_PROJECT_ID must identify the same project.");
  }

  const expectedAudience =
    `https://iam.googleapis.com/projects/${environment.projectNumber}` +
    `/locations/global/workloadIdentityPools/${environment.workloadIdentityPoolId}` +
    `/providers/${environment.workloadIdentityPoolProviderId}`;
  if (environment.audience !== expectedAudience) {
    throw new Error("GCP_AUDIENCE does not match the configured workload identity provider.");
  }

  return environment;
}

function getEmulatorHosts(): string[] {
  return [
    process.env.FIREBASE_AUTH_EMULATOR_HOST,
    process.env.FIRESTORE_EMULATOR_HOST,
  ].filter(Boolean) as string[];
}

function getExistingAdminApp(): App | undefined {
  return getApps().find((app) => app.name === ADMIN_APP_NAME);
}

async function prepareExternalAccountCredential(environment: FirebaseAdminEnvironment) {
  const oidcToken = await getVercelOidcToken({ audience: environment.audience });
  fs.writeFileSync(OIDC_TOKEN_PATH, oidcToken, { encoding: "utf8", mode: 0o600 });

  // STS identifies the provider with a protocol-relative resource name, while
  // the Vercel token uses the HTTPS form above in its `aud` claim.
  const externalAccountAudience =
    `//iam.googleapis.com/projects/${environment.projectNumber}` +
    `/locations/global/workloadIdentityPools/${environment.workloadIdentityPoolId}` +
    `/providers/${environment.workloadIdentityPoolProviderId}`;
  const credentialConfig = {
    type: "external_account",
    audience: externalAccountAudience,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url:
      "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/" +
      `${environment.serviceAccountEmail}:generateAccessToken`,
    credential_source: {
      file: OIDC_TOKEN_PATH,
      format: { type: "text" },
    },
  };
  fs.writeFileSync(EXTERNAL_ACCOUNT_CONFIG_PATH, JSON.stringify(credentialConfig), {
    encoding: "utf8",
    mode: 0o600,
  });
  process.env.GOOGLE_APPLICATION_CREDENTIALS = EXTERNAL_ACCOUNT_CONFIG_PATH;
}

async function getAdminApp(): Promise<App> {
  const firebaseProjectId = requireEnvironmentValue("FIREBASE_PROJECT_ID");
  const emulatorHosts = getEmulatorHosts();
  if (emulatorHosts.length) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Firebase Admin emulators cannot be enabled in production.");
    }
    if (emulatorHosts.some((host) => !/^(localhost|127\.0\.0\.1):\d+$/.test(host))) {
      throw new Error("Firebase Admin emulator hosts must use localhost or 127.0.0.1.");
    }
    return (
      getExistingAdminApp() ?? initializeApp({ projectId: firebaseProjectId }, ADMIN_APP_NAME)
    );
  }

  const environment = getFirebaseAdminEnvironment();
  // Refresh the file-sourced subject token on every server request. The Google
  // auth client caches its short-lived access token and rereads this file when
  // it needs to exchange a fresh one.
  await prepareExternalAccountCredential(environment);
  const existingApp = getExistingAdminApp();
  if (existingApp) return existingApp;

  if (!adminAppPromise) {
    adminAppPromise = Promise.resolve(
      initializeApp(
        {
          credential: applicationDefault(),
          projectId: environment.firebaseProjectId,
        },
        ADMIN_APP_NAME,
      ),
    ).catch((error) => {
      adminAppPromise = null;
      throw error;
    });
  }
  return adminAppPromise;
}

export async function getAdminDb(): Promise<Firestore> {
  return getFirestore(await getAdminApp());
}

export async function getAdminAuth(): Promise<Auth> {
  return getAuth(await getAdminApp());
}
