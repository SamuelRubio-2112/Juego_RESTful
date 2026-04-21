const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');
const router = express.Router();

// GET /api/habilidades?orden=estamina
router.get('/', (req, res) => {
  const { orden } = req.query;
  let resultado = [...habilidades];
  if (orden === 'estamina') {
    resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
  }
  res.status(200).json(resultado);
});

//Terminar, agregar lo mismo que en personajes

module.exports = router;