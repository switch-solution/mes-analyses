# Nom de l'image Docker
IMAGE_NAME = mes-analyses-paie
# Exécuter npm run build
npm-build:
	npm run build
# Construire l'image Docker
build: npm-build
	docker build -t $(IMAGE_NAME) .

# Lancer le conteneur Docker
run:
	docker run -p 3000:3000 $(IMAGE_NAME)