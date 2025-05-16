/* Obtener la información de Usuario de los estudiantes de un grupo específico*/

SELECT Us.*
FROM 
	Usuario AS Us,
	Estudiante AS Est,
	Grupos AS Gr
WHERE Gr.id_grupo = Est.id_grupo
AND Us.id_usuario = Est.id_estudiante
AND Gr.id_grupo = 1;

/* Obtener la información de Usuario de los estudiantes que ven un curso específico*/

SELECT Us.*
FROM 
	Usuario AS Us,
	Estudiante AS Est,
	Grupos AS Gr
WHERE Gr.id_grupo = Est.id_grupo
AND Us.id_usuario = Est.id_estudiante
AND Gr.id_curso = 1;

/* Obtener la información de usuario de todos los profesores que dan un curso específico */

SELECT Us.*
FROM 
	Usuario AS Us,
	Profesor AS Pr,
	Grupos AS Gr
WHERE Gr.id_profesor_grupo = Pr.id_profesor
AND Us.id_usuario = Pr.id_profesor
AND Gr.id_curso = 1;

/* Obtener la información de todos los grupos que ven un curso dado*/

SELECT Gr.*
FROM Grupos AS Gr
WHERE Gr.id_curso = 1