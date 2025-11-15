# Guide sur l'Arborescence du Projet

Ce document décrit la structure des dossiers et des fichiers du projet Haven & Help. L'objectif de cette arborescence est de maintenir un code propre, modulaire et facile à maintenir en séparant clairement les différentes responsabilités : les données, le style, la logique et la structure.

---

### **Structure Globale**

Voici un aperçu de l'arborescence à la racine du projet :

```/
├── css/
├── data/
├── docs/
├── js/
├── pages/
├── index.html
└── README.md
```

### **Description des Dossiers**

#### `📁 css/`

Ce dossier contient les fichiers CSS **compilés**.

- **Important :** Vous ne devez **jamais** modifier les fichiers de ce dossier manuellement. Ils sont générés automatiquement par le compilateur Sass à partir des fichiers sources situés dans le dossier `scss/`. C'est le seul dossier de style que le navigateur lit.

#### `📁 data/`

Ce dossier est le "mini-backend" de notre site statique. Il contient les données brutes sous forme de fichiers JSON.

- `accommodations.json` : Contient la liste de tous les logements avec leurs détails (prix, localisation, galerie d'images, etc.).
- `services.json` : Contient la liste de tous les services avec les informations des prestataires.
- `reviews.json` : Contient les avis des clients, organisés par type (logements/services) et par ID.

#### `📁 docs/`

Ce dossier contient toute la documentation technique du projet (les fichiers que vous êtes en train de lire).

#### `📁 js/`

Ce dossier contient tout le code JavaScript qui rend le site interactif.

- `js/components/` : Contient des modules pour des composants spécifiques, comme le menu mobile (`mobileMenu.js`).
- `js/modules/` : Contient des fonctions utilitaires partagées, comme `dataLoader.js` qui est responsable de charger les fichiers JSON.
- **Scripts de page :** Chaque page ou fonctionnalité complexe a son propre fichier JavaScript (`main.js` pour la page d'accueil, `services.js` pour la page des services, etc.).
- `global.js` : Un script spécial chargé sur **toutes** les pages pour gérer les éléments communs comme la navigation et l'initialisation des icônes.

#### `📁 pages/`

Ce dossier contient toutes les pages HTML du site, à l'exception de la page d'accueil. Cette séparation permet de garder la racine du projet propre.

#### `📁 scss/`

C'est le cœur de notre système de style. Il contient les fichiers sources Sass (`.scss`) qui sont ensuite compilés en un seul fichier CSS.

- `scss/core/` : Contient les fondations de notre Design System (`_variables.scss` pour les couleurs et polices, `_base.scss` pour les styles globaux).
- `scss/components/` : Chaque fichier correspond à un composant réutilisable de l'interface (`_buttons.scss`, `_cards.scss`, `_header.scss`, etc.).
- `scss/pages/` : Contient les styles spécifiques à une page ou une section particulière (`_home.scss`, `_detail.scss`, etc.).
- `main.scss` : Le fichier maître qui importe tous les autres fichiers partiels dans le bon ordre pour générer le `main.css` final.

---

Maintenant que vous comprenez l'organisation des fichiers, vous pouvez plonger plus en détail dans la manière dont le style est géré en consultant le [guide sur le style (SCSS)](./README_SCSS.md).
