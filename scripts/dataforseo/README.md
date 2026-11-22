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

## Approved one-request smoke test — pending private credentials
The founder has approved a **single small live DataForSEO API request** for test-stage validation, but has **not approved creating/deploying hosting resources**. The connected Render workspace currently lists **zero services**, so there is no isolated running service on which to configure private values. The prior screenshot shows a masked password and incomplete Base64 text. No production credential can safely be recovered from it; do not ask the founder to paste the value into a chat, PR, ticket, or client-side variable.

**Local private execution (developer workstation only):**

```bash
node --test scripts/dataforseo/client.test.mjs
node scripts/dataforseo/run.mjs --keywords="hubspot consultant,ai governance consultant"
bash scripts/dataforseo/private-live-test.sh I_APPROVE_ONE_PAID_REQUEST
```

The interactive script reads login and password directly from a terminal (password input hidden); it makes exactly one explicit billable call containing two low-sensitivity keywords and performs no automatic retries. It does not print secret values or store them in a file. Do not execute on shared terminals or terminals with verbose environment/process tracing. Check provider billing after the call and record only keyword metrics, response status and billed cost.

**When an isolated Render development service exists:** set `DATAFORSEO_API_LOGIN` and `DATAFORSEO_API_PASSWORD` via the Render Environment dashboard. Choose **Save only** to avoid triggering a deploy; the values are not active at runtime until a later authorized deploy. Do not add DataForSEO credentials to an OHACO production web service merely to test the integration. If the service is managed by Blueprint configuration, review its source-of-truth and reconciliation first.

**Result status:** local standalone fixture suite ran **6/6 passing**; this is not a live authentication test and is not a verified CI run of the exact remote GitHub head. `--live` on this branch has not been executed. Do not report live data or connection success before the private one-request check actually returns a successful response.

### Upgrade/rotation
Use a dedicated low-privilege API login with budget controls if supported by the account; rotate via the provider settings and replace the two server-side secret values without code changes. Review API usage/costs per research batch. Never store Base64 Basic Authentication headers as a secret management substitute.
