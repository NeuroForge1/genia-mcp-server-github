FROM ghcr.io/neuroforge1/genia-mcp-server-github:latest

# Exponer el puerto que utiliza la aplicación
EXPOSE 8000

# Comando para iniciar el servicio
CMD ["node", "dist/index.js"]
