DROP FUNCTION IF EXISTS obtener_cursos_profesor;
DROP FUNCTION IF EXISTS obtener_horarios_profesor;
DROP TABLE IF EXISTS Profesor_Curso;
DROP TABLE IF EXISTS horarios_profesor;
/*Tablas principales*/
DROP TABLE IF EXISTS Estudiante;
DROP TABLE IF EXISTS Grupos;
DROP TABLE IF EXISTS Curso;
DROP TABLE IF EXISTS Profesor;




DROP TABLE IF EXISTS Usuario_Nivel;
DROP TABLE IF EXISTS Nivel;

DROP TABLE IF EXISTS Administrador;



/* Lógica de usuarios */
DROP TABLE IF EXISTS Usuario;
CREATE TABLE IF NOT EXISTS Usuario (
	id_usuario SERIAL NOT NULL,
	telefono VARCHAR(14),
	nombre TEXT NOT NULL,
	apellido TEXT NOT NULL,
	correo TEXT,
	edad INTEGER DEFAULT 0,
	foto TEXT DEFAULT '',
	usuario TEXT NOT NULL,
	clave_acceso TEXT NOT NULL,
	cedula TEXT,
	PRIMARY KEY(id_usuario)
);

-- Jackeline
INSERT INTO Usuario (telefono, nombre, apellido, correo, edad, usuario, clave_acceso, cedula)
VALUES ('04121234567', 'Jackeline', 'Duarte', 'jackeline.duarte@example.com', 35, 'jduarte', 'admin123', 'V12345678');

-- Sarai
INSERT INTO Usuario (telefono, nombre, apellido, correo, edad, usuario, clave_acceso, cedula)
VALUES ('04129876543', 'Sarai', 'Herrera', 'sarai.herrea@example.com', 40, 'sherrea', 'profesor123', 'V87654321');

-- Nahum
INSERT INTO Usuario (telefono, nombre, apellido, correo, edad, usuario, clave_acceso, cedula)
VALUES ('04125551234', 'Nahum', 'Giral', 'nahum.giral@example.com', 38, 'ngiral', 'profesor123', 'V45678912');

-- Otros 7 usuarios de prueba
INSERT INTO Usuario (telefono, nombre, apellido, correo, edad, usuario, clave_acceso, cedula)
VALUES 
('04241234567', 'Carlos', 'Pérez', 'carlos.perez@example.com', 20, 'cperez', 'est123', 'V11223344'),
('04241234568', 'Ana', 'Martínez', 'ana.martinez@example.com', 19, 'amartinez', 'est123', 'V22334455'),
('04241234569', 'Luis', 'Rodríguez', 'luis.rodriguez@example.com', 21, 'lrodriguez', 'est123', 'V33445566'),
('04241234570', 'María', 'López', 'maria.lopez@example.com', 22, 'mlopez', 'est123', 'V44556677'),
('04241234571', 'Pedro', 'González', 'pedro.gonzalez@example.com', 20, 'pgonzalez', 'est123', 'V55667788'),
('04241234572', 'Laura', 'Jiménez', 'laura.jimenez@example.com', 18, 'ljimenez', 'est123', 'V66778899'),
('04241234573', 'Diego', 'Ramos', 'diego.ramos@example.com', 23, 'dramos', 'est123', 'V77889900');


