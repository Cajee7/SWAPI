#Build stage
FROM node:12 AS build

WORKDIR /app

#copy package file
COPY package*.json ./

#install dependencies
RUN npm install

#copy source code
COPY . .

#Build
RUN npm run build --prod

#Prod stage
FROM nginx:alpine

COPY --from=build /app/dist/SWAPI /usr/share/nginx/html

#serve on default port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
