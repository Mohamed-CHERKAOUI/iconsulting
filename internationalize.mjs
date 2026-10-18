import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { english } from './translations-en.mjs';

export const phone = '+33 7 46 57 71 97';
const whatsapp = 'https://wa.me/33746577197';
const chatIcon = '<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8.5 7.5c-.5 2.6 3.4 6.5 6 6l1-1.8-2-1-1 1c-1.2-.6-2.2-1.6-2.8-2.8l1-1-1-2Z"/></svg>';
const routeUrl = (route,lang) => lang === 'en' ? '/en'+(route?'/'+route:'') : '/'+route;
function switchLink(route,lang){const target=lang==='fr'?'en':'fr';return `<a class="language-switch" data-language-switch href="${routeUrl(route,target)}" hreflang="${target}" lang="${target}" aria-label="${target==='en'?'Switch to English':'Passer en français'}"><span lang="fr" ${lang==='fr'?'class="is-active"':''}>FR</span><span lang="en" ${lang==='en'?'class="is-active"':''}>EN</span></a>`;}
function languageMeta(base,route,lang){return `<link rel="canonical" href="${base}${routeUrl(route,lang)}"><meta property="og:url" content="${base}${routeUrl(route,lang)}"><link rel="alternate" hreflang="fr" href="${base}${routeUrl(route,'fr')}"><link rel="alternate" hreflang="en" href="${base}${routeUrl(route,'en')}"><link rel="alternate" hreflang="x-default" href="${base}${routeUrl(route,'fr')}">`;}

export function prepareFrenchPage(html,route,base){
 html=html.replaceAll('CABINET DE CONSEIL · MAROC','CABINET DE CONSEIL · À VOS CÔTÉS, PARTOUT')
  .replaceAll('et cybersécurité au Maroc.','et cybersécurité, à l’international.')
  .replaceAll('organisations au Maroc dans','organisations dans')
  .replaceAll(' au Maroc','').replaceAll('fr_MA','fr_FR').replaceAll('+212 …','Votre indicatif et numéro');
 html=html.replace('<button class="menu-toggle"',switchLink(route,'fr')+'<button class="menu-toggle"');
 html=html.replace(/(<a class="contact-email"[^>]*>.*?<\/a>)/,'$1'+`<div class="contact-direct"><a class="contact-phone" href="tel:+33746577197"><span>Téléphone</span><strong>${phone}</strong></a><a class="button whatsapp-contact" href="${whatsapp}" target="_blank" rel="noopener noreferrer">${chatIcon} Échanger sur WhatsApp <span aria-hidden="true">↗</span></a></div>`);
 html=html.replace(/(<a class="footer-email"[^>]*>.*?<\/a>)/,'$1'+`<a class="footer-phone" href="tel:+33746577197">${phone}</a><a class="footer-whatsapp" href="${whatsapp}" target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp ↗</a>`);
 html=html.replace('</body>',`<a class="whatsapp-float" href="${whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Contacter iConsulting sur WhatsApp">${chatIcon}<span>WhatsApp</span></a></body>`);
 html=html.replace(/<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>/g,'');
 return html.replace('</head>',languageMeta(base,route,'fr')+'</head>');
}

const shared = /^(?:[\d\s.,+↗↓←✓/·—:*%-]+|iConsulting\.?|Menu|FR|EN|WhatsApp|ISO[\s/\w.-]*|NIST[\s\w-]*|COBIT|EBIOS R(?:isk Manager|M)|CIS Controls|Secure\. Audit\. Transform\.|ICONSULTING \/ SECURE\. AUDIT\. TRANSFORM\.|IC \/ \d+|contact@iconsultingcabinet\.com)$/;
export function translateText(text){
 const raw=text.trim();
 if(!raw||shared.test(raw)||raw.startsWith('©')||/^https?:|^mailto:|^tel:/.test(raw))return text;
 let translated=english.get(raw);
 if(translated===undefined&&raw.endsWith(' | iConsulting')){const value=english.get(raw.slice(0,-14));if(value)translated=value+' | iConsulting';}
 if(translated===undefined&&raw.startsWith('/ ')){const value=english.get(raw.slice(2));if(value)translated='/ '+value;}
 if(translated===undefined&&raw.endsWith('.')){const value=english.get(raw.slice(0,-1));if(value)translated=value+'.';}
 if(translated===undefined)throw new Error('Missing English translation: '+raw);
 return text.replace(raw,translated);
}

export async function writeEnglishPage(html,route,out,base){
 let inScript=false;
 let en=html.split(/(<[^>]+>)/g).map(part=>{
  if(part.startsWith('<')){
   if(/^<script\b/.test(part))inScript=true;
   if(/^<\/script/.test(part))inScript=false;
   return part.replace(/\b(aria-label|placeholder|alt)="([^"]+)"/g,(_,key,value)=>`${key}="${translateText(value)}"`)
    .replace(/(<meta (?:name="description"|property="og:(?:title|description)") content=")([^"]+)(")/g,(_,a,value,b)=>a+translateText(value)+b)
    .replace(/value="(Nouvelle demande de contact — iConsulting|Demande de réponse acceptée)"/g,(_,value)=>`value="${translateText(value)}"`);
  }
  if(inScript)return part;
  return translateText(part);
 }).join('');
 en=en.replace('<html lang="fr">','<html lang="en">').replace('content="fr_FR"','content="en_GB"');
 en=en.replace(/<a class="language-switch"[\s\S]*?<\/a>/,switchLink(route,'en'));
 en=en.replace(/href="\/(?!assets\/)([^"#]*)"/g,(full,url)=>url.startsWith('en')?full:`href="/en${url?'/'+url:''}"`);
 en=en.replace(/(<a class="language-switch"[^>]*href=")[^"]+/,`$1${routeUrl(route,'fr')}`);
 en=en.replace(/<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>|<link rel="alternate"[^>]*>/g,'');
 en=en.replace('</head>',languageMeta(base,route,'en')+'</head>');
 en=en.replace(/(name="_next" value=")[^"]+/,`$1${base}/en/merci`);
 en=en.replace(/© (\d+) iConsulting\. Tous droits réservés\./g,'© $1 iConsulting. All rights reserved.');
 const filename=route?path.join(out,'en',route+'.html'):path.join(out,'en.html');
 await mkdir(path.dirname(filename),{recursive:true});
 await writeFile(filename,en);
}
