# Guide sur le Style (SCSS)

Ce document explique la philosophie et la structure du code SCSS utilisé dans le projet Haven & Help. L'objectif est de créer un système de style cohérent, maintenable et facile à étendre grâce à la puissance de Sass.

---

### **Philosophie et Méthodologie**

Nous utilisons une approche modulaire simplifiée pour ce projet. La logique est simple :

1.  **Définir les fondations (Core) :** Variables (couleurs, polices) et styles de base.
2.  **Construire des composants réutilisables (Components) :** Éléments d'interface autonomes comme les boutons et les cartes.
3.  **Assembler les composants dans des pages (Pages) :** Styles spécifiques à la mise en page d'une section ou d'une page entière.

Tous ces modules sont ensuite importés dans un unique fichier maître, `main.scss`, qui est le seul fichier compilé.

### **Structure du Dossier `scss/`**

```
scss/
├── core/
│   ├── _base.scss
│   └── _variables.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── ... (autres composants)
└── pages/
    ├── _home.scss
    └── ... (autres pages)
└── main.scss
```

#### `📁 core/` - Les Fondations

C'est le socle de notre Design System.

- **`_variables.scss`** : Ce fichier est le plus important. Il centralise toutes les "décisions de design" :

  - **Couleurs :** Les couleurs primaires (`$primary-color`), d'accentuation (`$accent-color`), et les nuances de gris sont définies ici. Si vous voulez changer le thème du site, c'est le seul fichier à modifier.
  - **Polices :** La famille de police (`$font-family-base`) est définie ici.
  - **Tokens de design :** Les valeurs récurrentes comme les rayons de bordure (`$border-radius`), les ombres (`$box-shadow`), et les breakpoints pour le responsive (`$breakpoint-md`, `$breakpoint-lg`) y sont stockées.

- **`_base.scss`** : Ce fichier applique des styles globaux à l'ensemble du site.
  - Il effectue un "reset" de base pour supprimer les marges par défaut des navigateurs.
  - Il applique la police et la couleur de texte par défaut au `<body>`.
  - Il définit le style de la classe `.container`, utilisée partout pour centrer le contenu.

#### `📁 components/` - Les Briques de Construction

Ce dossier contient le style de chaque élément d'interface réutilisable. Chaque fichier est autonome et stylise un "composant".

- **`_buttons.scss`** : Contient les styles pour la classe `.btn` et ses variantes (`.btn-outline`, `.btn-accent`, etc.).
- **`_cards.scss`** : Contient le style de base de la classe `.card`, utilisée pour les logements et les services.
- **`_header.scss`**, **`_footer.scss`**, **`_mobile-nav.scss`** : Chaque partie majeure de la mise en page a son propre fichier.

Cette approche permet de modifier l'apparence d'un bouton partout sur le site en ne modifiant qu'un seul fichier.

#### `📁 pages/` - L'Assemblage

Ce dossier contient les styles qui ne sont pas réutilisables et qui sont spécifiques à une page ou une section.

- **`_home.scss`** : Contient les styles pour la bannière (`.hero`), la section de recherche (`.search-bar-section`), etc.
- **`_detail.scss`** : Contient les styles pour la mise en page de la page de détail d'un logement (la galerie, la colonne de réservation, etc.).

Ces fichiers assemblent les "briques" définies dans `components/` et les positionnent.

### **Le Fichier Maître : `main.scss`**

Ce fichier ne contient aucun style. Son unique rôle est d'importer tous les autres fichiers partiels dans le bon ordre en utilisant la syntaxe moderne `@use`.

L'ordre est crucial :

1.  D'abord les `core` (variables, puis base).
2.  Ensuite les `components`.
3.  Enfin les `pages`.

Cela garantit que lorsque les styles des composants sont définis, ils ont déjà accès aux variables, et que les styles des pages peuvent surcharger ceux des composants si nécessaire.

---

Cette structure modulaire est le secret de la maintenabilité du projet. Pour comprendre comment le site devient interactif, consultez le [guide sur la logique (JavaScript)](./README_JAVASCRIPT.md).
