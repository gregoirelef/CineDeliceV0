# CinéDélice - Guide de déploiement en production
Ce document détaille les étapes nécessaires pour déployer l'application CinéDélice sur un serveur VPS en production.

### sommaire
- Sommaire
- Prérequis
- Configuration du gestionnaire de processus PM2
- Build de l'application front-end
- Configuration de Nginx
- Mise en place HTTPS avec Certbot
- Configuration des variables d'environnement
- Redémarrage et vérification
- Dépannage courant

### Prérequis
- Un serveur VPS avec Ubuntu (ou autre distribution Linux)
- Node.js et npm installés
- PostgreSQL installé et configuré
- Un nom de domaine pointant vers votre serveur


## Installation initiale sur le VPS
### Se connecter au VPS via SSH
`ssh student@votrenom-server.eddi.cloud`

### Créer une clé SSH pour le dépôt GitHub
`ssh-keygen -t ed25519 -C "votre-email@example.com" -f ~/.ssh/id_ed25519_Cinedelice`

### Démarrer l'agent SSH et ajouter la clé
- `eval "$(ssh-agent -s)"`
- `ssh-add ~/.ssh/id_ed25519_Cinedelice`

### Afficher la clé publique pour l'ajouter à GitHub
`cat ~/.ssh/id_ed25519_Cinedelice.pub`

### Copiez la clé publique affichée et ajoutez-la à votre dépôt GitHub
- Allez dans votre dépôt GitHub → Settings → Deploy Keys
- Cliquez sur "Add deploy key"
- Collez votre clé SSH et activez "Allow write access"

### Cloner le dépôt sur le VPS
`git clone git@github.com:votre-utilisateur/CineDeliceV0.git`
`cd CineDeliceV0`


## Configuration de la base de données PostgreSQL
### Installer PostgreSQL
`sudo apt install -y postgresql`

### Vérifier l'installation
`systemctl status postgresql`

### Se connecter à PostgreSQL
`sudo -i -u postgres psql`

### Dans PostgreSQL, créer l'utilisateur et la base de données
`REATE ROLE cinedelice WITH LOGIN PASSWORD 'cinedelice';`C
`CREATE DATABASE cinedelice WITH OWNER cinedelice;`
`\q`

### Tester la connexion depuis le bash
`psql -U cinedelice -d cinedelice -h localhost`

### Créer les tables et importer les données depuis le bash
`cd ~/CineDeliceV0`
`psql -h localhost -U cinedelice -d cinedelice -f data/create_tables.sql`
`psql -h localhost -U cinedelice -d cinedelice -f data/seeding_tables.sql`


## Configuration du gestionnaire de processus PM2
PM2 va permettre de maintenir l'application Node.js en fonctionnement et de la redémarrer automatiquement.

### Installation pm2
`npm install -g pm2`

### Démarrer en tache de fond
- `pm2 start npm --name cinedelice-back`
- `pm2 save`
- `pm2 startup`
- `sudo env PATH=$PATH:/home/student/.nvm/versions/node/v22.14.0/bin /home/student/.nvm/versions/node/v22.14.0/lib/node_modules/pm2/bin/pm2 startup systemd -u student --hp /home/student`
- `pm2 save`
- `pm2 restart cinedelice-back`

## Build de l'application front-end
### Se rendre dans le dossier front-end
`cd Front/`
### Générer le build de production
`npm run build`

### Créer le dossier qui contiendra les fichiers statiques
`sudo mkdir -p /var/www/cinedelice`

### Copier les fichiers générés vers ce dossier
`sudo cp -r dist/* /var/www/cinedelice/`


## Configuration de Nginx
### Vérifier que Nginx est installé
`nginx -v`
### Si nécessaire, l'installer
`sudo apt install nginx`

### Créer le fichier de configuration nginx pour notre application
`sudo nano /etc/nginx/sites-available/cinedelice`

copier la configuration suivante ( en changeat bien le server_name ):
```
server {
    server_name gregoirelef-server.eddi.cloud;

    root /var/www/cinedelice;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/gregoirelef-server.eddi.cloud/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/gregoirelef-server.eddi.cloud/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = gregoirelef-server.eddi.cloud) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name gregoirelef-server.eddi.cloud;
    return 404; # managed by Certbot
}

```
- `ctrl+o`
- `enter`
- `ctrl+x`

### activé la configuration
`sudo ln -s /etc/nginx/sites-available/cinedelice /etc/nginx/sites-enabled/`

### testé la configuration
`sudo nginx -t`

### démaré nginx
`sudo systemctl restart nginx`


## Certificat HTTPS: 
### Installation du certob pour le certificat HTTPS
`sudo apt install certbot python3-certbot-nginx`

### Genere le certificat HTTPS
`sudo certbot --nginx`

### Redémaré le nginx
`sudo systemctl reload nginx`


## changer le .env du Back

### Ce rendre dans le back du projet et editer le .env

-`nano .env`

ne pas oublié de changer avec vos nom de server...

```
# --- Configuration serveur ---
PORT=3000                         # Port sur lequel le serveur Express écoute
BASE_URL=https://gregoirelef-server.eddi.cloud         # URL de base du back-end (API)
# --- Configuration base de données PostgreSQL ---
PG_HOST=localhost                 # Adresse du serveur PostgreSQL (localhost pour usage local)
PG_USER=cinedelice                # Nom d'utilisateur PostgreSQL
PG_DATABASE=cinedelice            # Nom de la base de données PostgreSQL
PG_URL=postgres://cinedelice:cinedelice@localhost:5432/cinedelice  # URL complète de connexion PostgreSQL
# --- Sécurité / JWT ---
JWT_SECRET=cinedelice             # Clé secrète pour signer les JWT d'accès
JWT_REFRESH_SECRET=cinedelice     # Clé secrète pour signer les JWT de refresh
# --- Environnement ---
NODE_ENV=production                      # Environnement d'exécution (dev, prod, etc.)
# --- Configuration email (pour nodemailer) ---
MAIL_ADMIN=delicecine@gmail.com   # Adresse email de l'admin (expéditeur)
MAIL_PASS=zxqd hwaz hyqx umre     # Mot de passe ou app password pour l'email
# --- Configuration front-end ---
FRONT_URL=https://gregoirelef-server.eddi.cloud   # URL du front-end (React/Vite)

# --- Configuration CORS ---
CORS_ORIGINS=https://localhost:4173,https://localhost:5173,https://cinedelice.gregoirelef-server.eddi.cloud:4173,https://gregoirelef-server.eddi.cloud
```
- `ctrl+o`
- `enter`
- `ctrl+x`

## changer le .env du Front
### Ce rendre dans le Front du projet et editer le .env

-`nano .env`

```
VITE_API_URL=https://gregoirelef-server.eddi.cloud/api
```
- `ctrl+o`
- `enter`
- `ctrl+x`

## changer les acces cors 
### ce rendre dans le fichier index.js du back dans Vscode

changer la ligne : 
```
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : ["http://localhost:5173"];
```

par : 
```
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : ["https://localhost:5173"];
```

- `git add .`
- `git commit -m`
- `git push`

### Récupéré avec un git pull dans son server SSH 
- `git pull`

### Rélancer son back et son front 
- `pm2 restart cinedelice-back`

### Se rendre dans le dossier front-end
`cd Front/`

### Générer le build de production
`npm run build`

### suprimmer le dossier précédent qui contiendra les fichiers statiques
`sudo rm -rf /var/www/cinedelice/*`

### Copier les nouveau fichiers générés vers le dossier
`sudo cp -r dist/* /var/www/cinedelice/`

### Redémarrer nginx
`sudo systemctl restart nginx`