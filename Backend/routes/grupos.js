var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');


//Obtener todos los grupos de alumnos
router.get('/grupos', async function(req, res, next) {

    try {
     const findGrupos =  new PQ({text :`SELECT * FROM Grupos`});
     const result = await db.manyOrNone(findGrupos);
     console.log('Resultado:', result); // { value: 123 }
     return res.json(result)
    } catch (error) {
      console.error('Error al hacer la consulta:', error);
      res.json({menssage: "Error al obtener profesores"})
    }
    
});

//Obtener la información del grupo de un estudiante dado
router.get('/grupos/estudiante/:id', async function(req, res, next) {

    try {
        const { id } = req.params  
        const query = "SELECT E.id_estudiante, U.nombre, U.apellido, G.*, Cu.nombre_curso FROM Grupos AS G, Curso AS Cu, Estudiante AS E, Usuario AS U WHERE E.id_estudiante = $1 AND U.id_usuario = E.id_estudiante AND E.id_grupo = G.id_grupo AND G.id_curso = Cu.id_curso";
        const findGrupo =  new PQ({text: query, values: [id]});
        const result = await db.oneOrNone(findGrupo);
        console.log('Resultado:', result); // { value: 123 }
        return res.json(result)
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.json({menssage: "Error al obtener profesores"})
    }
    
});

module.exports = router;