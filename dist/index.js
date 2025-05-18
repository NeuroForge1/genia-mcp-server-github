// Archivo compilado de TypeScript a JavaScript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
const axios_1 = require("axios");
// Configuración de variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta de verificación de salud
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'GitHub MCP Server está funcionando correctamente',
        version: '1.0.0'
    });
});
// Ruta para obtener información del usuario
app.get('/api/user', async (req, res) => {
    try {
        if (!GITHUB_TOKEN) {
            return res.status(500).json({ error: 'Token de GitHub no configurado' });
        }
        const response = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error al obtener información del usuario:', error);
        res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
});
// Ruta para obtener repositorios
app.get('/api/repos', async (req, res) => {
    try {
        if (!GITHUB_TOKEN) {
            return res.status(500).json({ error: 'Token de GitHub no configurado' });
        }
        const response = await axios_1.default.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            },
            params: {
                sort: 'updated',
                per_page: 10
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error al obtener repositorios:', error);
        res.status(500).json({ error: 'Error al obtener repositorios' });
    }
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`GitHub MCP Server ejecutándose en el puerto ${PORT}`);
});
exports.default = app;
