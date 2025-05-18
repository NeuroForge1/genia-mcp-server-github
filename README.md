# GitHub MCP Server para GENIA

Un servidor MCP (Model Context Protocol) para GitHub que permite a GENIA interactuar con repositorios, issues, pull requests y otros recursos de GitHub.

## Características

- Autenticación con token personal de acceso (PAT)
- Operaciones completas sobre repositorios
- Gestión de issues y pull requests
- Integración con el orquestador MCP de GENIA
- Soporte para autenticación por usuario

## Requisitos

- Docker
- Token personal de acceso de GitHub con los permisos adecuados

## Instalación

### Usando Docker

```bash
docker pull ghcr.io/neuroforge1/genia-mcp-server-github:latest
```

### Ejecución

```bash
docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token ghcr.io/neuroforge1/genia-mcp-server-github
```

## Operaciones Soportadas

### Repositorios

- `get_me`: Obtiene información del usuario autenticado
- `get_my_repos`: Lista los repositorios del usuario
- `get_repo`: Obtiene información de un repositorio específico
- `create_repo`: Crea un nuevo repositorio
- `update_repo`: Actualiza la configuración de un repositorio
- `delete_repo`: Elimina un repositorio

### Issues

- `get_issues`: Lista issues de un repositorio
- `get_issue`: Obtiene información de un issue específico
- `create_issue`: Crea un nuevo issue
- `update_issue`: Actualiza un issue existente
- `close_issue`: Cierra un issue

### Pull Requests

- `get_pull_requests`: Lista pull requests de un repositorio
- `get_pull_request`: Obtiene información de un pull request específico
- `create_pull_request`: Crea un nuevo pull request
- `update_pull_request`: Actualiza un pull request existente
- `merge_pull_request`: Fusiona un pull request

## Integración con GENIA

Este servidor MCP está diseñado para integrarse con el orquestador MCP de GENIA, permitiendo que los usuarios conecten sus propias cuentas de GitHub y ejecuten operaciones a través de la interfaz unificada de GENIA.

### Ejemplo de Configuración en el Orquestador

```python
orchestrator.register_server(
    name="github",
    command=["docker", "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/neuroforge1/genia-mcp-server-github"],
    env_vars={"GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"}
)
```

## Desarrollo

### Requisitos

- Node.js 16+
- npm o yarn

### Instalación de Dependencias

```bash
npm install
```

### Compilación

```bash
npm run build
```

### Pruebas

```bash
npm test
```

## Licencia

MIT

## Autor

GENIA Team
