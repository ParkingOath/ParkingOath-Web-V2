import "server-only";

import { getVercelOidcToken } from "@vercel/oidc";
import {
  getApps,
  initializeApp,
  type App,
  type Credential,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { ExternalAccountClient } from "google-auth-library";

type FirebaseAdminEnvironment = {
  firebaseProjectId: string;
  gcpProjectId: string;
  projectNumber: string;
  serviceAccountEmail: string;
  workloadIdentityPoolId: string;
  workloadIdentityPoolProviderId: string;
  audience: string;
};

const FIREBASE_ADMIN_SCOPES = [
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/identitytoolkit",
  "https://www.googleapis.com/auth/userinfo.email",
];

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

function createVercelOidcCredential(
  environment: FirebaseAdminEnvironment,
): Credential {
  // Google's STS request identifies the provider with a protocol-relative full
  // resource name, while the Vercel OIDC token uses the provider's HTTPS URL in
  // its `aud` claim. Keep these two representations deliberately separate.
  const externalAccountAudience =
    `//iam.googleapis.com/projects/${environment.projectNumber}` +
    `/locations/global/workloadIdentityPools/${environment.workloadIdentityPoolId}` +
    `/providers/${environment.workloadIdentityPoolProviderId}`;
  const authClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: externalAccountAudience,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url:
      "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/" +
      `${environment.serviceAccountEmail}:generateAccessToken`,
    scopes: FIREBASE_ADMIN_SCOPES,
    subject_token_supplier: {
      getSubjectToken: () =>
        getVercelOidcToken({ audience: environment.audience }),
    },
  });

  if (!authClient) {
    throw new Error("Unable to create the Google external account client.");
  }

  return {
    async getAccessToken() {
      const response = await authClient.getAccessToken();
      const token = response.token;
      const expiryDate = authClient.credentials.expiry_date;
      if (!token || !expiryDate) {
        throw new Error("Google did not return a usable access token for Firebase Admin.");
      }

      return {
        access_token: token,
        expires_in: Math.max(1, Math.floor((expiryDate - Date.now()) / 1000)),
      };
    },
  };
}

function getAdminApp(): App {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const firebaseProjectId = requireEnvironmentValue("FIREBASE_PROJECT_ID");
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
    return initializeApp({ projectId: firebaseProjectId });
  }

  const environment = getFirebaseAdminEnvironment();
  return initializeApp({
    credential: createVercelOidcCredential(environment),
    projectId: environment.firebaseProjectId,
  });
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
