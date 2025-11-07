# 🌊 Oceanic Discord Bot

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.16.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-ISC-orange.svg)

Un bot Discord moderne et performant construit avec [Oceanic.js](https://oceanic.ws/)

[Fonctionnalités](#-fonctionnalités) •
[Installation](#-installation) •
[Configuration](#%EF%B8%8F-configuration) •
[Utilisation](#-utilisation) •
[Structure](#-structure)

</div>

---

## ✨ Fonctionnalités

- 🎯 **Système de commandes modulaire** - Architecture extensible et organisée
- 📊 **Base de données intégrée** - Gestion des données avec Sequelize
- 🛡️ **Anti-crash** - Protection contre les erreurs fatales
- 🎨 **Commandes utilitaires** - Avatar, panel, setup, punish et plus
- 📝 **Système de logs** - Suivi complet des événements
- ⚡ **Performances optimales** - Utilisation de Oceanic.js pour une rapidité maximale
- 🔧 **Configuration simple** - Fichier de configuration intuitif

## 📋 Prérequis

- **Node.js** version 16.16.0 ou supérieure
- **MySQL** (XAMPP recommandé) ou **SQLite**
- **Git** pour le clonage du repository

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/VOTRE_USERNAME/oceanic-bot.git
cd oceanic-bot
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de la base de données

Assurez-vous que MySQL est en cours d'exécution (via XAMPP ou autre) et créez une base de données :

```sql
CREATE DATABASE antifast;
```

## ⚙️ Configuration

Modifiez le fichier `config.js` avec vos informations :

```javascript
export default {
  token: "VOTRE_TOKEN_BOT_DISCORD",
  prefix: "$",
  color: "#36373e",
  sys: ["VOTRE_USER_ID"], // IDs des administrateurs système
  db: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "antifast",
  },
};
```

### Obtenir un token Discord

1. Allez sur le [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Dans l'onglet "Bot", créez un bot et copiez le token
4. Activez les **Privileged Gateway Intents** nécessaires

## 🎮 Utilisation

### Démarrer le bot

```bash
npm start
# ou
node index.js
```

### Commandes disponibles

| Commande | Description | Usage |
|----------|-------------|-------|
| `$avatar` | Affiche l'avatar d'un utilisateur | `$avatar [@user/ID]` |
| `$panel` | Affiche le panel de contrôle | `$panel` |
| `$setup` | Configuration du serveur | `$setup` |
| `$punish` | Système de punition | `$punish` |

## 📁 Structure

```
Oceanic/
├── src/
│   ├── Client/
│   │   ├── Commands/         # Commandes du bot
│   │   │   └── Utility/      # Commandes utilitaires
│   │   │       ├── avatar.js
│   │   │       ├── panel.js
│   │   │       ├── punish.js
│   │   │       └── setup.js
│   │   └── Events/           # Événements Discord
│   │       ├── Client/
│   │       │   ├── Ready.js
│   │       │   └── messageCreate.js
│   │       └── Guild/
│   └── Core/
│       ├── Anticrash/        # Système anti-crash
│       ├── Client/           # Client principal
│       ├── Database/         # Gestion base de données
│       │   └── Models/
│       └── Handler/          # Gestionnaire d'événements et commandes
├── config.js                 # Configuration
├── index.js                  # Point d'entrée
└── package.json
```

## 🛠️ Technologies utilisées

- **[Oceanic.js](https://oceanic.ws/)** - Bibliothèque Discord moderne et performante
- **[Sequelize](https://sequelize.org/)** - ORM pour la base de données
- **[MySQL2](https://www.npmjs.com/package/mysql2)** - Driver MySQL
- **[Better-SQLite3](https://www.npmjs.com/package/better-sqlite3)** - Alternative SQLite
- **[Colors](https://www.npmjs.com/package/colors)** - Console stylisée
- **[Gradient-String](https://www.npmjs.com/package/gradient-string)** - Gradients dans la console

## 🔧 Développement

### Ajouter une nouvelle commande

1. Créez un fichier dans `src/Client/Commands/[Catégorie]/`
2. Utilisez ce template :

```javascript
import colors from "colors";
import { Constants } from "oceanic.js";

export default {
  name: "macommande",
  description: "Description de la commande",
  category: "Utility",
  /**
   * @param {import("../../../Core/Client/Client.js").Client} client
   * @param {import("oceanic.js").Message} message
   * @param {string[]} args
   */
  async run(client, message, args) {
    try {
      // Votre code ici
    } catch (error) {
      console.error(colors.red(error));
    }
  },
};
```

### Ajouter un nouvel événement

1. Créez un fichier dans `src/Client/Events/[Client|Guild]/`
2. Exportez un objet avec `name`, `once` (optionnel), et `run`

## 📝 Logs et débogage

Le bot utilise un système de logs colorés pour faciliter le débogage :

- ✅ **Vert** : Succès (Anticrash, Events, etc.)
- ⚠️ **Jaune** : Avertissements
- ❌ **Rouge** : Erreurs

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence ISC. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**q-2**

## 🌟 Remerciements

- [Oceanic.js](https://oceanic.ws/) pour leur excellente bibliothèque
- La communauté Discord pour leur support

---

<div align="center">

**[⬆ Retour en haut](#-oceanic-discord-bot)**

Fait avec ❤️ par q-2

</div>

