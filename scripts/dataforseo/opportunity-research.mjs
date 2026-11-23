/**
 * OHACO service opportunity research — deterministic, offline-first.
 * Groups and scoring are test hypotheses, never facts about market demand.
 * A ranking is withheld until all groups have sufficient *live* metrics.
 * No network requests, secrets, or billable operations in this module.
 */
export const GROUPS=Object.freeze([
  {id:'ai-front-desk',label:'AI front desk / receptionist',keywords:[
    'ai receptionist service','ai virtual receptionist','ai phone answering service','ai front desk software']},
  {id:'contact-center',label:'Contact-center and voice automation',keywords:[
    'conversational ai contact center','ai customer service automation','call center ai solutions','voice ai agents for business']},
  {id:'ai-governance',label:'AI governance and compliance',keywords:[
    'ai governance consulting','ai risk assessment services','ai compliance consulting','ai governance platform']},
  {id:'security-services',label:'AI and cybersecurity services',keywords:[
    'cybersecurity consulting services','ai security assessment','ai red teaming services','cybersecurity training for companies']},
  {id:'enterprise-automation',label:'Enterprise AI and workflow implementation',keywords:[
    'enterprise ai implementation','ai automation consulting','agentic ai consulting','business process automation consulting']}
]);
export const ALL_KEYWORDS=Object.freeze(GROUPS.flatMap(g=>g.keywords));
const normalize=s=>String(s??'').trim().toLowerCase().replace(/\s+/g,' ');
const median=arr=>{
  if(arr.length===0)return null;
  const s=[...arr].sort((a,b)=>a-b),h=Math.floor(s.length/2);
  return s.length%2?s[h]:(s[h-1]+s[h])/2;
};
const usable=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
export function createOpportunityPlan(){
  if(new Set(ALL_KEYWORDS).size!==ALL_KEYWORDS.length)throw Error('Seed keywords must be unique');
  if(ALL_KEYWORDS.length>25)throw Error('Keyword pilot limit exceeded');
  return {project:'ohaco-service-demand-discovery',status:'research-plan',
    market:{location_code:2840,language_code:'en'},
    keywords:[...ALL_KEYWORDS],
    groups:GROUPS.map(g=>({id:g.id,label:g.label,keywords:[...g.keywords]})),
    taskCountWhenApproved:1,
    provider:'DataForSEO Google Ads Search Volume',
    collectionEnabled:false,
    warning:'Plan only. No search demand, conversion or budget evidence has been collected.'};
}
export function analyzeOpportunityMetrics(input){
  const mode=input?.mode;
  if(!['live','fixture','dry-run'].includes(mode))throw Error('Unknown input mode');
  const records=Array.isArray(input.rows)?input.rows:[];
  const keys=new Set(ALL_KEYWORDS);
  const seen=new Map();
  for(const r of records){
    if(!r||typeof r!=='object')throw Error('Invalid keyword record');
    const keyword=normalize(r.keyword);
    if(!keys.has(keyword))continue;
    if(seen.has(keyword))throw Error('Duplicate keyword record: '+keyword);
    seen.set(keyword,r);
  }
  const groups=GROUPS.map(g=>{
    const items=g.keywords.map(keyword=>({keyword,row:seen.get(keyword)??null}));
    const withVolume=items.filter(x=>usable(x.row?.searchVolume));
    const cpcs=items.map(x=>x.row?.cpcUsd).filter(usable);
    const total=withVolume.reduce((sum,x)=>sum+x.row.searchVolume,0);
    return {
      id:g.id,label:g.label,keywords:[...g.keywords],
      measuredVolumeCount:withVolume.length,keywordCount:g.keywords.length,
      volumeCoverage:withVolume.length/g.keywords.length,
      partialSearchVolume:withVolume.length?total:null,
      medianCpcUsd:median(cpcs),
      keywordMetrics:items.map(({keyword,row})=>({
        keyword,searchVolume:usable(row?.searchVolume)?row.searchVolume:null,
        cpcUsd:usable(row?.cpcUsd)?row.cpcUsd:null,
        competition:row?.competition??null
      })),
      caveat:'Search volumes overlap and cannot be summed as unique buyers. CPC is not client budget.'
    };
  });
  const enough=groups.every(g=>g.measuredVolumeCount>=2);
  const eligible=mode==='live'&&input.provider==='DataForSEO'&&
    typeof input.retrievedAt==='string'&&Boolean(Date.parse(input.retrievedAt))&&enough;
  const maxVolume=Math.max(1,...groups.map(g=>Math.log1p(g.partialSearchVolume??0)));
  const maxCpc=Math.max(1,...groups.map(g=>g.medianCpcUsd??0));
  const searchSignalRanking=eligible?groups.map(g=>{
    // Triage heuristic only, not probability of conversion or contract value.
    const volumeIndex=Math.log1p(g.partialSearchVolume??0)/maxVolume;
    const cpcIndex=(g.medianCpcUsd??0)/maxCpc;
    const score=Math.round(100*(0.7*volumeIndex+0.3*cpcIndex));
    return {id:g.id,label:g.label,searchSignalIndex:score};
  }).sort((a,b)=>b.searchSignalIndex-a.searchSignalIndex):[];
  return {project:'ohaco-service-demand-discovery',mode,
    provider:input.provider??null,retrievedAt:input.retrievedAt??null,
    reportedCostUsd:usable(input.reportedCostUsd)?input.reportedCostUsd:null,
    seedKeywordCount:ALL_KEYWORDS.length,groups,
    status:eligible?'search-signals-available':'insufficient-live-evidence',
    searchSignalRanking,
    commercialRanking:null,
    commercialReadiness:'Not assessed: validate buyer urgency, procurement access, budgets, implementation economics, and expansion fit with independent evidence.',
    caveats:[
      'Search demand is a directional proxy, not proof that buyers will purchase a consulting service.',
      'Google Ads CPC and competition do not measure enterprise contract value or sales conversion.',
      'The search signal index is a heuristic for deciding what to research, not a forecast.',
      'Sandbox/fixture data must never be represented as market observations.'
    ]};
}
