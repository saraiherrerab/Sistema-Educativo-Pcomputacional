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

//Obtener todos los grupos de alumnos
router.get('/grupos/:id', async function(req, res, next) {

    try {
    const { id } =req.params
    const findGrupos =  new PQ({text :`SELECT * FROM Grupos WHERE id_grupo = ${id}`});
     const result = await db.oneOrNone(findGrupos);
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

        if(result !== null){
            const profesor_query = "SELECT Pr.id_profesor, U.nombre, U.apellido, Cu.nombre_curso, Hp.*,Gr.nombre_grupo FROM Curso AS Cu, Usuario AS U, Profesor_curso AS Pc, Profesor AS Pr, Grupos AS Gr, Horarios_profesor AS Hp WHERE Cu.id_curso = $1 AND Gr.id_grupo = $2 AND Hp.id_grupo = Gr.id_grupo AND U.id_usuario = Pr.id_profesor AND Pc.id_profesor = Pr.id_profesor AND Pc.id_curso = Cu.id_curso AND Hp.id_profesor = Pc.id_profesor AND Hp.id_curso = Cu.id_curso"
            const findInformacionGrupo =  new PQ({text: profesor_query, values: [result.id_curso, result.id_grupo]});
            const resultInformacion = await db.manyOrNone(findInformacionGrupo);
    
            result.informacionGrupo = resultInformacion;
        }
        
        console.log('Informacion Grupo:', result); // { value: 123 }
        return res.json(result)
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.json({menssage: "Error al obtener profesores"})
    }
    
});

//Obtener la información del grupo que ve un curso dado
router.get('/grupos/:id/curso', async function(req, res, next) {

    try {
        const { id } = req.params  
        const query = "SELECT Pr.id_profesor, U.nombre, U.apellido, Hp.id_curso, Cu.nombre_curso, Hp.id_horario, Gr.id_grupo, Gr.nombre_grupo, Hp.dia_semana, Hp.hora_inicio, Hp.hora_fin FROM Curso AS Cu, Usuario AS U, Profesor_curso AS Pc, Profesor AS Pr, Horarios_profesor AS Hp, Grupos AS Gr WHERE U.id_usuario = Pr.id_profesor AND Pc.id_profesor = Pr.id_profesor AND Hp.id_profesor = Pr.id_profesor AND Hp.id_curso = Cu.id_curso AND Hp.id_grupo = Gr.id_grupo AND Pc.id_curso = Cu.id_curso AND Gr.id_curso = Cu.id_curso AND Gr.id_grupo = $1";        const findGrupo =  new PQ({text: query, values: [id]});
        const result = await db.manyOrNone(findGrupo);
        console.log('Resultado:', result);

        return res.json(result)
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.json({menssage: "Error al obtener profesores"})
    }
    
});

//Obtener la información del grupo que ve un curso dado
router.get('/grupos/curso/:id', async function(req, res, next) {

    try {
        const { id } = req.params  
        const query = "SELECT Gr.* FROM Grupos AS Gr WHERE Gr.id_curso = $1";        const findGrupo =  new PQ({text: query, values: [id]});
        const result = await db.manyOrNone(findGrupo);
        console.log('Resultado:', result);

        return res.json(result)
    } catch (error) {
        console.error('Error al hacer la consulta:', error);
        res.json({menssage: "Error al obtener profesores"})
    }
    
});

module.exports = router;