CREATE TABLE  IF NOT EXISTS Administrador (
	id_admin INTEGER NOT NULL,
	PRIMARY KEY(id_admin),
	FOREIGN KEY (id_admin) REFERENCES Usuario(id_usuario)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

INSERT INTO Administrador(id_admin) VALUES (1);

CREATE TABLE IF NOT EXISTS Profesor (
	id_profesor INTEGER NOT NULL,
	curriculum TEXT,
	formacion TEXT,
	PRIMARY KEY(id_profesor),
	FOREIGN KEY (id_profesor) REFERENCES Usuario(id_usuario)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

INSERT INTO Profesor (id_profesor, formacion) VALUES (2, 'Sarai Herrera es una programadora y profesora apasionada por la tecnología y la enseñanza. Con sólida experiencia en desarrollo web y software educativo, domina lenguajes como JavaScript, TypeScript y Python, así como frameworks modernos como React y Angular. Ha liderado proyectos innovadores integrando programación y pedagogía, y posee habilidades destacadas en diseño instruccional y metodologías activas de aprendizaje. Su enfoque combina la excelencia técnica con una fuerte vocación docente, fomentando entornos de aprendizaje dinámicos y accesibles. Comprometida con la formación continua, Sarai promueve el crecimiento profesional de sus estudiantes a través de la práctica y la creatividad.');
INSERT INTO Profesor (id_profesor) VALUES (3);

DROP TABLE IF EXISTS Curso;
CREATE TABLE IF NOT EXISTS Curso (
	id_curso SERIAL NOT NULL,
	nombre_curso TEXT,
	PRIMARY KEY(id_curso)
);

INSERT INTO Curso (nombre_curso) VALUES ('Introducción a la Programación');
INSERT INTO Curso (nombre_curso) VALUES ('Programación en Python para Robótica');
INSERT INTO Curso (nombre_curso) VALUES ('Robótica con Arduino');
INSERT INTO Curso (nombre_curso) VALUES ('Diseño de Algoritmos');
INSERT INTO Curso (nombre_curso) VALUES ('Programación en C++ para Sistemas Embebidos');
INSERT INTO Curso (nombre_curso) VALUES ('Automatización y Control con PLCs');
INSERT INTO Curso (nombre_curso) VALUES ('Inteligencia Artificial en Robótica');
INSERT INTO Curso (nombre_curso) VALUES ('Simulación de Robots en ROS');
INSERT INTO Curso (nombre_curso) VALUES ('Machine Learning Aplicado a la Robótica');
INSERT INTO Curso (nombre_curso) VALUES ('Desarrollo de Aplicaciones para IoT');

DROP TABLE IF EXISTS Profesor_Curso;
CREATE TABLE IF NOT EXISTS Profesor_Curso (
	id_curso INTEGER NOT NULL,
	id_profesor INTEGER NOT NULL,
	PRIMARY KEY(id_curso,id_profesor),
	FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor)
		ON UPDATE RESTRICT
		ON DELETE CASCADE,
	FOREIGN KEY (id_curso) REFERENCES Curso (id_curso)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

-- Asignar cursos 1 al 5 al profesor 2
INSERT INTO Profesor_Curso (id_curso, id_profesor) VALUES (1, 2);
INSERT INTO Profesor_Curso (id_curso, id_profesor) VALUES (2, 2);
INSERT INTO Profesor_Curso (id_curso, id_profesor) VALUES (3, 2);
INSERT INTO Profesor_Curso (id_curso, id_profesor) VALUES (4, 2);
INSERT INTO Profesor_Curso (id_curso, id_profesor) VALUES (5, 2);

/* Lógica de Grupos */
CREATE TABLE IF NOT EXISTS Grupos (
	id_grupo INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	nombre_grupo VARCHAR(255) NOT NULL,
	id_curso INTEGER NOT NULL,
	PRIMARY KEY(id_grupo),
	FOREIGN KEY (id_curso) REFERENCES Curso(id_curso)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

-- Grupos de estudiantes asignados a cursos específicos
INSERT INTO Grupos (nombre_grupo, id_curso)
VALUES 
('Grupo Alpha - Programación Básica', 1),   -- Introducción a la Programación
('Grupo Beta - Robótica con Arduino', 3),   -- Robótica con Arduino
('Grupo Gamma - Machine Learning', 9);      -- Machine Learning Aplicado a la Robótica

CREATE TABLE IF NOT EXISTS Estudiante (
	id_estudiante INTEGER NOT NULL,
	condicion_medica TEXT,
	eficiencia_algoritmica INTEGER DEFAULT 0,
	reconocimiento_patrones BOOLEAN DEFAULT FALSE,
	identificacion_errores BOOLEAN DEFAULT FALSE,
	abstraccion BOOLEAN DEFAULT FALSE,
	asociacion BOOLEAN DEFAULT FALSE,
	construccion_algoritmos BOOLEAN DEFAULT FALSE,
	p_actividades_completadas INTEGER DEFAULT 0,
	tipo_premiacion TEXT,
	id_grupo INTEGER,
	PRIMARY KEY(id_estudiante),
	FOREIGN KEY (id_estudiante) REFERENCES Usuario(id_usuario)
		ON UPDATE RESTRICT
		ON DELETE CASCADE,
	FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

-- Estudiantes (IDs del 4 al 10) asignados a grupos
INSERT INTO Estudiante (id_estudiante, condicion_medica, tipo_premiacion, id_grupo)
VALUES 
(4, NULL, 'Diploma', 1),
(5, NULL, 'Insignia', 1),
(6, NULL, 'Medalla', 2),
(7, NULL, 'Reconocimiento', 2),
(8, NULL, 'Insignia', 3),
(9, NULL, 'Medalla', 3),
(10, NULL, 'Certificado', 1);

/* Lógica de Juegos y Niveles */
DROP TABLE IF EXISTS Juego;
CREATE TABLE IF NOT EXISTS Juego (
	id_juego INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	nombre_juego TEXT,
	PRIMARY KEY(id_juego)
);

INSERT INTO Juego (nombre_juego)
VALUES 
('LightBot - Patrones Secuenciales y Bucles'),
('CodeCombat - Pensamiento Lógico y Sintaxis de Programación'),
('Human Resource Machine - Reconocimiento de Patrones y Resolución de Problemas');

CREATE TABLE IF NOT EXISTS Nivel (
	id_nivel INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	nombre_nivel TEXT,
	id_juego INTEGER NOT NULL,
	PRIMARY KEY(id_nivel),
	FOREIGN KEY (id_juego) REFERENCES Juego(id_juego)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

-- Niveles para LightBot (id_juego = 1)
INSERT INTO Nivel (nombre_nivel, id_juego)
VALUES 
('Secuencias Básicas', 1),
('Uso de Bucles', 1),
('Funciones Recursivas', 1);

-- Niveles para CodeCombat (id_juego = 2)
INSERT INTO Nivel (nombre_nivel, id_juego)
VALUES 
('Fundamentos de Sintaxis', 2),
('Control de Flujo con Condicionales', 2),
('Optimización de Código con Funciones', 2);

-- Niveles para Human Resource Machine (id_juego = 3)
INSERT INTO Nivel (nombre_nivel, id_juego)
VALUES 
('Patrones de Entrada y Salida', 3),
('Manipulación de Datos en Memoria', 3),
('Automatización de Tareas Repetitivas', 3);

CREATE TABLE IF NOT EXISTS Usuario_Nivel (
	id_usuario INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	id_nivel INTEGER NOT NULL,
	mejor_tiempo TIME WITHOUT TIME ZONE,
	PRIMARY KEY(id_usuario, id_nivel),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
		ON UPDATE RESTRICT
		ON DELETE CASCADE,
	FOREIGN KEY (id_nivel) REFERENCES Nivel(id_nivel)
		ON UPDATE RESTRICT
		ON DELETE CASCADE
);

DROP TABLE IF EXISTS horarios_profesor;
CREATE TABLE IF NOT EXISTS horarios_profesor (
  id_horario SERIAL PRIMARY KEY,
  id_profesor INTEGER NOT NULL,
  id_curso INTEGER NOT NULL,
  id_grupo INTEGER NOT NULL,
  dia_semana VARCHAR(10) NOT NULL CHECK (
  dia_semana IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')
  ),
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor),
  FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
  FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
);

INSERT INTO horarios_profesor (id_profesor, id_curso, id_grupo, dia_semana, hora_inicio, hora_fin)
VALUES
(2, 2, 'Lunes', '16:00', '18:00'),
(2, 2, 'Martes', '16:00', '18:00'),
(2, 2, 'Miércoles', '16:00', '18:00');

CREATE OR REPLACE FUNCTION obtener_cursos_profesor(p_id_usuario INT)
RETURNS SETOF Curso AS $$
BEGIN
	
  RETURN QUERY
  SELECT c.*
  FROM Curso c
  WHERE c.id_curso NOT IN (
    SELECT pc.id_curso
    FROM profesor_curso pc
    WHERE pc.id_profesor = p_id_usuario
  );
	
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS obtener_horarios_profesor;
CREATE OR REPLACE FUNCTION obtener_horarios_profesor(p_id_profesor INTEGER)
RETURNS SETOF horarios_profesor AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM horarios_profesor
  WHERE id_profesor = p_id_profesor
  ORDER BY
    CASE dia_semana
      WHEN 'Lunes' THEN 1
      WHEN 'Martes' THEN 2
      WHEN 'Miércoles' THEN 3
      WHEN 'Jueves' THEN 4
      WHEN 'Viernes' THEN 5
      WHEN 'Sábado' THEN 6
      WHEN 'Domingo' THEN 7
      ELSE 8
    END,
    hora_inicio;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM obtener_horarios_profesor(2)
