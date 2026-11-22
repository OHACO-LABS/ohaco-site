/** Server-side DataForSEO keyword metrics provider. Test-stage, no browser imports. */
export const endpoint='https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live';
export const market=Object.freeze({location_code:2840,language_code:'en'});
export function requestBody(values){
  if(!Array.isArray(values))throw Error('Expected keyword array');
  const keywords=[...new Set(values.map(x=>{
    if(typeof x!=='string')throw Error('Invalid keyword');
    const s=x.trim().toLowerCase().replace(/\s+/g,' ');
    if(s.length<2||s.length>80||/[\u0000-\u001f]/.test(s))throw Error('Invalid keyword');
    return s;
  }))];
  if(keywords.length<1||keywords.length>25)throw Error('Pilot limit: 1–25 keywords');
  return [{...market,keywords,search_partners:false}];
}
export async function queryKeywords(values,{live=false,login,password,fetcher=fetch}={}){
  const tasks=requestBody(values);
  if(!live)return {mode:'dry-run',endpoint,request:tasks[0],billableWhenLive:true};
  if(!login||!password)throw Error('Missing server-side DataForSEO credentials');
  const auth=Buffer.from(login+':'+password,'utf8').toString('base64');
  const res=await fetcher(endpoint,{method:'POST',
    headers:{Authorization:'Basic '+auth,'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(tasks),signal:AbortSignal.timeout(20000)});
  if(!res.ok)throw Error('DataForSEO HTTP status '+res.status);
  const data=await res.json();
  if(data?.status_code!==20000||data.tasks?.length!==1||data.tasks[0]?.status_code!==20000||!Array.isArray(data.tasks[0].result)){
    throw Error('DataForSEO task unsuccessful, status '+(data.tasks?.[0]?.status_code??data.status_code??'unknown'));
  }
  const rows=data.tasks[0].result.map(x=>({
    keyword:x.keyword??null,searchVolume:x.search_volume??null,cpcUsd:x.cpc??null,
    competition:x.competition??null,competitionIndex:x.competition_index??null,
    monthlySearches:Array.isArray(x.monthly_searches)?x.monthly_searches.map(m=>({year:m.year,month:m.month,searchVolume:m.search_volume??null})):[]
  }));
  return {mode:'live',provider:'DataForSEO',retrievedAt:new Date().toISOString(),
    market,requested:tasks[0].keywords,reportedCostUsd:data.cost??null,
    rows,missing:tasks[0].keywords.filter(k=>!rows.some(r=>r.keyword===k)),
    note:'Search volume and CPC are estimates; not customer acquisition costs'};
}