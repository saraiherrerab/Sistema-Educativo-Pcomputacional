var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');

router.get('/profesores/cursos/faltantes/:id', async function(req, res, next) {

    try {
     const { id } = req.params
     const findCursos =  new PQ({text :`SELECT obtener_cursos_profesor($1)`, values: [id]});
     const result = await db.manyOrNone(findCursos);
     console.log('Resultado:', result); // { value: 123 }
     return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener profesores"})
    }
    
  });

  module.exports = router;