var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');

router.get('/cursos', async function(req, res, next) {

    try {
     const findGrupos =  new PQ({text :`SELECT * FROM Curso`});
     const result = await db.manyOrNone(findGrupos);
     console.log('Resultado:', result); // { value: 123 }
     return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener profesores"})
    }
    
});

router.post('/cursos', async function(req, res, next) {
    
    try {
      
      const { 
        nombre_curso
      } = req.body
  
      console.log("RECIBIENDO DEL BODY")
      console.log(req.body)
  
      const createCurso = new PQ({text :`INSERT INTO Curso (nombre_curso) VALUES ($1) RETURNING *`, values: [nombre_curso]});
      
      const resultadoCreacionCurso = await db.one(createCurso);
      console.log("RESULTADO DE CREAR USUARIO")
      console.log(resultadoCreacionCurso)
  
      return res.json({mensaje: "El curso ha sido creado con éxito", id_curso: resultadoCreacionCurso.id_curso, nombre_curso: resultadoCreacionCurso.nombre_curso})
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: error})
    }
    
});

router.put('/cursos', async function(req, res, next) {
    try {
      const { 
        id_curso,
        nombre_curso
      } = req.body
  
      const updateCurso = new PQ({text :`UPDATE Curso SET nombre_curso = $2 WHERE id_usuario = $1`, values: [id_curso,nombre_curso]});
  
      const resultCurso = await db.none(updateCurso);
      console.log('Resultado:', resultCurso); // { value: 123 }
      return res.json({mensaje: `El curso con id: ${id_curso} ha sido actualizado con éxito `})
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al actualizar estudiante"})
    }
    
});

router.delete('/cursos', async function(req, res, next) {
    try {
      const { id } = req.body
      const deleteCurso = new PQ({text :`DELETE FROM Curso WHERE id_curso = $1`, values: [id]});
  
      const result = await db.none(deleteCurso);
      console.log('Resultado:', result); // { value: 123 }
      return res.json({mensaje: `El curso con id: ${id} ha sido eliminado con éxito `})
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al eliminar estudiante"})
    }
    
});

module.exports = router;