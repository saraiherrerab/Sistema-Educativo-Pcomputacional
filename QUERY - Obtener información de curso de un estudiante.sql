/* Toda la información del grupo y curso que ve un estudiante*/
SELECT 
	E.id_estudiante, 
	U.nombre, 
	U.apellido, 
	G.*, 
	Cu.nombre_curso
FROM 
	Grupos AS G, 
	Curso AS Cu, 
	Estudiante AS E, 
	Usuario AS U
WHERE E.id_estudiante = 4
AND U.id_usuario = E.id_estudiante
AND E.id_grupo = G.id_grupo 
AND G.id_curso = Cu.id_curso


/* Información de profesor y horarios en la que dicta el curso del estudiante*/
SELECT
	Pr.id_profesor,
	U.nombre, 
	U.apellido, 
	Cu.nombre_curso,
	Hp.*,
	Gr.nombre_grupo
FROM 
	Curso AS Cu, 
	Usuario AS U,
	Profesor_curso AS Pc,
	Profesor AS Pr,
	Grupos AS Gr,
	Horarios_profesor AS Hp
WHERE 
	Cu.id_curso = 1
	AND Gr.id_grupo = 1
	AND Hp.id_grupo = Gr.id_grupo
	AND U.id_usuario = Pr.id_profesor
	AND Pc.id_profesor = Pr.id_profesor
	AND Pc.id_curso = Cu.id_curso
	AND Hp.id_profesor = Pc.id_profesor
	AND Hp.id_curso = Cu.id_curso

/* Información de profesor y horarios en la que dicta el curso del estudiante*/
SELECT
	Pr.id_profesor,
	U.nombre, 
	U.apellido, 
	Cu.nombre_curso,
	Hp.*
FROM 
	Curso AS Cu, 
	Usuario AS U,
	Profesor_curso AS Pc,
	Profesor AS Pr,
	Horarios_profesor AS Hp
WHERE 
	U.id_usuario = Pr.id_profesor
	AND Pc.id_profesor = Pr.id_profesor
	AND Pc.id_curso = Cu.id_curso
	AND Hp.id_profesor = Pc.id_profesor
	AND Hp.id_curso = Cu.id_curso

/* Información de profesor y horarios que dicta a un grupo en particular*/
SELECT
	Pr.id_profesor,
	U.nombre, 
	U.apellido, 
	Hp.id_curso,
	Cu.nombre_curso,
	Hp.id_horario,
	Gr.id_grupo,
	Gr.nombre_grupo,
	Hp.dia_semana,
	Hp.hora_inicio,
	Hp.hora_fin
	
FROM 
	Curso AS Cu, 
	Usuario AS U,
	Profesor_curso AS Pc,
	Profesor AS Pr,
	Horarios_profesor AS Hp,
	Grupos AS Gr
WHERE 
	/*Datos de Profesor*/
	U.id_usuario = Pr.id_profesor
	AND Pc.id_profesor = Pr.id_profesor
	
	/*Que tiene un horario para dictar un curso*/
	AND Hp.id_profesor = Pr.id_profesor
	AND Hp.id_curso = Cu.id_curso
	AND Hp.id_grupo = Gr.id_grupo
	/* Y ese curso que dicta es el mismo curso que estoy buscando*/
	AND Pc.id_curso = Cu.id_curso
	AND Gr.id_curso = Cu.id_curso
	AND Gr.id_grupo = 1