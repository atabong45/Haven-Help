# Guide sur la Logique (JavaScript)

Ce document explique l'architecture et le fonctionnement du code JavaScript du projet Haven & Help. La philosophie est de n'utiliser que du **JavaScript pur (vanilla JS)**, sans frameworks ni librairies externes (à l'exception de Lucide pour les icônes), en suivant une approche modulaire et orientée par page.

---

### **Philosophie et Principes**

1.  **Séparation des Responsabilités :** Chaque page HTML a son propre fichier JavaScript principal (`main.js` pour l'accueil, `services.js` pour la page des services, etc.). Cela garantit qu'une page ne charge que le code dont elle a besoin.

2.  **Modules ES6 :** Nous utilisons les modules JavaScript (`import`/`export`) pour organiser le code de manière propre. Cela nous permet de créer des fonctions réutilisables, comme le chargeur de données.

3.  **Manipulation du DOM :** Tout le contenu dynamique (listes de logements, détails, avis) est généré en JavaScript. Le script récupère les données, construit des chaînes de caractères HTML (template literals), puis les injecte dans le DOM à l'endroit prévu.

4.  **Événements :** L'interactivité (clics sur les boutons, changements dans les filtres) est gérée via des écouteurs d'événements (`addEventListener`).

### **Structure du Dossier `js/`**

```
js/
├── components/
│   └── mobileMenu.js
├── modules/
│   └── dataLoader.js
├── global.js
├── main.js         (pour index.html)
├── services.js     (pour pages/services.html)
└── ...             (autres scripts de page)
```

#### `📁 modules/` - Les Outils Réutilisables

- **`dataLoader.js`** : C'est le cœur de notre "backend statique". Il exporte une unique fonction asynchrone `fetchData(url)`.
  - **Rôle :** Charger un fichier JSON depuis le serveur.
  - **Fonctionnement :** Utilise l'API `fetch` native du navigateur pour récupérer les données. Gère les erreurs de base et retourne toujours un tableau (ou un objet), même en cas d'échec, pour éviter que les autres scripts ne plantent.

#### `📁 components/` - La Logique des Composants

- **`mobileMenu.js`** : Contient toute la logique pour faire fonctionner le menu mobile (ouverture/fermeture). Ce script est isolé pour être facilement maintenable.

#### `📄 global.js` - Le Chef d'Orchestre

Ce script est chargé sur **chaque page** du site. Son rôle est d'initialiser les fonctionnalités communes à tout le site.

1.  Il importe et exécute `initMobileMenu()` pour que la navigation responsive fonctionne partout.
2.  Il exécute `lucide.createIcons()` pour transformer les balises `<i>` en icônes SVG.

#### **Scripts de Page (`main.js`, `services.js`, `detail.js`, etc.)**

Chaque script de page suit un schéma similaire :

1.  **Importer les dépendances :** Il importe la fonction `fetchData` depuis `dataLoader.js`.
2.  **Écouteur `DOMContentLoaded` :** Tout le code est enveloppé dans cet événement pour s'assurer que le script ne s'exécute que lorsque la page HTML est entièrement chargée.
3.  **Charger les données :** Il appelle `fetchData` pour récupérer les données JSON nécessaires à la page (ex: `accommodations.json`).
4.  **Initialiser les écouteurs d'événements :** Il met en place les interactions spécifiques à la page (ex: les écouteurs pour les filtres sur `services.js`).
5.  **Fonction d'affichage (`displayServices`, `displayAccommodations`, etc.) :** C'est la fonction qui prend un tableau de données et génère le HTML correspondant pour l'injecter dans la page. C'est elle qui "dessine" le contenu.

### **Exemple de Flux : La Page des Services**

Pour bien comprendre, voici le déroulement exact lorsque vous ouvrez la page `services.html` :

1.  Le navigateur charge `services.html`.
2.  Dans le `<head>`, il voit `<script src="/js/global.js">` et `<script src="/js/services.js">`.
3.  `global.js` s'exécute, le menu mobile devient fonctionnel.
4.  `services.js` s'exécute.
5.  Il appelle `fetchData('/data/services.json')` pour récupérer la liste de tous les services.
6.  Une fois les données reçues, il appelle `populateCategoryFilters()` pour créer dynamiquement les filtres de catégories.
7.  Il appelle `setupEventListeners()` pour "écouter" les clics et les changements sur les filtres.
8.  Il appelle une première fois `applyFilters()`, qui (sans aucun filtre actif) appelle `displayServices()` avec la liste complète.
9.  `displayServices()` boucle sur chaque service et génère une carte HTML, puis injecte le tout dans la `div#services-list`.
10. `lucide.createIcons()` est appelé à la fin pour transformer les icônes `<i>` ajoutées dynamiquement.

---

Cette architecture, bien que simple, est robuste et permet de créer des expériences riches et dynamiques sans la complexité d'un framework.
