import test from 'node:test';
import assert from 'node:assert/strict';
import {organicRequest,normalizeOrganicResponse,queryOrganic} from './organic-serp.mjs';
test('dry run never calls the network',async()=>{
 const r=await queryOrganic('AI governance consulting',{fetcher:()=>{throw Error('network reached')}});
 assert.equal(r.mode,'dry-run');assert.equal(r.request.resolve_poisoned_results,true);
 assert.equal(r.request.resolve_goto_urls,false);assert.equal(r.request.depth,10);
});
test('pilot depth and Web-mode conflict are rejected',()=>{
 assert.throws(()=>organicRequest('test search',{depth:11}),/depth/);
 assert.throws(()=>organicRequest('test search',{searchParam:'udm=14'}),/conflicts/);
});
test('live requests require separate positive approval',async()=>{
 await assert.rejects(()=>queryOrganic('test search',{live:true,login:'x',password:'y'}),/approval/);
});
test('normalizer preserves correction provenance and provider cost',()=>{
 const result=normalizeOrganicResponse({status_code:20000,tasks:[{status_code:20000,id:'test',cost:0.004,data:{resolve_poisoned_results:true},result:[{items:[
 {type:'organic',rank_absolute:1,title:'A',url:'https://example.org',checks:['from_web']},
 {type:'organic',rank_absolute:2,title:'B',url:'https://example.com',checks:[]},
 {type:'people_also_ask',title:'skip'}
 ]}]}]});
 assert.equal(result.organicResults.length,2);
 assert.equal(result.restoredCount,1);
 assert.equal(result.organicResults[0].restoredFromWeb,true);
 assert.equal(result.verificationSucceeded,null);
 assert.equal(result.providerCostUsd,0.004);
});
test('provider errors fail closed',()=>{
 assert.throws(()=>normalizeOrganicResponse({status_code:20000,tasks:[{status_code:40104}]}),/failed/);
});
