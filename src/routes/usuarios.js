const express = require('express');
const ctrlUsuarios = require('../controllers/usuarios.controller');
const router = express.Router();

//GET /api/usuarios/{id}/personajes
router.get('/:id/personajes', ctrlUsuarios.getPersonajesFromUsuario);

module.exports = router;