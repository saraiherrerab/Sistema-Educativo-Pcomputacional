export default async function obtenerCursoAlumno(id_grupo: number){
    const datosHorario = await fetch(`http://localhost:5555/cursos/grupo/${id_grupo}`)
    const resultadoConsulta = await datosHorario.json()
    console.log(resultadoConsulta)
    return resultadoConsulta;
  };
