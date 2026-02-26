# FilmExpress 🎬

**Membres du groupe :**
- Aya SGHAIER
- Jacqueline MAPENZI
- Danielle jamila KOAGNE NGANKAM

---

Bienvenue sur **FilmExpress**, une application web complète (MERN Stack) pour parcourir un catalogue de films, se créer un compte, et gérer son panier de films préférés.

Le projet a été pensé pour être à la fois visuel (style cinématographique sombre) et facile à comprendre au niveau du code.

## 🚀 Comment lancer le projet ?

Il y a deux parties à lancer : le **Backend** (le serveur) et le **Frontend** (l'interface).

### 1. Préparer le terrain
Assure-toi d'avoir **Node.js** installé sur ta machine.
Il te faudra aussi une base de données **MongoDB** (en local ou sur Atlas).

### 2. Lancer le Backend (Serveur)
Va dans le dossier du backend :
```bash
cd express_backend
```
Installe les dépendances :
```bash
npm install
```
Crée un fichier `.env` à la racine de `express_backend` (tu peux copier le `.env.example` s'il existe) et ajoute ta connexion MongoDB et un secret JWT :
```env
MONGO_URI=mongodb://localhost:27017/filmexpress
JWT_SECRET=ma_super_cle_secrete_123
PORT=5000
```
Lance le serveur :
```bash
npm start
```
*Le serveur devrait tourner sur le port 5000.*

### 3. Lancer le Frontend (Interface)
Ouvre un nouveau terminal et va dans le dossier du frontend :
```bash
cd react-frontend
```
Installe les dépendances :
```bash
npm install
```
Lance l'application en mode développement :
```bash
npm run dev
```
*L'interface sera accessible sur [http://localhost:3000](http://localhost:3000).*

---

## 🛠️ Structure du Projet

- **Backend (Express/Node)** : 
  - Architecture classique : Contrôleurs, Services et Repositories.
  - Authentification avec JWT (badges de connexion).
  - Gestion des films et des commandes avec Mongoose.
- **Frontend (React/Next.js)** :
  - Pages : Accueil, Catalogue, Panier, Commandes, Connexion.
  - Style : CSS moderne et sombre pour une ambiance cinéma.

> [!IMPORTANT]
> Pour le moment, **seul le côté Client (Utilisateur)** a été implémenté dans le frontend. Le côté **Manager / Administration** n'a pas encore été ajouté à l'interface.

  

Bonne séance ciné ! 🍿

