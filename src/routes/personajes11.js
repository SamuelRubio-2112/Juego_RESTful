const express = require('express');
const { Personaje, Habilidad } = require('../../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      include: [{ model: Habilidad, through: { attributes: ['nivel'] } }], 
    });
    res.json(personajes);

  } catch (err) {
    next(err); // Si algo sale mal, envía el error al manejador global
  }
});

module.exports = router;