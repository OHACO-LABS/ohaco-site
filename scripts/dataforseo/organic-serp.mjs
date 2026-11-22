/** OHACO Google Organic SERP adapter — draft-only; no automatic network calls.
 * The caller must explicitly authorize a billable Live call and supply server-only API credentials.
 * Documentation: https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/
 */
export const ORGANIC_LIVE_ENDPOINT='https://api.dataforseo.com/v3/serp/google/organic/live/advanced';
export function organicRequest(keyword,{locationCode=2840,languageCode='en',device='desktop',
  depth=10,resolvePoisonedResults=true,resolveGotoUrls=false,searchParam}={}){
  if(typeof keyword!=='string'||keyword.trim().length<2||keyword.length>700||
      /[\u0000-\u001f]/.test(keyword))throw Error('Invalid search query');
  if(!Number.isInteger(locationCode)||locationCode<=0)throw Error('Invalid location code');
  if(!/^[a-z]{2,3}$/.test(languageCode))throw Error('Invalid language code');
  if(!['desktop','mobile'].includes(device))throw Error('Invalid device');
  if(!Number.isInteger(depth)||depth<1||depth>10)throw Error('Pilot depth limited to 10');
  if(searchParam!==undefined){
    if(typeof searchParam!=='string'||searchParam.length>500)throw Error('Invalid search_param');
    if(resolvePoisonedResults&&/(?:^|[&?])udm=(?:14|web)(?:&|$)/i.test(searchParam))throw Error('Poisoned-result resolution conflicts with Web mode');
  }
  return [{keyword:keyword.trim(),location_code:locationCode,language_code:languageCode,
    device,depth,resolve_poisoned_results:resolvePoisonedResults,
    resolve_goto_urls:resolveGotoUrls,...(searchParam===undefined?{}:{search_param:searchParam})}];
}
export function normalizeOrganicResponse(payload){
  if(payload?.status_code!==20000||!Array.isArray(payload.tasks)||payload.tasks.length!==1||
      payload.tasks[0]?.status_code!==20000)throw Error('Organic SERP provider task failed');
  const task=payload.tasks[0],results=Array.isArray(task.result)?task.result:[];
  const rows=[];
  for(const result of results)for(const item of (Array.isArray(result?.items)?result.items:[])){
    if(item?.type!=='organic')continue;
    const checks=Array.isArray(item.checks)?item.checks.filter(x=>typeof x==='string'):[];
    rows.push({rank:item.rank_absolute??null,rankGroup:item.rank_group??null,
      title:item.title??null,url:item.url??null,domain:item.domain??null,
      snippet:item.description??null,checks,restoredFromWeb:checks.includes('from_web')});
  }
  return {provider:'DataForSEO',kind:'google-organic-serp',taskId:task.id??null,
    providerCostUsd:Number.isFinite(task.cost)?task.cost:null,
    retrievedAt:new Date().toISOString(),organicResults:rows,
    restoredCount:rows.filter(x=>x.restoredFromWeb).length,
    verificationAttempted:task.data?.resolve_poisoned_results===true,
    verificationSucceeded:null,
    note:'Missing from_web markers do not establish successful verification or absence of poisoning.'};
}
export async function queryOrganic(keyword,{live=false,approved=false,login,password,fetcher=fetch,...options}={}){
  const body=organicRequest(keyword,options);
  if(!live)return {mode:'dry-run',endpoint:ORGANIC_LIVE_ENDPOINT,request:body[0],
    billableWhenLive:true,estimatedCostUsd:null};
  if(approved!==true)throw Error('Explicit billable-call approval required');
  if(!login||!password)throw Error('Missing server-side API credentials');
  const auth=Buffer.from(login+':'+password,'utf8').toString('base64');
  const response=await fetcher(ORGANIC_LIVE_ENDPOINT,{method:'POST',redirect:'manual',
    headers:{Authorization:'Basic '+auth,'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(body),signal:AbortSignal.timeout(300000)});
  if(!response.ok)throw Error('Organic SERP HTTP '+response.status);
  const payload=await response.json();
  return {...normalizeOrganicResponse(payload),mode:'live'};
}
