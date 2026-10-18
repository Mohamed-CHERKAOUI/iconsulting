const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const closeMenu = () => {toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
toggle?.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header-inner'))closeMenu();});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
const form = document.querySelector('.contact-form');
const isEnglish = document.documentElement.lang === 'en';
document.querySelector('[data-language-switch]')?.addEventListener('click',event=>{
  const url=new URL(event.currentTarget.href);
  url.search=location.search;
  url.hash=location.hash;
  event.currentTarget.href=url.href;
});
if(form){
  const selected = new URLSearchParams(location.search).get('service');
  if(selected && [...form.elements.service.options].some(x=>x.value===selected))form.elements.service.value=selected;
  const next=form.querySelector('[name="_next"]');
  next.value=new URL(isEnglish?'/en/merci':'/merci',location.origin).href;
  form.addEventListener('submit',()=>{if(!form.checkValidity())return;const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent=isEnglish?'Submitting your enquiry…':'Transmission en cours…';});
  window.addEventListener('pageshow',()=>{const button=form.querySelector('[type="submit"]');button.disabled=false;button.innerHTML=(isEnglish?'Send my enquiry':'Envoyer ma demande')+' <span aria-hidden="true">↗</span>';});
}
