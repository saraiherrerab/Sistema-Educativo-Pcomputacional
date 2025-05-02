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

  router.get('/profesores/cursos/inscritos/:id', async function(req, res, next) {

    try {
     const { id } = req.params
     const findCursos =  new PQ({text :`SELECT C.* FROM Curso AS C, Profesor_Curso AS PC WHERE C.id_curso = PC.id_curso AND PC.id_profesor = $1`, values: [id]});
     const result = await db.manyOrNone(findCursos);
     console.log('Resultado:', result); // { value: 123 }
     return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener profesores"})
    }
    
  });

  router.get('/profesores/:id/horarios/', async function(req, res, next) {

    try {
     const { id } = req.params
     const findHorarios =  new PQ({text :`SELECT * FROM obtener_horarios_profesor($1)`, values: [id]});
     const result = await db.manyOrNone(findHorarios);
     console.log('Resultado:', result); // { value: 123 }
     return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener horarios de profesor"})
    }
    
  });


  module.exports = router;