FROM golang:1.19-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del repositorio (que Render ya clonó)
COPY . .

# Verificar la estructura de directorios
RUN ls -la && \
    mkdir -p cmd/github-mcp-server && \
    ls -la cmd/

# Compilar la aplicación
RUN go mod download && \
    if [ -f ./cmd/github-mcp-server/main.go ]; then \
        go build -o github-mcp-server ./cmd/github-mcp-server/main.go; \
    else \
        echo "Error: main.go no encontrado, verificando estructura de directorios:"; \
        find . -type f -name "*.go" | grep -i main; \
        exit 1; \
    fi

# Exponer el puerto que utiliza la aplicación
EXPOSE 8000

# Comando para iniciar el servicio
CMD ["./github-mcp-server"]
