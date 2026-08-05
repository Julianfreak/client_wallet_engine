# --- ETAPA 1: Construcción de la aplicación ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de forma limpia
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar para producción (genera la carpeta 'dist')
RUN npm run build


# --- ETAPA 2: Servidor web de producción ---
FROM nginx:alpine

# Copiar los archivos estáticos compilados desde la etapa anterior al directorio web de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 donde Nginx escuchará las peticiones
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]