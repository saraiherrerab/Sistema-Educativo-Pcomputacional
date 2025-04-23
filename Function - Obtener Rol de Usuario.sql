DROP FUNCTION IF EXISTS obtener_rol_usuario;
CREATE OR REPLACE FUNCTION obtener_rol_usuario(p_id_usuario INT)
RETURNS TEXT AS $$
DECLARE
  rol TEXT;
BEGIN
  IF EXISTS (SELECT 1 FROM administrador WHERE id_admin = p_id_usuario) THEN
    rol := 'ADMINISTRADOR';
  ELSIF EXISTS (SELECT 1 FROM profesor WHERE id_profesor = p_id_usuario) THEN
    rol := 'PROFESOR';
  ELSIF EXISTS (SELECT 1 FROM estudiante WHERE id_estudiante = p_id_usuario) THEN
    rol := 'ESTUDIANTE';
  ELSE
    rol := 'DESCONOCIDO';
  END IF;
	
  RETURN rol;
END;
$$ LANGUAGE plpgsql;

SELECT obtener_rol_usuario(2);