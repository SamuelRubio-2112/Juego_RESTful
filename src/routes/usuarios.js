const express = require('express');
const { Usuario, Perfil, Personaje } = require('../../models');
const router = express.Router();

//GET /api/usuarios/{id}/personajes
router.get('/:id/personajes', async(req, res, next) => {
  try{
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id, {include: [{model: Perfil, include: [{model: Personaje}]}]});

    if (!usuario){
      return res.status(404).json({error: 'Usuario no encontrado'});
    }

    res.json(usuario.Perfil ? usuario.Perfil.Personajes : []);
  }
  catch (err){
    next(err);
  }
});

module.exports = router;