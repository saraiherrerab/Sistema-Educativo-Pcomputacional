DROP FUNCTION IF EXISTS obtener_cursos_profesor;
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

SELECT obtener_cursos_profesor(2);