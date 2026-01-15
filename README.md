# LO IT CONSULTING - Site Officiel

Ce dépôt héberge le code source du site institutionnel de **LO IT CONSULTING (LIC)**. Il s'agit d'une application web moderne conçue pour présenter l'expertise, les services et l'équipe de l'entreprise, tout en offrant des ressources éducatives via la LIC Academy.

## 🏗 Stack Technique

Le projet repose sur une architecture découplée (Headless) :

- **Frontend :** [Nuxt 3](https://nuxt.com) (Framework Vue.js)
  - **Styling :** [Tailwind CSS](https://tailwindcss.com) pour une interface rapide et responsive.
  - **Icônes :** Lucide Vue Next.
- **Backend :** [Strapi v4](https://strapi.io) (Headless CMS)
  - Gère les contenus dynamiques (vidéos de formation, articles de blog).
  - Situé dans le dossier `/backend`.

## 📂 Structure du Projet

L'architecture suit les conventions Nuxt avec une séparation claire :

| Dossier | Description |
|---------|-------------|
| `/app` | **Cœur du Frontend**. Contient les Pages, Composants, Layouts et Plugins. |
| `/app/components` | Composants UI réutilisables (ex: `PageHeader`, `CallToAction`). |
| `/app/pages` | Routes de l'application (ex: `/about` → `about.vue`). |
| `/app/plugins` | Logique client/serveur (ex: `wake-strapi.client.ts` pour le réveil API). |
| `/backend` | Code source du CMS Strapi. |
| `/public` | Fichiers statiques (favicon, robots.txt). |

### 💡 Fonctionnalités Clés & UX

- **Typography Header (`PageHeader.vue`)** : 
  Nous privilégions des en-têtes textuels minimalistes plutôt que des bannières images lourdes. Cela améliore la hiérarchie visuelle et les performances de chargement.
  
- **Gestion du "Cold Start" (Render)** :
  Notre backend étant hébergé sur une instance "Free Tier" (Render), il se met en veille après inactivité.
  - **Plugin de Réveil** : Un script (`wake-strapi.client.ts`) ping le serveur dès l'arrivée de l'utilisateur sur le site.
  - **Logique de Retry** : Les pages connectées au CMS (ex: Formation Gratuite) incluent une logique de reconnexion automatique (jusqu'à 3 minutes) avec des messages d'attente conviviaux pour éviter de frustrer l'utilisateur pendant le démarrage du serveur.

## 🚀 Guide de Démarrage

### Prérequis

- **Node.js** (v18 ou supérieur recommandé)
- **NPM**

### Installation

1. **Installer les dépendances Frontend :**
   ```bash
   npm install
   ```

2. **Installer les dépendances Backend :**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Lancement en Développement

Pour travailler sur le projet complet, il est recommandé de lancer les deux serveurs :

**Terminal 1 : Frontend** (Accessible sur `http://localhost:3000`)
```bash
npm run dev
```

**Terminal 2 : Backend** (Accessible sur `http://localhost:1337`)
```bash
npm run dev:backend
```

## 🤝 Conventions de Contribution

Pour maintenir la qualité et la maintenabilité du code :

1. **Commits :** Utilisez la convention [Conventional Commits](https://www.conventionalcommits.org/).
   - `feat:` Nouvelle fonctionnalité
   - `fix:` Correction de bug
   - `chore:` Maintenance technique (deps, config)
   - `style:` Changements visuels (CSS, formatting)
   - `docs:` Documentation

2. **Vue.js :** Privilégiez la syntaxe `<script setup>` pour tous les nouveaux composants.

3. **Styling :** Utilisez les classes utilitaires Tailwind. Évitez d'écrire du CSS brut dans les blocs `<style>` sauf cas exceptionnel.

## 🌍 Déploiement

Le site est configuré pour un déploiement continu.

- **Frontend :** Déployé sur Vercel/Netlify/Render (Nuxt generate/build).
- **Backend :** Déployé sur Render.
- **Environment :** Assurez-vous que la variable `STRAPI_URL` est définie dans l'environnement de production du frontend pour pointer vers l'API Strapi live.

---
*© 2026 LO IT CONSULTING. Documenté pour l'équipe technique.*