import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeEvidence,reportReadiness} from './evidence.mjs';
test('synthetic report is clearly marked not client-ready',()=>{
 const r=reportReadiness([{clientId:'pilot-demo',claimType:'synthetic',statement:'Example only'}]);
 assert.equal(r.clientReady,false);assert.equal(r.synthetic,1);
});
test('unattributed observations fail closed',()=>{
 assert.throws(()=>normalizeEvidence({clientId:'x',claimType:'observed',statement:'A is top ranked'}),/require/);
});
test('observed claims require reviewer for client readiness',()=>{
 const e={clientId:'x',claimType:'observed',statement:'Brand cited',provider:'DataForSEO',
 collectedAt:'2026-11-22T00:00:00Z',sourceRef:'task-001',references:['https://example.com']};
 assert.equal(reportReadiness([e]).clientReady,false);
 assert.equal(reportReadiness([{...e,reviewedBy:'researcher'}]).clientReady,true);
});
test('mention and citation are independent fields',()=>{
 const e=normalizeEvidence({clientId:'x',claimType:'synthetic',statement:'Example',brandMentioned:true,citedSource:false});
 assert.equal(e.brandMentioned,true);assert.equal(e.citedSource,false);
});
