const express = require('express');
const { personajes, habilidades } = require('../data/datosJuego');
const router = express.Router();
 
// GET /api/personajes?nombre=&tipo=
router.get('/', (req, res) => {
  const { nombre, tipo } = req.query;
  let resultado = personajes;
 
  if (nombre) {
    const n = nombre.toLowerCase();
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(n));
  }
  if (tipo) {
    resultado = resultado.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());
  }
 
  res.status(200).json(resultado);
});
 
// GET /api/personajes/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personaje = personajes.find(p => p.id === id);
  if (!personaje) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }
  res.status(200).json(personaje);
});
 
// POST /api/personajes
router.post('/', (req, res) => {
  const nuevo = { id: personajes.length + 1, ...req.body };
  personajes.push(nuevo);
  res.status(201).json(nuevo);
});
 
// GET /api/personajes/:id/habilidades — ruta jerárquica
router.get('/:id/habilidades', (req, res) => {
  const id = Number(req.params.id);
  const personaje = personajes.find(p => p.id === id);
  if (!personaje) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }
  const suyas = habilidades.filter(h => personaje.habilidades.includes(h.id));
  res.status(200).json(suyas);
});
 
// router.put('/:id', ...)
 router.put('/:id', (req, res) => {
  const idPut = Number(req.params.id);
  const personaje = personajes.findIndex(p => p.id === idPut);

  if (personaje == -1){
    return res.status(404).json({error: 'Personaje no encontrado'});
  }

  const personajeActualizado = {...personajes[personaje], ...req.body, id: idPut};

  personajes.splice(personaje, 1, personajeActualizado);
  res.status(200).json(personajeActualizado);
 });

 //router.delete('/:id', ...)
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const personaje = personajes.findIndex(p => p.id === id);

  if (personaje == -1){
    return res.status(404).json({error: 'Personaje no encontrado'});
  }

  personajes.splice(personaje, 1)
  res.status(204).send();
});

 module.exports = router;