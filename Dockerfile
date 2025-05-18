FROM node:16-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Clonar el repositorio
RUN apk add --no-cache git && \
    git clone https://github.com/NeuroForge1/genia-mcp-server-github.git . && \
    apk del git

# Instalar dependencias
RUN npm install

# Compilar la aplicación
RUN npm run build || echo "Build command may not be necessary, continuing..."

# Exponer el puerto que utiliza la aplicación
EXPOSE 8000

# Comando para iniciar el servicio
CMD ["node", "dist/index.js"]
