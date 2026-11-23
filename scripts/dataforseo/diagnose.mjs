/**
 * Nonbillable DataForSEO credential/access diagnostic.
 * Only calls GET /v3/appendix/user_data (documented cost: $0).
 * Never returns full response body, account identity, balance or credentials.
 */
export const USER_DATA_ENDPOINT='https://api.dataforseo.com/v3/appendix/user_data';
function safeHeader(res,name) {
 const value=res.headers?.get?.(name);
 return typeof value==='string' ? value.replace(/[^a-zA-Z0-9_.:\-/ ]/g,'').slice(0,100) : null;
}
export async function diagnoseDataForSeo({login,password,fetcher=fetch}={}) {
 if(!login||!password)return {type:'free-auth-diagnostic',outcome:'missing_server_credentials',requested:false};
 const auth='Basic '+Buffer.from(login+':'+password,'utf8').toString('base64');
 let res;
 try{
   res=await fetcher(USER_DATA_ENDPOINT,{method:'GET',redirect:'manual',
     headers:{Authorization:auth,Accept:'application/json'},signal:AbortSignal.timeout(12000)});
 }catch {
   return {type:'free-auth-diagnostic',outcome:'network_error',requested:true};
 }
 const contentType=safeHeader(res,'content-type');
 let statusCode=null,taskStatusCode=null;
 if((contentType||'').includes('application/json')){
   try{
     const body=await res.json();
     statusCode=Number.isInteger(body?.status_code)?body.status_code:null;
     taskStatusCode=Number.isInteger(body?.tasks?.[0]?.status_code)?body.tasks[0].status_code:null;
   }catch{/* Do not log unknown response bodies. */}
 }
 const authConfirmed=res.status===200 && statusCode===20000 && taskStatusCode===20000;
 return {
   type:'free-auth-diagnostic',requested:true,
   endpoint:'/v3/appendix/user_data',billable:false,httpStatus:res.status,
   contentType,server:safeHeader(res,'server'),cfRay:safeHeader(res,'cf-ray'),
   requestId:safeHeader(res,'x-request-id'),redirected:res.status>=300&&res.status<400,
   apiStatusCode:statusCode,taskStatusCode,
   authConfirmed,
   outcome:authConfirmed?'api_credentials_valid':res.status===403?'forbidden_http_layer':res.status===401?'invalid_auth_or_account':'requires_investigation'
 };
}

/** Provider sandbox sends dummy data and does not charge the account. */
export async function diagnoseKeywordSandbox({login,password,fetcher=fetch}={}){
 if(!login||!password)return {type:'free-keyword-sandbox',outcome:'missing_server_credentials',requested:false};
 const url='https://sandbox.dataforseo.com/v3/keywords_data/google_ads/search_volume/live';
 const auth='Basic '+Buffer.from(login+':'+password,'utf8').toString('base64');
 let res;
 try{
  res=await fetcher(url,{method:'POST',redirect:'manual',
    headers:{Authorization:auth,'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify([{location_code:2840,language_code:'en',keywords:['hubspot consultant','ai governance consultant'],search_partners:false}]),
    signal:AbortSignal.timeout(12000)});
 }catch{return {type:'free-keyword-sandbox',requested:true,billable:false,outcome:'network_error'};}
 const contentType=safeHeader(res,'content-type');
 let apiStatusCode=null,taskStatusCode=null,taskMessage=null;
 if((contentType||'').includes('application/json')){
  try{
   const data=await res.json();
   apiStatusCode=Number.isInteger(data?.status_code)?data.status_code:null;
   taskStatusCode=Number.isInteger(data?.tasks?.[0]?.status_code)?data.tasks[0].status_code:null;
   // Only fixed, provider-documented status codes; never log response text.
  }catch{}
 }
 return {type:'free-keyword-sandbox',requested:true,billable:false,
  endpoint:'/v3/keywords_data/google_ads/search_volume/live',host:'sandbox.dataforseo.com',
  httpStatus:res.status,contentType,server:safeHeader(res,'server'),
  cfRay:safeHeader(res,'cf-ray'),apiStatusCode,taskStatusCode,
  outcome:res.status===200&&apiStatusCode===20000&&taskStatusCode===20000?'sandbox_api_success':
    taskStatusCode===40201||apiStatusCode===40201?'account_access_paused_contact_provider':
    taskStatusCode===40104||apiStatusCode===40104?'account_verification_required':
    res.status===403?'sandbox_http_forbidden':'sandbox_requires_investigation'};
}
