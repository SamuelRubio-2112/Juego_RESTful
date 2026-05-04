require('dotenv').config();
const express = require('express');
const { sequelize } = require('../models');

const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');
 
const app = express();
const PORT = 3000;
 
app.use(express.json());                 // parsea JSON en el body
 
app.use('/api/personajes', personajesRouter);
app.use('/api/habilidades', habilidadesRouter);
 
// Middleware global de manejo de errores (siempre al final)
app.use((err, req, res, next) => {
 console.error(err);
 res.status(500).json({ error: 'Error interno del servidor' });
});

// Middleware genérico de 404 (opcional, buena práctica)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
 
(async () => {
 await sequelize.authenticate();
 app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})();