# OHACO DataForSEO — isolated development sandbox

**Status (Nov 21–22, 2026):** Render cron service successfully deployed and dry-run tested in the OHACO Labs workspace. Credentials authenticate successfully against the free DataForSEO User Data endpoint, but keyword API calls are blocked because **the DataForSEO account has not completed verification** (provider status code **40104**). No production systems have been changed; no keyword search data retrieved.

## Environments

- GitHub draft PR #7, branch `agent/dataforseo-keyword-provider-20261121`
- Render cron: `ohaco-dataforseo-research-sandbox`, ID `crn-dc15khmtlv9c73b4onfg`, workspace OHACO Labs, Virginia region, Starter cron plan
- No public HTTP endpoint, database, or automated keyword collection
- Automatic Git deployments disabled, cron schedule set to January 1 at 00:00 UTC solely because Render requires a schedule
- The default cron behavior is a dry-run with **zero DataForSEO API requests**.

## Server secrets

Configure `DATAFORSEO_API_LOGIN` and `DATAFORSEO_API_PASSWORD` privately in the Render Environment dashboard. These are the API credentials, not the normal DataForSEO website password. Do **not** commit credentials, screenshots or Basic Auth headers to GitHub; do not expose them via browser variables or chat. Rotating the API password requires changing only the private Render environment value.

## Tests and actual diagnostic findings

1. Standalone adapter offline tests: six passing on Node.js 22. The exact committed branch is not yet CI-verified.
2. Render Node.js build and dry-run: successful, no provider requests.
3. First actual production Google Ads Search Volume test: HTTP **401**, before credentials were corrected.
4. Second production Google Ads Search Volume test: HTTP **403**, before account verification. No keyword data retrieved; billing status not independently confirmed.
5. Free credential test `GET https://api.dataforseo.com/v3/appendix/user_data`: HTTP **200**, general and task status both **20000**. Credentials are valid.
6. Free sandbox test `POST https://sandbox.dataforseo.com/v3/keywords_data/google_ads/search_volume/live`: HTTP **403**, JSON general status **40104** (account verification required). No billable API call and no actual keyword data.

**Root cause:** DataForSEO documents status 40104 as `please verify your account before using the api`, requiring completion of email and/or phone verification in the account dashboard. Go to https://app.dataforseo.com/ and complete verification before a further live test. Do not rotate credentials merely to fix status 40104.

## Safety gates

- `OHACO_DATAFORSEO_DIAGNOSTIC`: `disabled` by default. `enabled` triggers a free read-only API authentication probe; `sandbox` triggers a free dummy-keyword API probe.
- `OHACO_DATAFORSEO_LIVE_TEST`: `disabled` by default. A billable request requires exactly `I_APPROVE_ONE_PAID_REQUEST` and a future `OHACO_DATAFORSEO_LIVE_UNTIL` no more than 30 minutes away.
- Every diagnostic and live test is one-shot and manually triggered. No automatic retries. Turn off gates immediately after each test and verify replacement deployment reached `live`.
- Do not repeat the paid production keyword request before verification, billing checks and fresh user authorization.

## References

- Account dashboard: https://app.dataforseo.com/
- DataForSEO errors and 40104: https://docs.dataforseo.com/v3/appendix-errors/
- User Data (free): https://docs.dataforseo.com/v3/appendix/user_data/
- Sandbox (free, dummy data): https://docs.dataforseo.com/v3/appendix-sandbox/
- Google Ads Search Volume Live: https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/
- Official remote MCP endpoint: https://mcp.dataforseo.com/v3/mcp
- Official MCP and OAuth guide: https://dataforseo.com/help-center/connecting-the-remote-dataforseo-mcp-server-using-oauth
