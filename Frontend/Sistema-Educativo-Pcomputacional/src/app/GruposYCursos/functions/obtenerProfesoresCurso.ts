export default async function obtenerProfesoresCurso( id_curso_seleccionado: number ) {
    const resultado= await fetch(`http://localhost:5555/cursos/${id_curso_seleccionado}/profesores`,{
                method: 'GET', // Método especificado
                mode: 'cors',   // Habilita CORS
                headers: {
                  'Content-Type': 'application/json'
                }
    });
    const resultado_json= await resultado.json();
    console.log(resultado_json);
    return resultado_json
}