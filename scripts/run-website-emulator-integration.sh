#!/bin/sh
set -eu
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$script_dir/.."
: "${FIREBASE_AUTH_EMULATOR_HOST:?Auth emulator required}"
: "${FIRESTORE_EMULATOR_HOST:?Firestore emulator required}"
: "${FUNCTIONS_EMULATOR_HOST:?Functions emulator required}"

export GCLOUD_PROJECT="demo-parkingoath-ambassadors"
export NEXT_PUBLIC_FIREBASE_API_KEY="fake-api-key"
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="localhost"
export NEXT_PUBLIC_FIREBASE_PROJECT_ID="$GCLOUD_PROJECT"
export NEXT_PUBLIC_USE_FIREBASE_EMULATORS="true"
export NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST="$FIREBASE_AUTH_EMULATOR_HOST"
export NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST="$FUNCTIONS_EMULATOR_HOST"
export FIREBASE_PROJECT_ID="$GCLOUD_PROJECT"
export FIREBASE_CLIENT_EMAIL="local-emulator@example.test"
export FIREBASE_PRIVATE_KEY="emulator-does-not-use-this-private-key"
export AMBASSADOR_REFERRAL_SIGNING_SECRET="local-emulator-signing-secret-at-least-32-characters"
export WEBSITE_TEST_URL="http://127.0.0.1:3100"

node scripts/seed-ambassador-emulators.mjs
npm run dev -- --hostname 127.0.0.1 --port 3100 > /tmp/parkingoath-website-emulator.log 2>&1 &
website_pid=$!
trap 'kill "$website_pid" 2>/dev/null || true' EXIT INT TERM

attempt=0
until curl -fsS "$WEBSITE_TEST_URL/login" >/dev/null; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 60 ]; then
    tail -80 /tmp/parkingoath-website-emulator.log
    exit 1
  fi
  sleep 1
done
node scripts/website-emulator-integration.mjs
