export default async function obtenerCursosProfesor(id_profesor: number){
    const datosCursos = await fetch(`http://localhost:5555/cursos/profesor/${id_profesor}`)
    const resultadoConsulta = await datosCursos.json()
    console.log(resultadoConsulta)
    return resultadoConsulta;
};