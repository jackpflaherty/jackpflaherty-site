import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const root='/home/claude/site/dist';
const srv=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]); if(p.endsWith('/')) p+='index.html'; let f=path.join(root,p); if(!fs.existsSync(f)&&fs.existsSync(f+'.html')) f+='.html'; if(!fs.existsSync(f)){res.writeHead(404);return res.end();} const ext=path.extname(f); const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png'}; res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'}); fs.createReadStream(f).pipe(res);}).listen(4321);
const pages=process.argv.slice(2);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'}); 
for(const pg of pages){
  for(const [w,h,tag] of [[1440,900,'d'],[390,844,'m']]){
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1}); const page=await ctx.newPage();
    await page.route('**/fonts.googleapis.com/**',r=>r.abort()); await page.route('**/player.vimeo.com/**',r=>r.abort());
    await page.goto('http://localhost:4321'+pg,{waitUntil:'load'}); await page.waitForTimeout(300);
    const name=(pg==='/'?'home':pg.replace(/\//g,'_').replace(/^_/,''))+'-'+tag+'.png';
    await page.screenshot({path:'/home/claude/assets/proofs/'+name,fullPage:true}); await ctx.close();
  }
}
await b.close(); srv.close(); console.log('done');
