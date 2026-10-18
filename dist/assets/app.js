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
  const successPath=form.dataset.successPath||'/merci';
  next.value=new URL((isEnglish?'/en':'')+successPath,location.origin).href;
  const appointment=form.classList.contains('appointment-form');
  const validateAppointment=()=>{
    if(!appointment)return true;
    const date=form.querySelector('#meeting-date');
    const time=form.querySelector('#meeting-time');
    date.min=new Date().toISOString().slice(0,10);
    const requested=Date.parse(`${date.value}T${time.value}:00Z`);
    const past=date.value&&time.value&&(!Number.isFinite(requested)||requested<=Date.now());
    time.setCustomValidity(past?(isEnglish?'Please choose a future date and time in GMT.':'Choisissez une date et une heure futures en GMT.'):'');
    const mode=form.querySelector('#meeting-mode');
    const phone=form.querySelector('#phone');
    phone.required=mode.value!=='visio';
    form.querySelector('.phone-required')?.remove();
    if(phone.required){const marker=document.createElement('span');marker.className='phone-required';marker.textContent=' *';form.querySelector('[for="phone"]').insertBefore(marker,phone);}
    return !past;
  };
  if(appointment){form.querySelectorAll('#meeting-date,#meeting-time,#meeting-mode').forEach(input=>input.addEventListener('input',validateAppointment));validateAppointment();}
  form.addEventListener('submit',event=>{if(!validateAppointment()||!form.checkValidity()){event.preventDefault();form.reportValidity();return;}const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent=isEnglish?'Submitting your enquiry…':'Transmission en cours…';});
  window.addEventListener('pageshow',()=>{const button=form.querySelector('[type="submit"]');button.disabled=false;button.innerHTML=(appointment?(isEnglish?'Send my appointment request':'Envoyer ma demande de rendez-vous'):(isEnglish?'Send my enquiry':'Envoyer ma demande'))+' <span aria-hidden="true">↗</span>';});
}
