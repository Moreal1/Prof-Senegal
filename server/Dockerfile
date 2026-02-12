FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le code source
COPY . .

# Créer le dossier uploads
RUN mkdir -p uploads

# Exposer le port
EXPOSE 5000

# Démarrer l'application
CMD ["node", "src/app.js"]

