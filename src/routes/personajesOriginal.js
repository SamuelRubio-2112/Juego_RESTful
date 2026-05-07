const express = require('express');
//const { personajes, habilidades } = require('../data/datosJuego');
const { Personaje, Habilidad, Perfil, PersonajeHabilidad} = require('../../models');
const { where } = require('sequelize');
const router = express.Router();


//GET /api/personajes
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

//GET /api/personajes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const personaje = await Personaje.findByPk(id, { include: [{model: Habilidad, through: { attributes: ['nivel'] } }] });

    if (!personaje){
      return res.status(404).json({error: 'Personaje no encontrado'});
    }

    res.json(personaje);
  }

  catch (err){
    next(err);
  }
});

//POST /api/personajes
router.post('/', async(req, res, next) => {
  try {
    const {nombre, descripcion, ataque, defensa, estamina, perfilId} = req.body;
    
    if (!nombre || !descripcion || !ataque || !defensa || !estamina || !perfilId){
      return res.status(400).json({error: 'Campos incompletos. Todos los campos son obligatorios.'});
    }

    const perfil = await Perfil.findByPk(perfilId);
    if (!perfil){
      return res.status(404).json({error: 'Perfil no encontrado'});
    }

    const personajeNuevo = await Personaje.create({nombre, descripcion, ataque, defensa, estamina, perfilId});

    res.status(201).json(personajeNuevo);
  }

  catch (err){
    next(err);
  }
});

//PUT /api/personajes/{id}
router.put('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const personaje = await Personaje.findByPk(id);
    const {nombre, descripcion, ataque, defensa, estamina} = req.body;

    if (!personaje){
      return res.status(404).json({error: 'Personaje no encontrado'});
    }

    if (!nombre || !descripcion || !ataque || !defensa || !estamina){
      return res.status(400).json({error: 'Campos incompletos. Todos los campos son obligatorios.'});
    }

    await personaje.update(
      {nombre, descripcion, ataque, defensa, estamina},
      {where: {id: id}}
    )
    
    res.status(201).json(personaje);
  }

  catch (err){
    next(err);
  }
});


//POST /api/personajes/{id}/habilidades
router.post('/:id/habilidades', async(req, res, next) => {
  try {
    const personajeId = req.params.id;
    const {habilidadId, nivel} = req.body;

    if (!personajeId || !habilidadId || !nivel){
      return res.status(400).json({error: 'Todos los campos son obligatorios'});
    }

    const personaje = await Personaje.findByPk(personajeId);
    if (!personaje) {
      return res.status(404).json({error: ' Personaje no encontrado.'})
    }

    const habilidad = await Habilidad.findByPk(habilidadId);
    if (!habilidad) {
      return res.status(404).json({error: 'Habilidad no encontrada.'})
    }

    const relacion = await PersonajeHabilidad.findOne({
      where:{
        personajeId, habilidadId
      }
    });

    if (relacion){
      return res.status(400).json({error: 'Este personaje ya tiene esa habilidad'});
    }

    const habilidadAgregada = await PersonajeHabilidad.create({
      personajeId, habilidadId, nivel
    });

    res.status(201).json(habilidadAgregada);
  }

  catch (err) {
    next(err);
  }
});

//DELETE /api/personajes/{idP}/habilidades/{idH}
router.delete('/:idP/habilidades/:idH', async(req, res, next) => {
  try {
    const {idP, idH} = req.params;

    const relacion = await PersonajeHabilidad.findOne({
      where:{
        personajeId: idP,
        habilidadId: idH
      }
    });

    if (!relacion){
      return res.status(404).json({error: 'No se ha encontrado la habilidad en el personaje'});
    }

    await relacion.destroy();
    res.status(204).send();
  }

  catch (err) {
    next(err);
  }
});

//DELETE /api/personajes/{id}
router.delete('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const personaje = await Personaje.findByPk(id);

    if (!personaje){
      return res.status(404).json({error: 'Personaje no encontrado'});
    }

    await Personaje.destroy({where: {id}});

    res.sendStatus(204);
  }

  catch (err) {
    next(err);
  }
});

module.exports = router;