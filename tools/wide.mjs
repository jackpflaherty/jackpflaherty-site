import { chromium } from 'playwright';
import { createServer } from 'http'; import { readFileSync, existsSync, statSync } from 'fs'; import { join } from 'path';
const root='/home/claude/site/dist';
const srv=createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]); let f=join(root,p); if(existsSync(f)&&statSync(f).isDirectory()) f=join(f,'index.html'); if(!existsSync(f)) f=join(root,p+'.html'); if(!existsSync(f)){r.statusCode=404;return r.end();} r.end(readFileSync(f));}).listen(4322);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
for (const [w,h,n] of [[3840,1948,'4k'],[2560,1300,'qhd'],[1920,1000,'fhd']]) {
  const pg=await b.newPage({viewport:{width:w,height:h}}); await pg.goto('http://localhost:4322/',{waitUntil:'load'}); await pg.screenshot({path:`/home/claude/assets/proofs/home-${n}.png`}); await pg.close();
}
await b.close(); srv.close();
