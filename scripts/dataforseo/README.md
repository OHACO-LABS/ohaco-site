# DataForSEO as a test-stage keyword intelligence provider

**Status:** Offline/mock tests only; not connected to a paid DataForSEO account, not deployed. This is a backend/CLI adapter; never import it into browser/React code.

## Secure credentials
Set `DATAFORSEO_API_LOGIN` and `DATAFORSEO_API_PASSWORD` in the server environment or secret manager. **Do not put them in GitHub, .env files checked into source control, client-side VITE_ variables, screenshots or chat.** Base64 is not encryption. Changing the values when credentials rotate requires no code changes. The photographed password is masked and Base64 field is cropped, so the screenshot cannot be used for a complete secure configuration.

## Safe usage
Requires Node 20+; no dependencies.
- Dry run (free, no network): `node scripts/dataforseo/run.mjs --keywords="hubspot consultant,n8n developer"`
- Offline tests: `node --test scripts/dataforseo/client.test.mjs`
- Manually authorized billable test: `node scripts/dataforseo/run.mjs --keywords="hubspot consultant,n8n developer" --live`

Only `--live` makes the paid call, one request with at most 25 terms. Inspect account pricing and remaining balance first; it is not a guaranteed-zero-cost endpoint. Output includes provider, reported cost, search volumes, CPC, competition and monthly trends. The adapter never retries automatically.

## Production gate
Add durable caching, provider-budget limits, job receipts, secret manager provisioning, rate controls, scoped API authentication and legal/security review before exposure through any website or AI agent. Credentials must be configured outside GitHub. Do not connect this into Prompt-Native or Collab Memory.

Docs: https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/
