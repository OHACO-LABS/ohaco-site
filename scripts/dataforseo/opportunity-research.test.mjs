import test from 'node:test';
import assert from 'node:assert/strict';
import {ALL_KEYWORDS,createOpportunityPlan,analyzeOpportunityMetrics} from './opportunity-research.mjs';
test('seed plan remains within existing pilot limit',()=>{
 const p=createOpportunityPlan();
 assert.equal(p.keywords.length,20);assert.equal(new Set(p.keywords).size,20);
 assert.equal(p.collectionEnabled,false);assert.equal(p.taskCountWhenApproved,1);
});
test('no metrics means no rankings',()=>{
 const out=analyzeOpportunityMetrics({mode:'dry-run'});
 assert.equal(out.searchSignalRanking.length,0);assert.equal(out.commercialRanking,null);
});
test('synthetic fixture never yields apparent live rankings',()=>{
 const rows=ALL_KEYWORDS.map((keyword,i)=>({keyword,searchVolume:100+i,cpcUsd:10+i}));
 const out=analyzeOpportunityMetrics({mode:'fixture',rows});
 assert.equal(out.status,'insufficient-live-evidence');
 assert.equal(out.searchSignalRanking.length,0);
 assert.equal(out.groups[0].measuredVolumeCount,4);
});
test('approved result data supports directional search signal triage only',()=>{
 const rows=ALL_KEYWORDS.map((keyword,i)=>({keyword,searchVolume:100+i*10,cpcUsd:1+i}));
 const out=analyzeOpportunityMetrics({mode:'live',provider:'DataForSEO',
   retrievedAt:'2026-11-23T00:00:00Z',rows,reportedCostUsd:0.01});
 assert.equal(out.searchSignalRanking.length,5);
 assert.equal(out.commercialRanking,null);
 assert.equal(out.groups.length,5);
});
test('incomplete live coverage cannot be ranked',()=>{
 const out=analyzeOpportunityMetrics({mode:'live',provider:'DataForSEO',
   retrievedAt:'2026-11-23T00:00:00Z',rows:[{keyword:ALL_KEYWORDS[0],searchVolume:50,cpcUsd:1}]});
 assert.equal(out.searchSignalRanking.length,0);
});
test('duplicates and unknown input fail closed',()=>{
 assert.throws(()=>analyzeOpportunityMetrics({mode:'other'}),/Unknown/);
 assert.throws(()=>analyzeOpportunityMetrics({mode:'fixture',rows:[
 {keyword:ALL_KEYWORDS[0],searchVolume:10},{keyword:ALL_KEYWORDS[0],searchVolume:11}]}),/Duplicate/);
});
