import test from 'node:test';
import assert from 'node:assert/strict';
import {requestBody,queryKeywords,endpoint} from './client.mjs';
test('normalization and bounds',()=>{
 assert.deepEqual(requestBody([' ABC ','abc'])[0].keywords,['abc']);
 assert.throws(()=>requestBody([]));assert.throws(()=>requestBody(['x']));
 assert.throws(()=>requestBody(Array.from({length:26},(_,i)=>'keyword'+i)));
});
test('default dry-run cannot contact API',async()=>{
 const r=await queryKeywords(['n8n developer'],{fetcher:()=>{throw Error('network!')}});
 assert.equal(r.mode,'dry-run');
});
test('live must have private credentials',async()=>{
 await assert.rejects(queryKeywords(['n8n developer'],{live:true,fetcher:()=>{throw Error('network!')}}),/Missing/);
});
test('mock request sends Basic auth and produces normalized rows',async()=>{
 let calls=0;
 const fetcher=async(url,init)=>{
  calls++;assert.equal(url,endpoint);
  assert.equal(init.headers.Authorization,'Basic '+Buffer.from('fixture-login:fixture-password').toString('base64'));
  return {ok:true,json:async()=>({status_code:20000,cost:0.01,tasks:[{status_code:20000,result:[{keyword:'n8n developer',search_volume:50,cpc:5.29,competition:'LOW'}]}]})};
 };
 const x=await queryKeywords(['n8n developer'],{live:true,login:'fixture-login',password:'fixture-password',fetcher});
 assert.equal(calls,1);assert.equal(x.rows[0].searchVolume,50);
 assert.equal(JSON.stringify(x).includes('fixture-password'),false);
});
test('api failures omit response body or secrets',async()=>{
 await assert.rejects(queryKeywords(['n8n developer'],{live:true,login:'fixture',password:'secret',fetcher:async()=>({ok:false,status:401})}),/status 401/);
});
