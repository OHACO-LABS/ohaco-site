/** OHACO pilot evidence schema. Local-only, no network or external dependencies. */
export const schemaVersion='ohaco.visibility.v1';
const allowed=new Set(['observed','inferred','recommended','synthetic']);
export function normalizeEvidence(input){
  if(!input||typeof input!=='object')throw Error('Evidence record required');
  if(!allowed.has(input.claimType))throw Error('Invalid claim type');
  if(typeof input.clientId!=='string'||!input.clientId.trim())throw Error('Missing client ID');
  if(typeof input.statement!=='string'||!input.statement.trim())throw Error('Missing statement');
  if(input.claimType==='observed' && (!input.provider||!input.collectedAt||!input.sourceRef))
    throw Error('Observed claims require provider, collection date and source reference');
  const references=Array.isArray(input.references)?input.references.map(x=>{
    if(typeof x!=='string'||!/^https?:\/\//.test(x))throw Error('Invalid source URL');
    return x;
  }):[];
  return {schemaVersion,clientId:input.clientId,claimType:input.claimType,
    statement:input.statement,provider:input.provider??null,
    collectedAt:input.collectedAt??null,sourceRef:input.sourceRef??null,
    model:input.model??null,prompt:input.prompt??null,locale:input.locale??null,
    brandMentioned:input.brandMentioned??null,citedSource:input.citedSource??null,
    references,costUsd:input.costUsd??null,reviewedBy:input.reviewedBy??null};
}
export function reportReadiness(records){
  if(!Array.isArray(records)||!records.length)throw Error('At least one evidence record required');
  const normalized=records.map(normalizeEvidence);
  return {schemaVersion,count:normalized.length,
    observed:normalized.filter(x=>x.claimType==='observed').length,
    synthetic:normalized.filter(x=>x.claimType==='synthetic').length,
    clientReady:normalized.every(x=>x.claimType!=='synthetic' && (x.claimType!=='observed'||x.reviewedBy)),
    warning:normalized.some(x=>x.claimType==='synthetic')?'Contains synthetic data — not for factual client claims':null};
}
