# OHACO commercial research pilot — decision memo (2026-11-22)

**Status:** design / draft, not an operating service. DataForSEO account-level access is currently paused with task status `40201`. Paid requests, public endpoints, automated scheduling, and production deployments remain disabled.

## Decision

Ship one shared **Search & AI Visibility Evidence Report** pilot, with two modular service lines:
1. **AI Visibility & Citation Monitoring (primary).** Given brand/domain, direct competitors, target geography, and a frozen set of buyer questions, report brand mentions, *separate* source citations, co-mentioned competitors, source domains, response/model metadata, and time-series comparisons. Identify opportunities with explicit evidence and uncertainty.
2. **Search Demand & Competitive Opportunity (secondary).** For a small keyword set, present Google Ads demand/CPC/competition, Google Organic positions and SERP features, top competitor URLs, and recommendations. Preserve provider provenance for results corrected through `resolve_poisoned_results`.

Do not turn either into a general-purpose SEO agency or a custom AI data platform. Prefer DataForSEO's documented templates as evaluation baselines, not as assumed validated performance. Custom OHACO differentiation: quality control, governance, interpretation, and client-specific actions.

## Published platform evidence

- AI Optimization API combines LLM mentions, model responses, and AI search metrics: https://dataforseo.com/ai-optimization-api
- DataForSEO's *Detailed AI Visibility Report* skill compares mentions vs. citations across assistants; use as reference template: https://dataforseo.com/templates/ai-visibility-report-with-dataforseo-claude-code/
- Existing organic SERP Live and Google Ads keyword API adapters are draft-only; current Google Ads adapter has a 25-keyword pilot cap.
- Free sandbox emits sample data, **not genuine market observations**: https://docs.dataforseo.com/v3/appendix-sandbox/
- API task status 40201 is account restriction requiring provider review: https://docs.dataforseo.com/v3/appendix-errors/

## Proposed minimum service package (hypotheses; not established client pricing)

### One-time research assessment
- Inputs: client brand/domain; 2–3 competitors; 10–15 buyer-intent prompts; 10–25 seed keywords; one U.S. market.
- Outputs: baseline search-and-AI evidence report (PDF), supporting CSV, prioritized 30-day corrective actions, recorded methodology, data date and limitations.
- Suggested *test* commercial range: $750–$1,500 per assessment, to validate with buyer interviews before advertising.

### Monthly monitored service
- Re-run same prompts/keywords under a documented comparable configuration.
- Alert on meaningful changes with confidence qualifications; preserve before/after evidence.
- Suggested *test* commercial range: $250–$750/month per client, before scope, labor, API costs and buyer demand are established.

## Integration contracts

1. **Provider access:** authenticated server-only credentials stored in Render; no secrets in repository or browser. Explicit provider/endpoint allowlist and caller authorization.
2. **Controlled collection:** request registry, maximum prompt/task counts, monthly budgets, cost-by-client attribution; no retries on account restriction or billing errors.
3. **Normalization:** distinguish AI assistant **mention** from URL **citation**; record model, platform, prompt, locale, run timestamp, source method, and provider task ID.
4. **Result quality:** store organic result `checks`, `from_web`, and resolution settings; never infer that verification succeeded merely because `from_web` is absent.
5. **Privacy and governance:** client approvals for domains/prompts, retention schedule, encrypted credentials, tenant-separated storage, redacted diagnostics, human review of reports.
6. **Reporting:** no fabricated rankings, metrics, or case studies. Sandbox fixtures labelled sample only; market claims require actual authorized results.
7. **Delivery:** static report + CSV first; dashboard and alerting only after repeat customers justify them.

## Build-vs-buy choices

| Capability | Decision |
| --- | --- |
| Google keyword metrics | Use DataForSEO existing Google Ads API |
| Google Organic SERP and result correction | Use DataForSEO, preserve provenance |
| AI mention/citation collection | Evaluate DataForSEO AI Optimization API and its report template; no scraping build |
| Report generation | OHACO-owned templates and interpretation |
| Client onboarding & scopes | Lightweight form and manual approval initially |
| Scheduling, dashboards, agent orchestration | Defer until paid pilot confirms demand |
| Full enterprise AI data governance | Separate advisory/implementation engagement; not dependent on DataForSEO |

## Execution gates

- [x] Credentials authenticated against free User Data endpoint on earlier test.
- [x] Account verification barrier `40104` is no longer returned in latest sandbox probe.
- [ ] DataForSEO support resolves account restriction `40201`.
- [ ] Independently execute offline tests against exact draft branch.
- [ ] Validate price and API shape for chosen AI Optimization endpoints, including token-variable charges.
- [ ] Run one approved narrow live request after access restored, record actual provider task/cost/status and output quality.
- [ ] Build and review sample report using **clearly marked synthetic fixture data**.
- [ ] Interview 3 potential buyers and validate price/value before investing in dashboards.
- [ ] Obtain separate authorization before merging PR or deploying commercial endpoints.

## Suggested acceptance criteria for pilot

- One brand and at least two competitors; documented inputs and coverage.
- 100% of cited URLs linked to original provider record and collection date.
- Every claim distinguishes an observed metric, an inference, or a recommendation.
- Cost ledger and request count visible for each assessment.
- Report can be regenerated deterministically from saved fixture/provider payload.
- Single-client failure cannot leak other client data or authorization.

## Immediate next engineering actions, no paid API calls

1. Review and run existing adapter fixture suites locally/CI; correct any failures.
2. Create synthetic report fixture and reporting schema.
3. Evaluate the provider's existing AI visibility template and identify missing OHACO capabilities.
4. Wait for written confirmation that 40201 is lifted before live/sandbox retests.
