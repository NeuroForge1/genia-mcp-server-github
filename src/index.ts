import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

// Middleware
app.use(cors());
app.use(express.json());

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

    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    res.json(response.data);
  } catch (error) {
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

    const response = await axios.get('https://api.github.com/user/repos', {
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
  } catch (error) {
    console.error('Error al obtener repositorios:', error);
    res.status(500).json({ error: 'Error al obtener repositorios' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`GitHub MCP Server ejecutándose en el puerto ${PORT}`);
});

export default app;
