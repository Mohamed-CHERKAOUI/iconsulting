# iConsulting — Nouveau site

Refonte originale bilingue français/anglais, à portée internationale : accueil, expertises, 6 pages de prestations (les 7 activités initiales sont conservées, durcissement et administration étant regroupés), cabinet, ressources, 3 articles complets, contact, confidentialité, remerciement et 404. Chaque page dispose d’une version anglaise sous `/en` et d’un sélecteur FR/EN pointant vers la même page dans l’autre langue. Les liens internes conservent la langue, et le changement de langue conserve les paramètres de l’URL (dont la prestation sélectionnée).

Téléphone cliquable : **+33 7 46 57 71 97** (`tel:+33746577197`). WhatsApp : **https://wa.me/33746577197**, accessible depuis le contact, le pied de page et un bouton flottant. Le lien ouvre une discussion ; le visiteur choisit lui-même d’envoyer un message.

## Aperçu local

Node.js 20 ou plus, sans dépendances :

```sh
node build.mjs
node check.mjs
node server.mjs
```

Ouvrir http://127.0.0.1:4173. Les sources éditoriales et les gabarits sont dans `build.mjs`, les traductions complètes dans `translations-en.mjs`, et la génération des pages bilingues dans `internationalize.mjs`. Une traduction manquante provoque une erreur de construction plutôt qu’une page partiellement traduite. Les styles, scripts, polices et images sont dans `dist/assets` (ces fichiers sont des sources suivies dans Git et doivent être conservés).

## Vercel

Importer ce dossier comme racine du projet. Le fichier `vercel.json` impose le type Other, la commande `npm run build`, le dossier de sortie `dist` et aucune installation de dépendances. Si le projet Vercel existant possède des réglages manuels, vérifier ces valeurs et désactiver les anciens réglages Next.js avant le déploiement de production.

Pour le projet GitHub existant, la refonte peut remplacer les fichiers à la racine d’une branche dédiée. Configurer **Framework Preset = Other** dans Vercel, puis créer un déploiement de prévisualisation de cette branche. Le fichier `vercel.json` désactive le preset Next.js. Conserver la branche de production actuelle tant que le remplacement n’a pas été validé.

La variable facultative `SITE_URL` définit le domaine utilisé dans les URL canoniques et le sitemap ; sa valeur par défaut est https://www.iconsultingcabinet.com. Pour une publication sur un autre domaine définitif, la renseigner puis reconstruire.

Les anciennes routes `/about` et `/insights` redirigent vers `/cabinet` et `/ressources` sur Vercel. Les routes `/services` et `/contact` sont conservées. Le site est entièrement statique et fonctionne sans base de données.

## Formulaire et réception des emails — ÉTAPE REQUISE

Le formulaire fait un vrai POST HTML vers https://formsubmit.co/contact@iconsultingcabinet.com. Il n’utilise pas un simple lien mailto ni une fausse confirmation JavaScript. reCAPTCHA est laissé actif et un champ piège anti-robots est présent. La réponse de FormSubmit redirige vers `/merci` sur le domaine utilisé par le visiteur.

**Avant de recevoir des demandes clients :**

1. Depuis la version de prévisualisation ou de production, envoyer une demande de test avec une adresse que vous contrôlez.
2. Ouvrir la boîte **contact@iconsultingcabinet.com** et cliquer sur le lien d’activation envoyé par FormSubmit. Vérifier les indésirables.
3. Si le prestataire demande une validation pour le domaine de production, la refaire depuis le domaine définitif.
4. Envoyer une seconde demande et vérifier sa réception ainsi que l’adresse de réponse.

La livraison en boîte mail ne peut être confirmée avant cette activation et ce test. Aucun test externe n’a été envoyé automatiquement pendant la construction.

FormSubmit est un prestataire tiers. La notice de confidentialité l’identifie. Pour utiliser votre propre infrastructure email à sa place, remplacer le POST par un point d’entrée serveur avec un prestataire email ou un SMTP sécurisé ; ne jamais placer des identifiants SMTP dans le navigateur.

## Avant publication définitive

- Valider les textes commerciaux et les périmètres de mission : ils développent l’offre initiale et restent à confirmer par le cabinet.
- Compléter les mentions légales avec la raison sociale exacte, l’adresse, les informations d’immatriculation et les autres éléments effectivement applicables ; ces données n’étaient pas présentes dans les éléments fournis et n’ont pas été inventées.
- Confirmer la politique de conservation des messages reçus et les informations de confidentialité applicables au cabinet. La notice publiée décrit les fonctions implémentées, sans prétendre certifier une conformité réglementaire.
- Activer et tester le formulaire comme décrit ci-dessus.

## Crédits

Photographie d’architecture : https://images.unsplash.com/photo-1486406146926-c627a92ad1ab, Unsplash. Image de présentation, ne représentant pas des locaux revendiqués du cabinet.

Polices Manrope et DM Sans : Google Fonts, licence SIL Open Font License, fichiers hébergés localement avec le site. Logomark et icônes SVG réalisés pour cette refonte.
