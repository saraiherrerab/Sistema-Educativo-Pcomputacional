var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');

//Obtener todos los grupos de alumnos
router.put('/estudiantes/asignar/grupo', async function(req, res, next) {
    try {
    const {id_estudiante, id_grupo} = req.body
    console.log(req.body)
     const updateGrupoEstudiante =  new PQ({text :`UPDATE Estudiante SET id_grupo = $2 WHERE id_estudiante = $1`,values: [id_estudiante,id_grupo]});
     const result = await db.none(updateGrupoEstudiante);
     console.log('Resultado:', result); // { value: 123 }
     return res.json({mensaje: "El estudiante ha sido asignado al grupo de forma exitosa"})
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener profesores"})
    }
    
});

module.exports = router;