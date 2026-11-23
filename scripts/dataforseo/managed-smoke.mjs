/** OHACO DataForSEO test-stage cron entrypoint.
 * Never issues a paid request without an explicit, time-limited gate.
 * No persistent storage, no webhook, no public API or automatic retries.
 */
import {queryKeywords} from './client.mjs';
import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import {diagnoseDataForSeo, diagnoseKeywordSandbox} from './diagnose.mjs';

const keywords=['hubspot consultant','ai governance consultant'];
const now=Date.now();
const enabled=process.env.OHACO_DATAFORSEO_LIVE_TEST==='I_APPROVE_ONE_PAID_REQUEST';
const expiresAt=Date.parse(process.env.OHACO_DATAFORSEO_LIVE_UNTIL||'');
const valid=enabled&&Number.isFinite(expiresAt)&&expiresAt>now&&expiresAt<=now+30*60*1000;

try {
  if(process.env.OHACO_DATAFORSEO_DIAGNOSTIC==='offline-tests'){
    const tests=readdirSync(new URL('.',import.meta.url)).filter(x=>x.endsWith('.test.mjs')).sort().map(x=>'scripts/dataforseo/'+x);
    const run=spawnSync(process.execPath,['--test',...tests],{
      encoding:'utf8',timeout:120000,maxBuffer:1024*1024,
      env:{PATH:process.env.PATH||'',HOME:process.env.HOME||'',CI:'true',NODE_ENV:'test'}
    });
    console.log(JSON.stringify({event:'ohaco-dataforseo-offline-tests',testFiles:tests,exitStatus:run.status,
      stdout:(run.stdout||'').slice(-10000),stderr:(run.stderr||'').slice(-1500)}));
    if(run.status!==0||run.error)process.exitCode=1;
  }else if(process.env.OHACO_DATAFORSEO_DIAGNOSTIC==='sandbox'){
    const result=await diagnoseKeywordSandbox({
      login:process.env.DATAFORSEO_API_LOGIN,
      password:process.env.DATAFORSEO_API_PASSWORD
    });
    console.log(JSON.stringify(result));
    if(result.outcome!=='sandbox_api_success')process.exitCode=1;
  }else if(process.env.OHACO_DATAFORSEO_DIAGNOSTIC==='enabled'){
    const result=await diagnoseDataForSeo({
      login:process.env.DATAFORSEO_API_LOGIN,
      password:process.env.DATAFORSEO_API_PASSWORD
    });
    console.log(JSON.stringify(result));
    if(!result.authConfirmed) process.exitCode=1;
  }else if(!valid){
    const r=await queryKeywords(keywords);
    console.log(JSON.stringify({event:'ohaco-dataforseo-smoke',mode:r.mode,keywords:r.request.keywords,
      note:'No credentials accessed and no billable provider request made.'}));
  }else{
    const r=await queryKeywords(keywords,{live:true,
      login:process.env.DATAFORSEO_API_LOGIN,password:process.env.DATAFORSEO_API_PASSWORD});
    console.log(JSON.stringify({event:'ohaco-dataforseo-smoke',mode:r.mode,
      keywords:r.rows.map(x=>({keyword:x.keyword,searchVolume:x.searchVolume,cpcUsd:x.cpcUsd})),
      providerCostUsd:r.reportedCostUsd,recordedAt:r.retrievedAt,
      note:'One test request only; no automatic retries.'}));
  }
}catch(err){
  console.error('DataForSEO smoke test failed: '+String(err?.message||err).slice(0,160));
  process.exitCode=1;
}
