#!/usr/bin/env bash
# One explicitly approved DataForSEO query. Never puts credentials in argv, files or Git.
set -euo pipefail

if [[ "${1:-}" != "I_APPROVE_ONE_PAID_REQUEST" ]]; then
  printf '%s\n' 'This makes one billable DataForSEO request.' \
    'Run: bash scripts/dataforseo/private-live-test.sh I_APPROVE_ONE_PAID_REQUEST'
  exit 2
fi

if [[ ! -r /dev/tty ]]; then
  echo 'Interactive private terminal required. Not permitted in unattended CI.' >&2
  exit 2
fi

read -r -p 'DataForSEO API login: ' TEST_API_LOGIN </dev/tty
read -r -s -p 'DataForSEO API password (hidden): ' TEST_API_PASSWORD </dev/tty
printf '\n'
trap 'unset TEST_API_LOGIN TEST_API_PASSWORD' EXIT
if [[ -z "$TEST_API_LOGIN" || -z "$TEST_API_PASSWORD" ]]; then
  echo 'Missing credential. No API request made.' >&2
  exit 2
fi
# One provider POST request, no retry. The password is held in process memory.
DATAFORSEO_API_LOGIN="$TEST_API_LOGIN" DATAFORSEO_API_PASSWORD="$TEST_API_PASSWORD" \
  node scripts/dataforseo/run.mjs \
    --keywords="hubspot consultant,ai governance consultant" --live
