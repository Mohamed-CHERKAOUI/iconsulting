import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const root=path.resolve('dist');
const entries=(await readdir(root,{recursive:true})).filter(x=>x.endsWith('.html'));
let links=0;
for(const entry of entries){
 const html=await readFile(path.join(root,entry),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${entry}: one H1 required`);
 assert.match(html,/<html lang="fr">/);
 assert.match(html,/<meta name="description"/);
 assert.match(html,/<link rel="canonical"/);
 for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   const file=url==='/'?'index.html':url.slice(1)+(path.extname(url)?'':'.html');
   assert.ok((await stat(path.join(root,file))).isFile(),`${entry}: broken link ${url}`);links++;
 }
}
const contact=await readFile(path.join(root,'contact.html'),'utf8');
assert.match(contact,/action="https:\/\/formsubmit.co\/contact@iconsultingcabinet.com" method="POST"/);
for(const field of ['name','email','message','consent'])assert.match(contact,new RegExp(`id="${field}"[^>]*required`),`${field} must be required`);
assert.match(contact,/name="_honey"/);
assert.doesNotMatch(contact,/name="_captcha" value="false"/);
const css=await readFile(path.join(root,'assets/style.css'),'utf8');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.doesNotMatch(css,/https:\/\//);
console.log(`PASS: ${entries.length} pages, ${links} internal links and assets, metadata, contact recipient, required fields, honeypot, spam protection, reduced motion.`);
