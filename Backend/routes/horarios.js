var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');


/* Obtener todos los horarios en el sistema  */
router.get('/horarios', async function(req, res, next) {
  
    try {
      const result = await db.any(`SELECT * FROM horarios_grupo`);
      return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener todos los horarios en el sistema"})
    }
    
});

/* Obtener un horario en especifico  */
router.get('/horarios/:id', async function(req, res, next) {
  
    try {
      const { id } = req.params
      const obtenerHorarioPorId =  new PQ({text :`SELECT * FROM horarios_grupo WHERE id_horario = $1`,values: [id]});
      const result = await db.none(obtenerHorarioPorId);
      return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener el horario de id: " + id})
    }
    
});

module.exports = router;
  