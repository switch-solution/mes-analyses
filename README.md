# Installation de l'outil

Voici les étapes pour installer et exécuter l'outil à partir du Dockerfile fourni.

## Prérequis

- Docker doit être installé sur votre machine. Vous pouvez télécharger Docker à partir de [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
- Vous devez disposer d'un serveur de base de données Postgresql
- L'application utilise le service de stockage de [Vercel](https://vercel.com/docs/storage/vercel-blob)

## Étapes d'installation avec Docker

1. Clonez le dépôt Git contenant le Dockerfile sur votre machine locale.

```bash
git clone https://github.com/switch-solution/mes-analyses.git
```

2. Editer le fichier env

```bash
# Prisma
DATABASE_URL="Url de la base de données"

# NextAuth
GITHUB_ID="Github ID"
GITHUB_SECRET="Github Secret"
GOOGLE_ID="Google Id"
GOOGLE_SECRET="Google secret"
NEXTAUTH_SECRET="Next auth secret"

# NodeJs
NODE_ENV = "development"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="Lien vers le vercel blob storage"

# SMTP
SMTP_USER="user smtp"
SMTP_PASSWORD="mot de passe"
SMTP_HOST="serveur"
SMTP_PORT="port"
EMAIL_FROM="email de l'emetteur"


# Application
ADMIN_EMAIL = "Email de l'admin"
MODE = 'On_Premise'

# Insee
BEARER_TOKEN="Token API Insee"


```
toto



```bash
docker build -t <nom_de_l'image> .
```

```bash
docker run 3000:3000 <nom_de_l'image>      
```

