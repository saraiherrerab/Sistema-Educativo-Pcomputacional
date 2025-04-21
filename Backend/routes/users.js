var express = require('express');
const db = require('../database');
var router = express.Router();
const {ParameterizedQuery: PQ} = require('pg-promise');

/* GET Profesores - Obtener TODOS los profesores. */
router.get('/profesores', async function(req, res, next) {
  
  try {
    const result = await db.any('SELECT * FROM profesor');
    console.log('Resultado:', result); // { value: 123 }
    return res.json(result)
  } catch (error) {
    console.error('Error al hacer la consulta:', error);
    res.json({menssage: "Error al obtener profesores"})
  }
  
});

/* GET Profesores By ID - Obtener Datos de Profesor y Usuario asociado mediante ID. */
router.get('/profesores/:id', async function(req, res, next) {
  
  try {
    const id_profesor = req.params.id
    const findProfesor =  new PQ({text :`SELECT U.*, P.* FROM Usuario AS U, Profesor as P WHERE id_usuario = $1 AND id_usuario = id_profesor`, values: [id_profesor]});

    const result = await db.one(findProfesor);
    console.log('Resultado:', result); // { value: 123 }
    return res.json(result)
  } catch (error) {
    console.error('Error al hacer la consulta:', error);
    res.json({menssage: "Error al obtener profesor"})
  }
  
});

router.post('/profesores', async function(req, res, next) {
  
  try {
    const { id_profesor,curriculum } = req.body
    const findProfesor =  new PQ({text :`INSERT INTO Profesor (id_profesor,curriculum)  VALUES ($1,$2)`, values: [id_profesor,curriculum]});
    const result = await db.none(findProfesor);
    console.log('Resultado:', result); // { value: 123 }
    return res.json({mensaje: "El profesor ha sido creado con éxito"})
  } catch (error) {
    console.error('Error al hacer la consulta:', error);
    res.json({menssage: "Error al crear profesor"})
  }
  
})


router.put('/profesores', async function(req, res, next) {
  try {
    const { id,curriculum } = req.body
    const updateProfesor = new PQ({text :`UPDATE Profesor SET curriculum = $2 WHERE id_profesor = $1`, values: [id,curriculum]});

    const result = await db.none(updateProfesor);
    console.log('Resultado:', result); // { value: 123 }
    return res.json({mensaje: `El profesor con id: ${id} ha sido actualizado con éxito `})
  } catch (error) {
    console.error('Error al hacer la consulta:', error);
    res.json({menssage: "Error al actualizar profesor"})
  }
  
});

router.delete('/profesores', async function(req, res, next) {
  try {
    const { id } = req.body
    const deleteProfesor = new PQ({text :`DELETE FROM Usuario WHERE id_usuario = $1`, values: [id]});

    const result = await db.none(deleteProfesor);
    console.log('Resultado:', result); // { value: 123 }
    return res.json({mensaje: `El profesor con id: ${id} ha sido eliminado con éxito `})
  } catch (error) {
    console.error('Error al hacer la consulta:', error);
    res.json({menssage: "Error al eliminar profesor"})
  }
  
});

module.exports = router;
