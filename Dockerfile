FROM node:16-alpine

WORKDIR /flight-app-spring-frontend

COPY public/ /flight-app-spring-frontend/public
COPY src/ /flight-app-spring-frontend/src
COPY package.json /flight-app-spring-frontend/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npx", "serve", "-s" "build"]

# Support / Build files
WORKDIR /flight-app-spring-frontend
COPY [ "kustomization.yaml", "deployment.yml", "service.yml", "./" ]

EXPOSE 3008
