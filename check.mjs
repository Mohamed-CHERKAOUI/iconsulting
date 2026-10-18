import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const root=path.resolve('dist');
const entries=(await readdir(root,{recursive:true})).filter(x=>x.endsWith('.html'));
let links=0;
for(const entry of entries){
 const html=await readFile(path.join(root,entry),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${entry}: one H1 required`);
 const isEnglish=entry==='en.html'||/^en[\\/]/.test(entry);
 assert.match(html,new RegExp(`<html lang="${isEnglish?'en':'fr'}">`));
 assert.doesNotMatch(html,/Maroc|MAROC|Morocco|fr_MA|\+212/);
 assert.match(html,/href="tel:\+33746577197"/);
 assert.match(html,/href="https:\/\/wa.me\/33746577197"/);
 assert.match(html,/data-language-switch/);
 const switchTarget=html.match(/<a class="language-switch"[^>]*href="([^"]+)"/)?.[1];
 const route=entry.replaceAll('\\','/').replace(/index\.html$/,'').replace(/\.html$/,'');
 const expected=isEnglish?(route==='en'?'/':route.replace(/^en/,'')):'/en'+(route?'/'+route:'');
 assert.equal(switchTarget,expected,`${entry}: switch must reach the equivalent page`);
 assert.match(html,/<link rel="alternate" hreflang="en"/);
 assert.match(html,/<meta name="description"/);
 assert.match(html,/<link rel="canonical"/);
 for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   const file=url==='/'?'index.html':url.slice(1)+(path.extname(url)?'':'.html');
   assert.ok((await stat(path.join(root,file))).isFile(),`${entry}: broken link ${url}`);links++;
 }
}
const contact=await readFile(path.join(root,'contact.html'),'utf8');
const englishContact=await readFile(path.join(root,'en/contact.html'),'utf8');
assert.match(englishContact,/Full name \*/);
assert.match(englishContact,/Send my enquiry/);
assert.match(englishContact,/name="_next" value="[^"]+\/en\/merci"/);
assert.doesNotMatch(englishContact,/Envoyer ma demande|Nom complet|Sélectionnez/);
assert.match(contact,/action="https:\/\/formsubmit.co\/contact@iconsultingcabinet.com" method="POST"/);
for(const field of ['name','email','message','consent'])assert.match(contact,new RegExp(`id="${field}"[^>]*required`),`${field} must be required`);
assert.match(contact,/name="_honey"/);
assert.doesNotMatch(contact,/name="_captcha" value="false"/);
const css=await readFile(path.join(root,'assets/style.css'),'utf8');
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.doesNotMatch(css,/https:\/\//);
console.log(`PASS: ${entries.length} bilingual pages, ${links} internal links and assets, equivalent language routes, phone, WhatsApp, international scope, contact form and metadata.`);
if(process.env.CHECK_URL){
 for(const entry of entries){
  const route=entry.replaceAll('\\','/').replace(/index\.html$/,'').replace(/\.html$/,'');
  const response=await fetch(new URL('/'+route,process.env.CHECK_URL));
  assert.equal(response.status,200,`HTTP ${route}`);
  assert.match(response.headers.get('content-type'),/text\/html/);
 }
 const missing=await fetch(new URL('/page-inexistante-test',process.env.CHECK_URL));
 assert.equal(missing.status,404);
 console.log(`PASS: ${entries.length} HTTP routes and custom 404.`);
}
