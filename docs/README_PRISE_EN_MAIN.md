# Guide de Prise en Main du Projet Haven & Help

Ce document vous explique comment installer et lancer le projet Haven & Help en local sur votre machine.

---

### **1. Prérequis**

Pour faire fonctionner ce projet, vous n'avez besoin que de deux outils très courants :

- **Un éditeur de code** : [Visual Studio Code](https://code.visualstudio.com/) est recommandé.
- **Un navigateur web** : Chrome, Firefox, etc.

Le projet utilise **Sass** pour compiler les styles, mais vous n'avez pas besoin de l'installer manuellement si vous utilisez l'extension recommandée ci-dessous.

### **2. Installation**

### **1. Lancement du Projet**

Pour visualiser le site et compiler les styles en direct, nous allons utiliser deux extensions très populaires de VS Code.

1.  **Installez les extensions :**

    - Dans VS Code, allez dans l'onglet "Extensions" (icône des carrés sur la gauche).
    - Recherchez et installez **"Live Server"** de Ritwick Dey.
    - Recherchez et installez **"Live Sass Compiler"** de Glenn Marks.

2.  **Compilez le SCSS :**

    - Une fois "Live Sass Compiler" installé, vous verrez un bouton **"Watch Sass"** en bas à droite de votre éditeur.
    - Cliquez dessus. Le compilateur va démarrer, lire votre fichier `scss/main.scss` et générer automatiquement le fichier `css/main.css`. Il surveillera ensuite toute modification dans vos fichiers `.scss` pour recompiler le CSS à la volée.

3.  **Lancez le serveur local :**
    - Faites un clic droit sur le fichier `index.html` dans l'explorateur de fichiers de VS Code.
    - Choisissez **"Open with Live Server"**.

Votre navigateur va s'ouvrir automatiquement sur l'adresse `http://127.0.0.1:5500`, et votre site sera visible. Grâce à ces deux extensions, toute modification de votre code (HTML, SCSS ou JS) entraînera un rechargement automatique de la page.

---

Pour comprendre comment le projet est structuré, consultez le [guide sur l'arborescence des fichiers](./README_ARBORESCENCE.md).
