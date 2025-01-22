# Usa una imagen base de Node.js para construir la aplicación
FROM node:20 as builder

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación estática
FROM nginx:alpine

# Copia los archivos generados en el paso anterior al contenedor de Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
ENTRYPOINT  ["nginx", "-g", "daemon off;"]