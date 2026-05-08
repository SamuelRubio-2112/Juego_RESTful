const express = require('express');
const { createPersonajeRules, updatePersonajeRules, addHabilidadRules, handleValidationErrors } = require('../validators/personaje.validator');
const ctrlPersonajes = require('../controllers/personajes.controller');
const router = express.Router();

//GET /api/personajes
router.get('/', ctrlPersonajes.getAllPersonajes);
//GET /api/personajes/:id
router.get('/:id', ctrlPersonajes.getPersonajeById);
//POST /api/personajes
router.post('/', createPersonajeRules, handleValidationErrors, ctrlPersonajes.postPersonaje);
//PUT /api/personajes/{id}
router.put('/:id', updatePersonajeRules, handleValidationErrors, ctrlPersonajes.putPersonajeById);
//POST /api/personajes/{id}/habilidades
router.post('/:id/habilidades', addHabilidadRules, handleValidationErrors, ctrlPersonajes.postHabilidadInPersonaje);
//DELETE /api/personajes/{idP}/habilidades/{idH}
router.delete('/:idP/habilidades/:idH', ctrlPersonajes.deleteHabilidadFromPersonaje);
//DELETE /api/personajes/{id}
router.delete('/:id', ctrlPersonajes.deletePersonajeById);

module.exports = router;