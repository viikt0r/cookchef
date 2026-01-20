# 🍳 CookChef

Application moderne de découverte et gestion de recettes de cuisine développée avec React et Vite. CookChef permet de parcourir une collection de recettes, gérer ses favoris et créer de nouvelles recettes via une interface d'administration intuitive.

## ✨ Fonctionnalités

- 📖 **Navigation de recettes** : Parcourez une collection paginée de recettes avec recherche par titre
- ⭐ **Liste de souhaits** : Sauvegardez vos recettes préférées
- 🔐 **Interface d'administration** : Créez et gérez vos propres recettes
- 📱 **Interface responsive** : Design adaptatif pour tous les écrans
- ⚡ **Performances optimisées** : Chargement rapide grâce à Vite et React 19

## 🚀 Technologies

### Frontend

- **React 19** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour un code robuste
- **React Router DOM 7** - Navigation entre les pages
- **Zustand** - Gestion d'état légère et performante
- **SASS** - Styles modulaires et maintenables

### Formulaires & Validation

- **React Hook Form** - Gestion performante des formulaires
- **Yup** - Schémas de validation
- **@hookform/resolvers** - Intégration Yup avec React Hook Form

### Outils de développement

- **Vite 7** - Build tool ultra-rapide avec HMR
- **SWC** - Compilateur JavaScript/TypeScript rapide
- **ESLint** - Linting du code
- **TypeScript ESLint** - Règles TypeScript pour ESLint

## 📦 Installation

### Prérequis

- Node.js (version 18+)
- npm ou yarn

### Étapes d'installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd cookchef

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## 🎯 Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Créer le build de production
npm run build

# Prévisualiser le build de production localement
npm run preview

# Linter le code
npm run lint
```

## 🏗️ Architecture du projet

```
src/
├── apis/              # Appels API et configuration
├── assets/            # Ressources statiques (images, styles globaux)
├── components/        # Composants réutilisables
│   ├── Footer/
│   ├── Header/
│   └── Loading/
├── data/              # Données statiques et seeds
├── hooks/             # Hooks React personnalisés
├── interfaces/        # Types et interfaces TypeScript
├── pages/             # Pages de l'application
│   ├── HomePage/      # Page d'accueil avec liste de recettes
│   └── Admin/         # Interface d'administration
├── store/             # Store Zustand pour la gestion d'état
├── App.tsx            # Composant racine
├── router.tsx         # Configuration du routage
└── main.tsx           # Point d'entrée de l'application
```

## 🎨 Conventions de style

Le projet utilise des **SCSS Modules** pour le styling des composants avec des classes utilitaires globales :

### Classes de mise en page (Flexbox)

- `.d-flex`, `.flex-row`, `.flex-column`, `.flex-fill`
- `.align-items-center`, `.justify-content-center`

### Classes d'espacement

- `.p-20`, `.mb-20`, `.mr-15`, `.my-30` (padding/margin + valeur en pixels)

### Classes de conteneur

- `.container` (max-width: 1200px avec marges auto)

### Boutons

- `.btn`, `.btn-primary`, `.btn-reverse-primary`

## 🔌 API

L'application utilise une API REST pour gérer les recettes :

- **Base URL** : `https://restapi.fr/api/recipesViktor`
- **Endpoints** :
  - `GET /recipes` - Récupérer la liste des recettes (avec pagination)
  - `POST /recipes` - Créer une nouvelle recette
  - `PUT /recipes/:id` - Mettre à jour une recette
  - `DELETE /recipes/:id` - Supprimer une recette

### Paramètres de pagination

- `limit` : Nombre de résultats par page (défaut: 9)
- `skip` : Nombre de résultats à ignorer
- `sort` : Tri des résultats (ex: `createdAt:-1`)

## 🛠️ Patterns et bonnes pratiques

### Gestion d'état

- **Zustand** pour l'état global (wishlist, authentification)
- **useState** pour l'état local des composants
- **Custom hooks** (`useFetchRecipes`) pour la logique réutilisable

### Formulaires

- Utilisation de `react-hook-form` avec `yupResolver`
- Validation avec schémas Yup
- Gestion d'erreurs centralisée

### Composants

- **Composants présentationnels** : Reçoivent des props, émettent des callbacks
- **Composants conteneurs** : Gèrent l'état et les appels API
- **SCSS Modules** : Un fichier `.module.scss` par composant

## 📝 Licence

Projet personnel - Tous droits réservés

## 👤 Auteur

Viktor

---

_Développé avec ❤️ en utilisant React et Vite_
