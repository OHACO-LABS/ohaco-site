# OHACO opportunity discovery — offline pilot

This is a **research triage tool**, not an autonomous lead-generation or contract-value predictor.

## Current access state

- DataForSEO user data authentication previously succeeded; keyword sandbox subsequently returned task status **40201**, which blocks keyword collection. OHACO has contacted DataForSEO.
- DataForSEO account credentials are already held in private Render configuration. **Do not paste or copy them here.**
- No billable requests, deployments to production, or automated collection are enabled by this tool.

## Run offline

```sh
node --test scripts/dataforseo/*.test.mjs
node scripts/dataforseo/opportunity-cli.mjs plan
```

The plan contains **20 seed keywords / five service themes** in one U.S. English batch (under the 25-keyword limit of the existing pilot adapter).

## When provider access is restored

1. Review the 20 seed keywords for suitability and remove ambiguous terms.
2. Use the existing DataForSEO Google Ads Search Volume adapter only after separate approval for a tightly bounded billable call.
3. Capture a normalized result **without secrets**, e.g.:

```json
{
  "mode": "live",
  "provider": "DataForSEO",
  "retrievedAt": "2026-11-23T00:00:00Z",
  "reportedCostUsd": 0.01,
  "rows": [
    {"keyword": "ai receptionist service", "searchVolume": 100, "cpcUsd": 8.0}
  ]
}
```

**The values above are synthetic examples; never describe them as observations.** Save actual records to a noncommitted local file. Run:

```sh
node scripts/dataforseo/opportunity-cli.mjs analyze ./private-dataforseo-result.json
```

4. The analyzer requires at least two measured keywords **in each** category before it emits a *directional search-signal index*. It **never** calculates commercial rankings, buyer purchase probability, contract size, or sales conversion from keyword statistics.
5. Add provider-backed intent/suggestion endpoints and direct buyer qualification evidence in a later stage, with explicit cost controls.

## Five topics

- AI reception and front desk
- Contact-center / enterprise voice automation
- AI governance and compliance
- AI/cybersecurity advisory and training
- Enterprise AI and workflow implementation

## Interpretation limits

Keyword demand and CPC are directional research signals; high CPC is **not** proof of high annual contract value or successful conversion. Search volumes can overlap across keywords. Keyword competition refers to the Google Ads market, not the number of qualified consulting competitors.

For enterprise opportunity ranking, independently validate: operational pain, urgency, number of possible accounts, buyer role and access, purchasing window, current software spend, deployment risk, delivery costs, recurring service potential, and budget range.

Avoid both premature vertical narrowing (including CRE) and overfitting to the AI-receptionist concept. Keep candidates open until real evidence supports prioritization.
