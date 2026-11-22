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
