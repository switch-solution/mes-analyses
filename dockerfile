# Utilisez une image de node.js comme base
FROM node:latest

# Créez un répertoire dans le conteneur pour le code de l'application
WORKDIR /usr/src/app

# Ajoutez d'autres variables d'environnement si nécessaire

# Copiez le fichier package.json dans le conteneur
COPY package*.json ./

COPY . .

# Installez les dépendances de l'application
RUN npm install
# Si vous construisez votre code pour la production

# prisma
RUN npx prisma generate

# build
RUN npm run build

# Copiez le reste du code de l'application dans le conteneur

EXPOSE 3000

# Exécutez la commande pour démarrer votre application
CMD [ "npm", "start" ]