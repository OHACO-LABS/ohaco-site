import {queryKeywords} from './client.mjs';
const args=process.argv.slice(2),live=args.includes('--live');
const raw=args.find(x=>x.startsWith('--keywords='))?.slice('--keywords='.length);
if(!raw){console.error('Usage: node scripts/dataforseo/run.mjs --keywords="hubspot consultant,n8n developer" [--live]');process.exitCode=2;}
else try {
  const result=await queryKeywords(raw.split(','),{
    live,login:process.env.DATAFORSEO_API_LOGIN,password:process.env.DATAFORSEO_API_PASSWORD
  });
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
} catch(e){console.error('DataForSEO: '+e.message);process.exitCode=1;}
