from pathlib import Path
from shutil import copyfile
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / 'dist' / 'assets'
OUTPUT = ROOT / 'output' / 'pdf'
OUTPUT.mkdir(parents=True, exist_ok=True)
(ASSETS / 'documents').mkdir(parents=True, exist_ok=True)
for name, file in [('Body','rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf'),('BodyBold','rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTg.ttf'),('Heading','xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf'),('HeadingBold','xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(ASSETS / file)))

W,H = 595.276,841.89
INK, PAPER, LIME, TEXT, LINE = map(HexColor,['#153f35','#f8f9f5','#d5eb91','#59645e','#dce2d9'])

def paragraph(c, text, x, top, width, size=11, color=TEXT, font='Body', leading=None):
    style=ParagraphStyle('copy',fontName=font,fontSize=size,leading=leading or size*1.5,textColor=color,spaceAfter=0)
    p=Paragraph(escape(text),style)
    _,height=p.wrap(width,1000)
    assert top-height >= 40, f'Text runs beyond page: {text[:70]}'
    p.drawOn(c,x,top-height)
    return top-height

def label(c,text,x,y,color=INK):
    c.setFillColor(color);c.setFont('BodyBold',7.1)
    obj=c.beginText(x,y);obj.setCharSpace(1.25);obj.textOut(text);obj.setCharSpace(0);c.drawText(obj)

def brand(c,x=44,y=785):
    c.setFillColor(INK);c.roundRect(x,y-7,27,29,6,fill=1,stroke=0)
    p=c.beginPath();p.moveTo(x+13.5,y+15);p.lineTo(x+21,y+12);p.lineTo(x+21,y+5);p.curveTo(x+20,y-1,x+15,y-4,x+13.5,y-5);p.curveTo(x+10,y-3,x+6,y,x+6,y+5);p.lineTo(x+6,y+12);p.close()
    c.setStrokeColor(LIME);c.setLineWidth(1);c.drawPath(p)
    p=c.beginPath();p.moveTo(x+9,y+5);p.lineTo(x+12,y+2);p.lineTo(x+18,y+9);c.drawPath(p)
    c.setFillColor(INK);c.setFont('HeadingBold',19);c.drawString(x+36,y+3,'iConsulting.')

def footer(c,page,lang):
    c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(44,45,W-44,45)
    c.setFont('Body',7);c.setFillColor(TEXT);c.drawString(44,29,'www.iconsultingcabinet.com')
    c.drawRightString(W-44,29,f'{lang.upper()} / {page:02d}')

def page(c,page,lang):
    c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0);brand(c);footer(c,page,lang)

DATA = {
 'fr': {
  'file':'iconsulting-plaquette-fr.pdf','title':'iConsulting - Présentation du cabinet',
  'cover_label':'CONSEIL, AUDIT ET CYBERSÉCURITÉ',
  'headline':['Votre SI,','un levier de','confiance.'],
  'promise':'Maîtrisez vos risques. Sécurisez vos systèmes. Faites avancer votre transformation.',
  'cover_copy':'Un accompagnement structuré pour relier vos enjeux métier, vos décisions SI et votre maîtrise des risques.',
  'world':'À VOS CÔTÉS, PARTOUT',
  'cover_discuss':'Parlons de vos priorités',
  'audit_label':'AUDIT, GOUVERNANCE ET STRATÉGIE',
  'audit_heading':['Voir clair.','Décider juste.'],
  'audit_intro':'Donnez à votre direction une lecture indépendante de votre situation et une trajectoire SI reliée à vos ambitions.',
  'audit_services':[
   ('Audit SI & gouvernance','Évaluez la maturité de vos contrôles, les risques et l’organisation de votre système d’information.','Cartographie des risques, rapport de constats et plan d’action priorisé.'),
   ('Revue de projets SI','Prenez du recul avant les décisions structurantes et les étapes critiques de livraison.','Diagnostic du pilotage, analyse des dépendances et recommandations d’arbitrage.'),
   ('Transformation digitale & SDSI','Reliez votre stratégie métier à une cible SI et à un portefeuille de projets cohérent.','Diagnostic, orientations cibles et feuille de route avec priorités et jalons.')],
  'cyber_label':'CYBERSÉCURITÉ ET OPÉRATIONS IT',
  'cyber_heading':['Comprendre l’exposition.','Renforcer la maîtrise.'],
  'cyber_intro':'Priorisez les efforts de sécurité et traduisez les recommandations en actions adaptées à vos environnements.',
  'cyber_services':[
   ('Évaluation cybersécurité','Identifiez les faiblesses organisationnelles et techniques, et les scénarios de risque prioritaires.','État des lieux, analyse des écarts et feuille de route de remédiation.'),
   ('Tests d’intrusion','Confrontez vos défenses à des scénarios d’attaque dans un périmètre autorisé et encadré.','Rapport des vulnérabilités, criticité et recommandations techniques de correction.'),
   ('Durcissement & administration IT','Réduisez la surface d’attaque et structurez les pratiques d’administration au quotidien.','Standards de configuration, plan de mise en œuvre et documentation opérationnelle.')],
  'deliverables':'LIVRABLES ENVISAGÉS',
  'scope':'Le périmètre, le calendrier et les livrables définitifs sont convenus après un échange de cadrage.',
  'method_label':'UNE MÉTHODE CLAIRE. DES PROCHAINES ÉTAPES CONCRÈTES.',
  'method_heading':'De votre enjeu à l’action.',
  'steps':[
   ('Cadrer','Comprendre votre activité, vos contraintes et les décisions que la mission doit éclairer.'),
   ('Analyser','Examiner les pratiques, les systèmes et les éléments probants disponibles.'),
   ('Prioriser','Qualifier les risques et organiser les recommandations selon leur impact et leur faisabilité.'),
   ('Restituer','Partager une synthèse lisible et une direction praticable avec vos équipes.')],
  'frameworks':'Repères selon la mission : ISO/IEC 27001, NIST CSF, NIST SP 800-53, EBIOS Risk Manager, COBIT, CIS Controls.',
  'qualification':'L’utilisation de ces référentiels ne constitue pas une revendication de certification.',
  'contact_heading':'Votre prochain défi mérite\nune direction claire.',
  'meeting':'Demandez un premier échange de 30 minutes.',
  'meeting_note':'Créneau souhaité en GMT (UTC+0), à confirmer par email.',
  'contact_url':'https://www.iconsultingcabinet.com/rendez-vous',
  'button':'DEMANDER UN RENDEZ-VOUS',
 },
 'en': {
  'file':'iconsulting-brochure-en.pdf','title':'iConsulting - Firm overview',
  'cover_label':'ADVISORY, AUDIT AND CYBERSECURITY',
  'headline':['Your IT,','a foundation','for trust.'],
  'promise':'Manage your risks. Secure your systems. Move your transformation forward.',
  'cover_copy':'Structured support to connect your business challenges, IT decisions and risk management.',
  'world':'BY YOUR SIDE, WORLDWIDE',
  'cover_discuss':'Let’s discuss your priorities',
  'audit_label':'AUDIT, GOVERNANCE AND STRATEGY',
  'audit_heading':['See clearly.','Decide confidently.'],
  'audit_intro':'Give leadership an independent view of your situation and an IT roadmap aligned with your ambitions.',
  'audit_services':[
   ('IT audit & governance','Assess the maturity of controls, risks and the organisation of your information systems.','Risk and control mapping, documented findings and a prioritised action plan.'),
   ('IT project review','Take an independent look before major decisions and critical delivery milestones.','A governance assessment, dependency analysis and recommendations for upcoming decisions.'),
   ('Digital transformation & IT strategy','Connect business strategy to a target IT landscape and a coherent project portfolio.','An assessment, target-state guidelines and a roadmap with priorities and milestones.')],
  'cyber_label':'CYBERSECURITY AND IT OPERATIONS',
  'cyber_heading':['Understand exposure.','Strengthen control.'],
  'cyber_intro':'Prioritise security efforts and turn recommendations into actions tailored to your environments.',
  'cyber_services':[
   ('Cybersecurity assessment','Identify organisational and technical weaknesses and prioritise risk scenarios.','A security baseline, gap analysis and a prioritised remediation roadmap.'),
   ('Penetration testing','Test your defences against attack scenarios within an authorised and controlled scope.','A vulnerability report, severity assessment and technical remediation recommendations.'),
   ('Hardening & IT administration','Reduce your attack surface and structure day-to-day administration practices.','Configuration standards, an implementation plan and operational documentation.')],
  'deliverables':'POTENTIAL DELIVERABLES',
  'scope':'The final scope, timeline and deliverables are agreed after an initial scoping discussion.',
  'method_label':'A CLEAR METHOD. PRACTICAL NEXT STEPS.',
  'method_heading':'From your challenge to action.',
  'steps':[
   ('Define','Understand your business, constraints and the decisions the engagement should inform.'),
   ('Analyse','Examine practices, systems and the evidence available.'),
   ('Prioritise','Assess risks and organise recommendations according to impact and feasibility.'),
   ('Present','Share a clear summary and a practical direction with your teams.')],
  'frameworks':'References selected by engagement: ISO/IEC 27001, NIST CSF, NIST SP 800-53, EBIOS Risk Manager, COBIT, CIS Controls.',
  'qualification':'Using these frameworks does not imply a claim of certification.',
  'contact_heading':'Your next challenge deserves\na clear direction.',
  'meeting':'Request an initial 30-minute conversation.',
  'meeting_note':'Preferred time in GMT (UTC+0), subject to email confirmation.',
  'contact_url':'https://www.iconsultingcabinet.com/en/rendez-vous',
  'button':'REQUEST AN APPOINTMENT',
 }
}

for lang,d in DATA.items():
    target=OUTPUT/d['file']
    c=canvas.Canvas(str(target),pagesize=(W,H))
    c.setTitle(d['title']);c.setAuthor('iConsulting');c.setSubject(d['cover_label'])
    c.setCreator('iConsulting commercial brochure')
    # Cover: architecture as a visual illustration, never claimed as the firm's premises.
    c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0)
    c.saveState();clip=c.beginPath();clip.rect(382,0,W-382,H);c.clipPath(clip,stroke=0)
    c.drawImage(str(ASSETS/'architecture.jpg'),260,0,width=560,height=H,preserveAspectRatio=False)
    c.setFillColor(Color(.03,.16,.12,alpha=.25));c.rect(382,0,W-382,H,fill=1,stroke=0);c.restoreState()
    brand(c);label(c,d['cover_label'],44,724)
    for i,line in enumerate(d['headline']):
        c.setFont('Heading',45);c.setFillColor(INK if i<2 else HexColor('#7d915a'));c.drawString(42,638-i*56,line)
    paragraph(c,d['promise'],44,422,285,13,INK,leading=20)
    paragraph(c,d['cover_copy'],44,325,270,10.5,leading=17)
    label(c,d['world'],44,202)
    paragraph(c,d['cover_discuss'],44,170,285,18,INK,font='HeadingBold')
    c.setFont('Body',10);c.setFillColor(INK);c.drawString(44,115,'contact@iconsultingcabinet.com');c.linkURL('mailto:contact@iconsultingcabinet.com',(44,112,285,126),relative=0)
    c.drawString(44,93,'+33 7 46 57 71 97');c.linkURL('tel:+33746577197',(44,89,240,105),relative=0)
    c.setFont('Body',7);c.drawString(44,40,'www.iconsultingcabinet.com');c.drawString(300,40,f'{lang.upper()} / 01')
    c.showPage()
    for page_no,prefix in [(2,'audit'),(3,'cyber')]:
        page(c,page_no,lang);label(c,d[prefix+'_label'],44,732)
        top=700
        for line in d[prefix+'_heading']:
            c.setFont('Heading',32);c.setFillColor(INK);c.drawString(43,top-30,line);top-=41
        paragraph(c,d[prefix+'_intro'],44,top-12,500,11,leading=17)
        for i,(name,desc,delivery) in enumerate(d[prefix+'_services']):
            y=536-i*143
            c.setStrokeColor(LINE);c.line(44,y+16,W-44,y+16)
            label(c,f'0{i+1}',44,y-5)
            paragraph(c,name,82,y+4,460,18,INK,'HeadingBold',23)
            paragraph(c,desc,82,y-30,456,10.3,leading=15)
            label(c,d['deliverables'],82,y-76)
            paragraph(c,delivery,82,y-86,456,9.4,leading=14)
        paragraph(c,d['scope'],44,91,500,8.3,leading=12)
        c.showPage()
    page(c,4,lang);label(c,d['method_label'],44,733)
    paragraph(c,d['method_heading'],44,708,505,29,INK,'Heading',37)
    for i,(name,desc) in enumerate(d['steps']):
        top=641-i*66
        c.setFillColor(HexColor('#e8edde'));c.roundRect(44,top-29,31,31,4,fill=1,stroke=0)
        label(c,f'0{i+1}',51,top-17)
        paragraph(c,name,91,top+2,460,13.5,INK,'HeadingBold',19)
        paragraph(c,desc,91,top-23,450,9.6,leading=14)
    paragraph(c,d['frameworks'],44,361,505,8.5,leading=13)
    paragraph(c,d['qualification'],44,324,505,7.7,leading=11)
    c.setFillColor(INK);c.rect(44,69,W-88,231,fill=1,stroke=0)
    for i,line in enumerate(d['contact_heading'].split('\n')):
        c.setFont('Heading',23);c.setFillColor(PAPER);c.drawString(64,267-i*29,line)
    paragraph(c,d['meeting'],64,215,460,10,LIME,leading=15)
    paragraph(c,d['meeting_note'],64,194,460,8.2,HexColor('#d3dec9'),leading=12)
    c.setFillColor(LIME);c.rect(64,127,270,32,fill=1,stroke=0)
    label(c,d['button'],76,139,INK);c.linkURL(d['contact_url'],(64,127,334,159),relative=0)
    c.setFont('Body',9);c.setFillColor(PAPER);c.drawString(64,103,'contact@iconsultingcabinet.com');c.linkURL('mailto:contact@iconsultingcabinet.com',(64,99,310,114),relative=0)
    c.drawString(350,103,'WhatsApp : +33 7 46 57 71 97');c.linkURL('https://wa.me/33746577197',(347,98,W-60,115),relative=0)
    c.save()
    reader=PdfReader(str(target));assert len(reader.pages)==4
    text='\n'.join(p.extract_text() for p in reader.pages)
    assert 'contact@iconsultingcabinet.com' in text and '+33 7 46 57 71 97' in text
    assert 'Maroc' not in text and 'Morocco' not in text
    assert len(reader.pages[0].extract_text())>250
    assert all(len(p.extract_text())>500 for p in reader.pages[1:])
    copyfile(target,ASSETS/'documents'/d['file'])
    print(f'Created {target} (4 pages; text and contact links verified)')
