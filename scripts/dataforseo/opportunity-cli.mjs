#!/usr/bin/env node
/** Safe local opportunity research entrypoint. No network requests or provider credentials. */
import {readFileSync} from 'node:fs';
import {createOpportunityPlan,analyzeOpportunityMetrics} from './opportunity-research.mjs';
const args=process.argv.slice(2);
if(args.length===0||args[0]==='plan'){
  console.log(JSON.stringify(createOpportunityPlan(),null,2));
}else if(args[0]==='analyze'&&args.length===2){
  // Caller supplies an explicitly captured provider response normalized to rows.
  // No fetching, no credentials, and no implicit paid behavior.
  const payload=JSON.parse(readFileSync(args[1],'utf8'));
  console.log(JSON.stringify(analyzeOpportunityMetrics(payload),null,2));
}else{
  console.error('Usage: node scripts/dataforseo/opportunity-cli.mjs [plan | analyze <normalized-json-file>]');
  process.exitCode=2;
}
