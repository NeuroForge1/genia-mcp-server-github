FROM golang:1.19-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del repositorio (que Render ya clonó)
COPY . .

# Compilar la aplicación
RUN go mod download && \
    go build -o github-mcp-server ./cmd/github-mcp-server/main.go

# Exponer el puerto que utiliza la aplicación
EXPOSE 8000

# Comando para iniciar el servicio
CMD ["./github-mcp-server"]
